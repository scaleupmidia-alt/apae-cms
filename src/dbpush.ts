/**
 * Sincroniza o schema do banco (cria/atualiza tabelas) no passo de BUILD.
 * Roda com PAYLOAD_PUSH=true (ativa o push do adaptador Postgres) via:
 *   payload run src/dbpush.ts
 * Em runtime o push fica desligado — o schema já foi criado aqui.
 */
import { getPayload } from 'payload'
import config from './payload.config'

// Diagnóstico: quais variáveis de banco existem no ambiente (nomes, sem valores).
const dbVars = Object.keys(process.env).filter((k) => /POSTGRES|DATABASE|PG|NEON/i.test(k))
console.log('DB env vars presentes:', dbVars.join(', ') || '(nenhuma)')

const payload = await getPayload({ config })
payload.logger.info('Schema do banco sincronizado (push de build).')
process.exit(0)
