import { and, count, eq, ilike } from 'drizzle-orm'
import { Elysia, t } from 'elysia'
import { db } from '../../db/connection'
import { attendees } from '../../db/schema'

export const getEventAttendees = new Elysia().get(
  '/events/:eventId/attendees',
  async ({ params, query }) => {
    const search = query.query
    const pageIndex = query.pageIndex || 0

    const whereOperator = and(
      eq(attendees.eventId, params.eventId),
      search ? ilike(attendees.name, `%${search}%`) : undefined,
    )

    const [[{ count: amountOfAttendees }], allAttendees] = await Promise.all([
      db
        .select({
          count: count(),
        })
        .from(attendees)
        .where(whereOperator),

      db.query.attendees.findMany({
        columns: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        },
        with: {
          checkIn: {
            columns: {
              createdAt: true,
            },
          },
        },
        limit: 10,
        offset: pageIndex * 10,
        where: whereOperator,
        orderBy(fields, operators) {
          return [operators.desc(fields.createdAt)]
        },
      }),
    ])

    return {
      attendees: allAttendees.map((attendee) => ({
        id: attendee.id,
        name: attendee.name,
        email: attendee.email,
        createdAt: attendee.createdAt,
        checkedInAt: attendee.checkIn?.createdAt || null,
      })),
      total: amountOfAttendees,
    }
  },
  {
    params: t.Object({
      eventId: t.String(),
    }),
    query: t.Object({
      pageIndex: t.Optional(
        t.Numeric({
          minimum: 0,
          default: 0,
        }),
      ),
      query: t.Optional(t.String()),
    }),
  },
)
