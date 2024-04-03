import { createId } from '@paralleldrive/cuid2'
import { relations } from 'drizzle-orm'
import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { attendees } from './attendees'

export const checkIns = pgTable('check_ins', {
  id: text('id').$defaultFn(createId).primaryKey(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  attendeeId: integer('attendee_id')
    .notNull()
    .references(() => attendees.id, {
      onDelete: 'cascade',
    })
    .unique(),
})

export const checkInsRelations = relations(checkIns, ({ one }) => {
  return {
    event: one(attendees, {
      fields: [checkIns.attendeeId],
      references: [attendees.id],
    }),
  }
})
