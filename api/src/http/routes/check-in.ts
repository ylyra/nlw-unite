import { Elysia, t } from 'elysia'
import { db } from '../../db/connection'
import { checkIns } from '../../db/schema'

export const checkIn = new Elysia().get(
  '/attendees/:attendeeId/check-in',
  async ({ set, params }) => {
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
        checkIn: true,
      },
    })

    if (!attendee) {
      set.status = 404

      return {
        message: 'Attendee not found',
      }
    }

    if (attendee.checkIn) {
      set.status = 400

      return {
        message: 'Attendee already checked in',
      }
    }

    await db.insert(checkIns).values({
      attendeeId: attendee.id,
    })

    set.status = 201
  },
  {
    params: t.Object({
      attendeeId: t.Numeric(),
    }),
  },
)
