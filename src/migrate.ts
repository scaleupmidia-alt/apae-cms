/**
 * Migração do conteúdo real do site (apae-bright-future) para o painel Payload.
 *
 * Lê os dados-fonte copiados em src/migration-data/ e os arquivos de imagem do
 * site, e cria registros nas coleções Galeria, Eventos e Notícias — fazendo
 * upload das imagens para a coleção media (local no spike; Vercel Blob em produção).
 *
 * Rodar:  npm run payload -- run src/migrate.ts
 *
 * Idempotente: apaga registros de noticias/eventos/galeria/media antes de importar
 * (mantém categorias e usuários). Categorias precisam existir antes (seed).
 *
 * PHOTO_CAP limita fotos por álbum no teste local (padrão 6). Em produção, use
 * PHOTO_CAP=0 para importar todas.
 */
import { getPayload } from 'payload'
import config from './payload.config'
import fs from 'fs'
import path from 'path'

import { NOTICIAS } from './migration-data/noticias'
import { EVENTOS_2026, EVENTOS_RECORRENTES, CATEGORIAS_INFO } from './migration-data/eventos'
import { albums } from './migration-data/galeria-albums'

const SITE_PUBLIC =
  'C:/Users/thehi/OneDrive/Documentos/APAE-Barueri-Operacao-Institucional/apae-bright-future/public'
const PHOTO_CAP = Number(process.env.PHOTO_CAP ?? '6') // 0 = todas

// ─── Helpers ────────────────────────────────────────────────────────
const txt = (text: string) => ({
  type: 'text', text, format: 0, detail: 0, mode: 'normal', style: '', version: 1,
})
const para = (text: string) => ({
  type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', children: [txt(text)],
})
const heading = (text: string) => ({
  type: 'heading', tag: 'h2', format: '', indent: 0, version: 1, direction: 'ltr', children: [txt(text)],
})
const quote = (text: string) => ({
  type: 'quote', format: '', indent: 0, version: 1, direction: 'ltr', children: [txt(text)],
})
const listNode = (items: string[]) => ({
  type: 'list', listType: 'bullet', start: 1, tag: 'ul', format: '', indent: 0, version: 1, direction: 'ltr',
  children: items.map((it, i) => ({
    type: 'listitem', value: i + 1, format: '', indent: 0, version: 1, direction: 'ltr', children: [txt(it)],
  })),
})

// Converte os blocos do artigo (ArticleBlock[]) para richText Lexical (best-effort).
function bodyToLexical(blocks: any[]) {
  const children: any[] = []
  for (const b of blocks || []) {
    if (!b || !b.type) continue
    if (b.type === 'h2') children.push(heading(b.text || ''))
    else if (b.type === 'quote') children.push(quote(b.text || ''))
    else if (b.type === 'list') children.push(listNode(b.items || []))
    else if (b.type === 'lead' || b.type === 'p') children.push(para(b.text || ''))
    // 'gallery' é ignorado (a galeria é vinculada via campo galleryAlbum)
  }
  if (children.length === 0) children.push(para(''))
  return { root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children } }
}

console.log('>>> migrate.ts carregado; PHOTO_CAP =', PHOTO_CAP)

