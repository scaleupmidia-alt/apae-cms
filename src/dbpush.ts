/**
 * Sincroniza o schema do banco (cria/atualiza tabelas) no passo de BUILD.
 * Roda com PAYLOAD_PUSH=true (ativa o push do adaptador Postgres) via:
 *   payload run src/dbpush.ts
 * Em runtime o push fica desligado — o schema já foi criado aqui.
 */
import { getPayload } from 'payload'
import config from './payload.config'

// Diagnóstico: quais variáveis de banco existem no ambiente (nomes, sem valores).
const dbVars = Object.keys(process.env).filter((k) => /POSTGRES|DATABASE|PG|NEON|BLOB|TOKEN|STORE/i.test(k))
console.log('DB/STORAGE env vars presentes:', dbVars.join(', ') || '(nenhuma)')

const payload = await getPayload({ config })

// Verificação REAL: se as tabelas não existirem, isto lança e o build falha.
const { totalDocs } = await payload.count({ collection: 'users' })
payload.logger.info(`Schema OK — tabela users acessível (usuarios=${totalDocs}).`)
process.exit(0)
