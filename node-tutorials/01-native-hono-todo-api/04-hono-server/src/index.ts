import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (context) => context.text('Hello Hono!'))
app.get('/json', (context) => context.json({ hello: 'world' }))

serve({ fetch: (request) => app.fetch(request), port: 3000 }, (info) => {
  console.log(`Listening on http://127.0.0.1:${info.port}`)
})