async function main() {
  console.log('>>> iniciando getPayload...')
  const payload = await getPayload({ config })
  console.log('>>> payload pronto')
  const log = (...a: any[]) => payload.logger.info(a.map(String).join(' '))

  // 1) Limpeza (mantém categorias + users)
  for (const c of ['noticias', 'galeria', 'eventos', 'media'] as const) {
    await payload.delete({ collection: c, where: { id: { exists: true } } })
  }
  log('Limpeza concluída.')

  // 2) Mapas de categoria (nome -> id)
  const catNot = await payload.find({ collection: 'categorias-noticias', limit: 100 })
  const catEvt = await payload.find({ collection: 'categorias-eventos', limit: 100 })
  const mapNot = new Map(catNot.docs.map((d: any) => [d.nome, d.id]))
  const mapEvt = new Map(catEvt.docs.map((d: any) => [d.nome, d.id]))

  // cache de upload por caminho absoluto
  const mediaCache = new Map<string, number | string>()
  async function upload(absPath: string, alt: string): Promise<number | string | null> {
    if (mediaCache.has(absPath)) return mediaCache.get(absPath)!
    if (!fs.existsSync(absPath)) { log('  [faltando]', absPath); return null }
    try {
      const doc: any = await payload.create({ collection: 'media', data: { alt }, filePath: absPath })
      mediaCache.set(absPath, doc.id)
      return doc.id
    } catch (e: any) {
      log('  [erro upload]', absPath, e.message)
      return null
    }
  }

  // 3) Galeria
  let albCount = 0
  const albumIdBySlug = new Map<string, number | string>()
  for (const a of albums) {
    const dir = path.join(SITE_PUBLIC, 'assets', 'GALERIA', a.folder)
    const coverId = await upload(path.join(dir, a.cover), `Capa: ${a.title}`)
    const list = PHOTO_CAP > 0 ? a.photos.slice(0, PHOTO_CAP) : a.photos
    const photos: any[] = []
    for (const f of list) {
      const id = await upload(path.join(dir, f), `${a.title}`)
      if (id) photos.push({ image: id, caption: '' })
    }
    if (photos.length === 0) { log('  [pulado, sem fotos]', a.id); continue }
    const doc: any = await payload.create({
      collection: 'galeria',
      data: { title: a.title, slug: a.id, cover: coverId || undefined, photos },
    })
    albumIdBySlug.set(a.id, doc.id)
    albCount++
    log(`  álbum ok: ${a.title} (${photos.length} fotos)`)
  }
  log(`Galeria: ${albCount} álbuns.`)

  // 4) Eventos
  let evtCount = 0
  async function createEvento(e: any, recorrente: boolean) {
    const rotulo = CATEGORIAS_INFO[e.categoria]?.rotulo
    const categoria = mapEvt.get(rotulo)
    if (!categoria) { log('  [sem categoria]', e.id, e.categoria); return }
    let tipoData = 'dia'
    let data: string | undefined
    if (recorrente) tipoData = 'recorrente'
    else if (typeof e.data === 'string' && e.data.endsWith('-00')) {
      tipoData = 'mes'; data = e.data.replace(/-00$/, '-01') + 'T12:00:00.000-03:00'
    } else if (e.data) {
      data = e.data + 'T12:00:00.000-03:00'
    }
    await payload.create({
      collection: 'eventos',
      data: {
        titulo: e.titulo, tipoData, data, recorrencia: e.recorrente,
        dataExibicao: e.dataExibicao, categoria, local: e.local,
        descricao: e.descricao, destaque: !!e.destaque, slug: e.id,
      },
    })
    evtCount++
  }
  for (const e of EVENTOS_2026) await createEvento(e, false)
  for (const e of EVENTOS_RECORRENTES) await createEvento(e, true)
  log(`Eventos: ${evtCount}.`)

  // 5) Notícias
  let notCount = 0
  for (const n of NOTICIAS) {
    const category = mapNot.get(n.category)
    if (!category) { log('  [sem categoria]', n.id, n.category); continue }
    let imageId: any
    if (n.image) imageId = await upload(path.join(SITE_PUBLIC, n.image), n.imageAlt || n.title)
    const galleryAlbum = n.galleryAlbumId ? albumIdBySlug.get(n.galleryAlbumId) : undefined
    await payload.create({
      collection: 'noticias',
      data: {
        title: n.title, slug: n.id, category, date: n.date,
        publishedTime: n.publishedTime, excerpt: n.excerpt,
        image: imageId || undefined, imageAlt: n.imageAlt, imageCaption: n.imageCaption,
        body: bodyToLexical(n.body), seoTitle: n.seoTitle,
        metaDescription: n.metaDescription, readTime: n.readTime,
        galleryAlbum: galleryAlbum || undefined, galleryHeading: n.galleryHeading,
        _status: 'published',
      },
    })
    notCount++
    log(`  notícia ok: ${n.title}`)
  }
  log(`Notícias: ${notCount}.`)

  log(`\nMIGRAÇÃO CONCLUÍDA — álbuns: ${albCount}, eventos: ${evtCount}, notícias: ${notCount}.`)
  process.exit(0)
}

try {
  await main()
} catch (e) {
  console.error(e)
  process.exit(1)
}
