/**
 * Migração via API REST (contorna o bug do tsx/payload run no Node 24).
 * Requer o servidor rodando (npm run dev) em http://localhost:3000.
 *
 * Rodar:  node src/migrate-rest.ts        (Node 24 faz type-stripping nativo)
 *   opcional:  PHOTO_CAP=0 node src/migrate-rest.ts   (importar todas as fotos)
 */
import fs from 'fs'
import path from 'path'
import { NOTICIAS } from './migration-data/noticias.ts'
import { EVENTOS_2026, EVENTOS_RECORRENTES, CATEGORIAS_INFO } from './migration-data/eventos.ts'
import { albums } from './migration-data/galeria-albums.ts'

const BASE = 'http://localhost:3000/api'
const SITE_PUBLIC =
  'C:/Users/thehi/OneDrive/Documentos/APAE-Barueri-Operacao-Institucional/apae-bright-future/public'
const PHOTO_CAP = Number(process.env.PHOTO_CAP ?? '6') // 0 = todas
const EMAIL = 'equipe@apaebarueri.org.br'
const PASS = 'SenhaTeste123!'

let TOKEN = ''
const authHeaders = (extra: Record<string, string> = {}) => ({
  Authorization: `JWT ${TOKEN}`,
  ...extra,
})

// ─── Lexical helpers ────────────────────────────────────────────────
const txt = (text: string) => ({ type: 'text', text, format: 0, detail: 0, mode: 'normal', style: '', version: 1 })
const para = (text: string) => ({ type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', children: [txt(text)] })
const heading = (text: string) => ({ type: 'heading', tag: 'h2', format: '', indent: 0, version: 1, direction: 'ltr', children: [txt(text)] })
const quote = (text: string) => ({ type: 'quote', format: '', indent: 0, version: 1, direction: 'ltr', children: [txt(text)] })
const listNode = (items: string[]) => ({
  type: 'list', listType: 'bullet', start: 1, tag: 'ul', format: '', indent: 0, version: 1, direction: 'ltr',
  children: items.map((it, i) => ({ type: 'listitem', value: i + 1, format: '', indent: 0, version: 1, direction: 'ltr', children: [txt(it)] })),
})
function bodyToLexical(blocks: any[]) {
  const children: any[] = []
  for (const b of blocks || []) {
    if (!b || !b.type) continue
    if (b.type === 'h2') children.push(heading(b.text || ''))
    else if (b.type === 'quote') children.push(quote(b.text || ''))
    else if (b.type === 'list') children.push(listNode(b.items || []))
    else if (b.type === 'lead' || b.type === 'p') children.push(para(b.text || ''))
  }
  if (children.length === 0) children.push(para(''))
  return { root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children } }
}

// ─── REST helpers ───────────────────────────────────────────────────
async function login() {
  const r = await fetch(`${BASE}/users/login`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASS }),
  })
  const j = await r.json()
  TOKEN = j.token
  if (!TOKEN) throw new Error('login falhou: ' + JSON.stringify(j).slice(0, 200))
}

async function wipe(coll: string) {
  const r = await fetch(`${BASE}/${coll}?where[id][exists]=true&limit=1000`, {
    method: 'DELETE', headers: authHeaders(),
  })
  if (!r.ok) console.log(`  [wipe ${coll}] status ${r.status}`)
}

async function create(coll: string, data: any) {
  const r = await fetch(`${BASE}/${coll}`, {
    method: 'POST', headers: authHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(data),
  })
  const j = await r.json()
  if (!j.doc) throw new Error(`[${coll}] ${JSON.stringify(j.errors || j).slice(0, 300)}`)
  return j.doc
}

const mediaCache = new Map<string, string | number>()
async function upload(absPath: string, alt: string) {
  if (mediaCache.has(absPath)) return mediaCache.get(absPath)!
  if (!fs.existsSync(absPath)) { console.log('  [faltando]', absPath); return null }
  const buf = await fs.promises.readFile(absPath)
  const fd = new FormData()
  fd.append('file', new Blob([buf]), path.basename(absPath))
  fd.append('_payload', JSON.stringify({ alt }))
  const r = await fetch(`${BASE}/media`, { method: 'POST', headers: authHeaders(), body: fd })
  const j = await r.json()
  if (!j.doc) { console.log('  [erro upload]', path.basename(absPath), JSON.stringify(j.errors || j).slice(0, 160)); return null }
  mediaCache.set(absPath, j.doc.id)
  return j.doc.id
}

