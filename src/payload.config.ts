import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { en } from '@payloadcms/translations/languages/en'
import { pt } from '@payloadcms/translations/languages/pt'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Noticias } from './collections/Noticias'
import { Galeria } from './collections/Galeria'
import { Eventos } from './collections/Eventos'
import { CategoriasNoticias } from './collections/CategoriasNoticias'
import { CategoriasEventos } from './collections/CategoriasEventos'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Noticias,
    Galeria,
    Eventos,
    CategoriasNoticias,
    CategoriasEventos,
    Media,
    Users,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // Banco: usa Postgres quando houver uma URL postgres (producao). Aceita os
  // nomes que a Vercel Postgres injeta (POSTGRES_URL / DATABASE_URL) ou um
  // DATABASE_URI manual; caso contrario, SQLite local (desenvolvimento).
  db: (() => {
    // Prefere a conexão DIRETA (não-pooled) da Neon/Vercel. A conexão com pool
    // (pgbouncer) não aplica criação de schema (DDL) de forma confiável.
    const url =
      process.env.DATABASE_URI ||
      process.env.POSTGRES_URL_NON_POOLING ||
      process.env.DATABASE_URL_UNPOOLED ||
      process.env.POSTGRES_URL ||
      process.env.DATABASE_URL ||
      'file:./apae-cms.db'
    return url.startsWith('postgres')
      ? postgresAdapter({
          pool: { connectionString: url },
          // push só é ligado no passo de build (PAYLOAD_PUSH=true), onde as
          // ferramentas de schema existem. Em runtime fica desligado (o schema
          // já foi criado no build), evitando erro de cold start no serverless.
          push: process.env.PAYLOAD_PUSH === 'true',
        })
      : sqliteAdapter({ client: { url } })
  })(),
  // i18n do PAINEL: portugues como idioma padrao (cada usuario tambem pode
  // escolher o idioma no proprio perfil).
  i18n: {
    fallbackLanguage: 'pt',
    supportedLanguages: { pt, en },
  },
  sharp,
  // Storage de imagens: em producao (Vercel Blob) quando houver token;
  // sem token, o Payload usa o disco local (desenvolvimento).
  plugins: [
    ...(process.env.BLOB_READ_WRITE_TOKEN
      ? [
          vercelBlobStorage({
            enabled: true,
            collections: { media: true },
            token: process.env.BLOB_READ_WRITE_TOKEN,
          }),
        ]
      : []),
  ],
})
