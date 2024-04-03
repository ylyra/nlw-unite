import { count, eq } from 'drizzle-orm'
import { Elysia, t } from 'elysia'
import { db } from '../../db/connection'
import { attendees } from '../../db/schema'

export const registerForEvent = new Elysia().post(
  '/events/:eventId/attendees',
  async ({ body, set, params }) => {
    const event = await db.query.events.findFirst({
      where(fields, operators) {
        return operators.eq(fields.id, params.eventId)
      },
    })

    if (!event) {
      set.status = 404

      return {
        message: 'Event not found',
      }
    }

    const [attendeeFromEmail, [amountOfAttendeesForEvent]] = await Promise.all([
      db.query.attendees.findFirst({
        where(fields, operators) {
          return operators.and(
            operators.eq(fields.eventId, event.id),
            operators.eq(fields.email, body.email),
          )
        },
      }),

      db
        .select({
          count: count(),
        })
        .from(attendees)
        .where(eq(attendees.eventId, event.id)),
    ])

    if (attendeeFromEmail) {
      set.status = 409

      return {
        message: 'Attendee already registered for this event',
      }
    }

    if (
      event.maximumAttendees &&
      amountOfAttendeesForEvent.count >= event.maximumAttendees
    ) {
      set.status = 400

      return {
        message: 'Event is full',
      }
    }

    const data = await db
      .insert(attendees)
      .values({
        email: body.email,
        name: body.name,
        eventId: event.id,
      })
      .returning({
        id: attendees.id,
      })

    const item = data[0]

    set.status = 201

    return {
      attendeeId: item.id,
    }
  },
  {
    params: t.Object({
      eventId: t.String(),
    }),

    body: t.Object({
      name: t.String({
        minLength: 4,
      }),
      email: t.String({
        format: 'email',
      }),
    }),
  },
)