async function mapByName(coll: string) {
  const r = await fetch(`${BASE}/${coll}?limit=200`)
  const j = await r.json()
  return new Map(j.docs.map((d: any) => [d.nome, d.id]))
}

// ─── Migração ───────────────────────────────────────────────────────
console.log('Login...')
await login()
console.log('Limpando noticias/galeria/eventos/media/categorias...')
for (const c of ['noticias', 'galeria', 'eventos', 'media', 'categorias-noticias', 'categorias-eventos']) await wipe(c)

// Semear categorias a partir da fonte (Node = UTF-8 correto, sem corromper acentos)
console.log('Semeando categorias...')
const nomesNot = [...new Set(NOTICIAS.map((n: any) => n.category))]
for (const nome of nomesNot) await create('categorias-noticias', { nome })
for (const k of Object.keys(CATEGORIAS_INFO)) {
  const info = (CATEGORIAS_INFO as any)[k]
  await create('categorias-eventos', { nome: info.rotulo, cor: info.cor })
}

const mapNot = await mapByName('categorias-noticias')
const mapEvt = await mapByName('categorias-eventos')

// Galeria
let albCount = 0
const albumIdBySlug = new Map<string, string | number>()
for (const a of albums) {
  const dir = path.join(SITE_PUBLIC, 'assets', 'GALERIA', a.folder)
  const coverId = await upload(path.join(dir, a.cover), `Capa: ${a.title}`)
  const list = PHOTO_CAP > 0 ? a.photos.slice(0, PHOTO_CAP) : a.photos
  const photos: any[] = []
  for (const f of list) {
    const id = await upload(path.join(dir, f), a.title)
    if (id) photos.push({ image: id, caption: '' })
  }
  if (photos.length === 0) { console.log('  [pulado]', a.id); continue }
  const doc = await create('galeria', { title: a.title, slug: a.id, cover: coverId || undefined, photos })
  albumIdBySlug.set(a.id, doc.id)
  albCount++
  console.log(`  álbum: ${a.title} (${photos.length} fotos)`)
}

// Eventos
let evtCount = 0
async function createEvento(e: any, recorrente: boolean) {
  const rotulo = CATEGORIAS_INFO[e.categoria]?.rotulo
  const categoria = mapEvt.get(rotulo)
  if (!categoria) { console.log('  [sem cat evento]', e.id); return }
  let tipoData = 'dia'
  let data: string | undefined
  if (recorrente) tipoData = 'recorrente'
  else if (typeof e.data === 'string' && e.data.endsWith('-00')) { tipoData = 'mes'; data = e.data.replace(/-00$/, '-01') + 'T12:00:00.000-03:00' }
  else if (e.data) data = e.data + 'T12:00:00.000-03:00'
  await create('eventos', {
    titulo: e.titulo, tipoData, data, recorrencia: e.recorrente, dataExibicao: e.dataExibicao,
    categoria, local: e.local, descricao: e.descricao, destaque: !!e.destaque, slug: e.id,
  })
  evtCount++
}
for (const e of EVENTOS_2026) await createEvento(e, false)
for (const e of EVENTOS_RECORRENTES) await createEvento(e, true)
console.log(`Eventos: ${evtCount}`)

// Notícias
let notCount = 0
for (const n of NOTICIAS) {
  const category = mapNot.get(n.category)
  if (!category) { console.log('  [sem cat noticia]', n.id, n.category); continue }
  let imageId: any
  if (n.image && !/^https?:\/\//.test(n.image)) imageId = await upload(path.join(SITE_PUBLIC, n.image), n.imageAlt || n.title)
  const galleryAlbum = n.galleryAlbumId ? albumIdBySlug.get(n.galleryAlbumId) : undefined
  await create('noticias', {
    title: n.title, slug: n.id, category, date: n.date, publishedTime: n.publishedTime,
    excerpt: n.excerpt, image: imageId || undefined, imageAlt: n.imageAlt, imageCaption: n.imageCaption,
    body: bodyToLexical(n.body), seoTitle: n.seoTitle, metaDescription: n.metaDescription,
    readTime: n.readTime, galleryAlbum: galleryAlbum || undefined, galleryHeading: n.galleryHeading,
    _status: 'published',
  })
  notCount++
  console.log(`  notícia: ${n.title}`)
}
console.log(`Notícias: ${notCount}`)
console.log(`\nMIGRAÇÃO OK — álbuns ${albCount}, eventos ${evtCount}, notícias ${notCount}`)
