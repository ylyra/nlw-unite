import {
  coerce,
  minLength,
  number,
  object,
  optional,
  parse,
  string,
  url,
} from 'valibot'

const envSchema = object({
  DATABASE_URL: string([url(), minLength(1)]),
  PORT: optional(coerce(number(), Number), 3333),
})

export const env = parse(envSchema, process.env)
