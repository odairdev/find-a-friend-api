import 'dotenv/config'
import z from 'zod'

const envSchma = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(3333)
})

const _env = envSchma.safeParse(process.env)

if(_env.success !== true) {
  console.error("⚠️ Invalid environment variables,", _env.error.format())
  throw new Error('Invalid environment variables')
}

const env = _env.data

export { env }