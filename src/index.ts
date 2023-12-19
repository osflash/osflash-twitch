import { Elysia } from 'elysia'

import { cors } from '@elysiajs/cors'
import { swagger } from '@elysiajs/swagger'

import { getTop } from '~/http/routes/lol/get-top'

const app = new Elysia().use(cors()).use(getTop).use(swagger())

app.listen(3333)

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
)
