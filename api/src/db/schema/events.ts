import { createId } from '@paralleldrive/cuid2'
import { integer, pgTable, text } from 'drizzle-orm/pg-core'

export const events = pgTable('events', {
  id: text('id').$defaultFn(createId).primaryKey(),
  title: text('title').notNull(),
  details: text('details'),
  slug: text('slug').notNull().unique(),
  maximumAttendees: integer('maximum_attendees'),
})
