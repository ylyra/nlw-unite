import { Elysia, t } from 'elysia'
import { db } from '../../db/connection'

export const getAttendeeBadge = new Elysia().get(
  '/attendees/:attendeeId/badge',
  async ({ set, params }) => {
    const attendee = await db.query.attendees.findFirst({
      where(fields, operators) {
        return operators.eq(fields.id, params.attendeeId)
      },
      columns: {
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

    return {
      attendee,
    }
  },
  {
    params: t.Object({
      attendeeId: t.Numeric(),
    }),
  },
)
