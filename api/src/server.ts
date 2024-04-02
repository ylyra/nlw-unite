import swagger from '@elysiajs/swagger'
import { Elysia } from 'elysia'
import { env } from './env'
import { createEvent } from './http/routes/create-event'

const port = env.PORT

const app = new Elysia()
  .onError(({ code, error, set }) => {
    switch (code) {
      case 'VALIDATION': {
        set.status = 400
        return error.toResponse()
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
  .use(swagger())
  .use(createEvent)

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`)
})
