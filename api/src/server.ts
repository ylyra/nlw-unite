import cors from '@elysiajs/cors'
import swagger from '@elysiajs/swagger'
import { Elysia } from 'elysia'
import { env } from './env'
import { createEvent } from './http/routes/create-event'
import { getAttendeeBadge } from './http/routes/get-attendee-badge'
import { getEvent } from './http/routes/get-event'
import { registerForEvent } from './http/routes/register-for-event'

const port = env.PORT

const app = new Elysia()
  .onError(({ code, error, set }) => {
    switch (code) {
      case 'VALIDATION': {
        set.status = 400
        return error.toResponse()
      }
      case 'NOT_FOUND': {
        set.status = 404
        return {
          code,
          message: 'Not Found',
        }
      }
      default: {
        set.status = 500

        return {
          code,
          message: 'Internal Server Error',
        }
      }
    }
  })
  .use(cors())
  .use(
    swagger({
      theme: 'kepler', // saturn, bluePlanet, kepler
    }),
  )
  .use(createEvent)
  .use(registerForEvent)
  .use(getEvent)
  .use(getAttendeeBadge)

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`)
})
