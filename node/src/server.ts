import getPort from 'get-port'

import { Elysia } from 'elysia'
import { createEvent } from './http/routes/create-event'

const port = await getPort({ port: [3333, 3334, 3335, 3336] })

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
  .use(createEvent)

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`)
})
