import type { Config } from 'drizzle-kit'

export default {
  schema: './src/db/schema/index.ts',
  out: './drizzle',
  driver: 'libsql',
  dbCredentials: {
    url: 'file:./sqlite.db',
  },
} satisfies Config
