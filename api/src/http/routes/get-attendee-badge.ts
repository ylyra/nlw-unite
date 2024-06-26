import { Elysia, t } from 'elysia'
import { db } from '../../db/connection'

export const getAttendeeBadge = new Elysia().get(
  '/attendees/:attendeeId/badge',
  async ({ set, params, request }) => {
    const attendee = await db.query.attendees.findFirst({
      where(fields, operators) {
        return operators.eq(fields.id, params.attendeeId)
      },
      columns: {
        id: true,
        name: true,
        email: true,
      },
      with: {
        event: {
          columns: {
            title: true,
          },
        },
      },
    })

    if (!attendee) {
      set.status = 404

      return {
        message: 'Attendee not found',
      }
    }

    console.log(request.url)

    const checkInUrl = new URL(
      `/attendees/${attendee.id}/check-in`,
      request.url,
    )

    return {
      badge: {
        name: attendee.name,
        email: attendee.email,
        eventTitle: attendee.event.title,
        checkInUrl: checkInUrl.toString(),
      },
    }
  },
  {
    params: t.Object({
      attendeeId: t.Numeric(),
    }),
  },
)
