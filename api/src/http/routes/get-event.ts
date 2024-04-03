import { sql } from 'drizzle-orm'
import { Elysia, t } from 'elysia'
import { db } from '../../db/connection'

export const getEvent = new Elysia().get(
  '/events/:eventId',
  async ({ set, params }) => {
    const event = await db.query.events.findFirst({
      where(fields, operators) {
        return operators.eq(fields.id, params.eventId)
      },
      columns: {
        id: true,
        title: true,
        slug: true,
        details: true,
        maximumAttendees: true,
      },
      with: {
        attendees: {
          columns: {
            id: true,
          },
        },
      },
      extras: {
        attendeesAmount: sql<number>`(SELECT count(*) from attendees)`
          .mapWith(Number)
          .as('attendeesAmount'),
      },
    })

    if (!event) {
      set.status = 404

      return {
        message: 'Event not found',
      }
    }

    return {
      event: {
        id: event.id,
        title: event.title,
        slug: event.slug,
        details: event.details,
        maximumAttendees: event.maximumAttendees,
        attendeesAmount: event.attendeesAmount,
      },
    }
  },
  {
    params: t.Object({
      eventId: t.String(),
    }),
  },
)
