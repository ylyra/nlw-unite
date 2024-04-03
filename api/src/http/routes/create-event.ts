import { Elysia, t } from 'elysia'
import slugify from 'slugify'
import { db } from '../../db/connection'
import { events } from '../../db/schema'

export const createEvent = new Elysia().post(
  '/events',
  async ({ body, set }) => {
    const slug = slugify(body.title, { lower: true, trim: true })
    const eventWithSameSlug = await db.query.events.findFirst({
      where(fields, operators) {
        return operators.eq(fields.slug, slug)
      },
    })

    if (eventWithSameSlug) {
      set.status = 409
      return {
        message: 'Another event with the same title already exists',
      }
    }

    const data = await db
      .insert(events)
      .values({
        title: body.title.trim(),
        details: body.details,
        maximumAttendees: body.maximumAttendees,
        slug,
      })
      .returning({
        id: events.id,
      })
    const item = data[0]

    set.status = 201
    return {
      eventId: item.id,
    }
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
