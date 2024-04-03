import { createId } from '@paralleldrive/cuid2'
import { relations } from 'drizzle-orm'
import { integer, pgTable, text } from 'drizzle-orm/pg-core'
import { attendees } from './attendees'

export const events = pgTable('events', {
  id: text('id').$defaultFn(createId).primaryKey(),
  title: text('title').notNull(),
  details: text('details'),
  slug: text('slug').notNull().unique(),
  maximumAttendees: integer('maximum_attendees'),
})

export const eventsRelations = relations(events, ({ many }) => {
  return {
    attendees: many(attendees),
  }
})
