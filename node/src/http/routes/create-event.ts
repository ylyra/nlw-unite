import { Elysia, t } from 'elysia'
import slugify from 'slugify'
import { db } from '../../db/connection'
import { events } from '../../db/schema'

export const createEvent = new Elysia().post(
  '/events',
  async ({ body, set }) => {
    const data = await db
      .insert(events)
      .values({
        title: body.title.trim(),
        details: body.details,
        maximumAttendees: body.maximumAttendees,
        slug: slugify(body.title, { lower: true, trim: true }),
      })
      .returning({
        id: events.id,
      })
    const item = data[0]

    set.status = 201
    return item
  },
  {
    body: t.Object({
      title: t.String(),
      details: t.Optional(t.String()),
      maximumAttendees: t.Optional(
        t.Integer({
          minimum: 1,
        }),
      ),
    }),
  },
)
