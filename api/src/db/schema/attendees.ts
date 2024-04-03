import { relations } from 'drizzle-orm'
import { pgTable, serial, text, timestamp, unique } from 'drizzle-orm/pg-core'
import { events } from './events'

export const attendees = pgTable(
  'attendees',
  {
    id: serial('id').primaryKey().notNull(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    eventId: text('event_id')
      .notNull()
      .references(() => events.id, {
        onDelete: 'cascade',
      }),
  },
  (t) => ({
    unq: unique('attendees_name_email_event_id_unq')
      .on(t.email, t.eventId)
      .nullsNotDistinct(),
  }),
)

export const attendeesRelations = relations(attendees, ({ one }) => {
  return {
    event: one(events, {
      fields: [attendees.eventId],
      references: [events.id],
    }),
  }
})
