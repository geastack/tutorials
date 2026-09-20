import { serve } from '@hono/node-server'
import { Hono } from 'hono'

type Todo = {
  id: number
  title: string
  completed: boolean
}

const todos: Todo[] = [
  { id: 1, title: 'Compile a Hono app', completed: true },
]
let nextId = 2

const app = new Hono()

const json = (value: Record<string, unknown>, status = 200): Response =>
  new Response(JSON.stringify(value), {
    status,
    headers: { 'content-type': 'application/json; charset=UTF-8' },
  })

app.get('/todos', (context) => context.json(todos))

app.post('/todos', async (context) => {
  const value: unknown = await context.req.json()
  if (typeof value !== 'object' || value === null) {
    return json({ error: 'Expected a JSON object' }, 400)
  }

  const input = value as Record<string, unknown>
  if (typeof input.title !== 'string' || input.title.trim().length === 0) {
    return json({ error: 'title is required' }, 400)
  }

  const todo: Todo = {
    id: nextId,
    title: input.title.trim(),
    completed: false,
  }
  nextId += 1
  todos.push(todo)

  return json(todo, 201)
})

serve({ fetch: (request) => app.fetch(request), port: 3000 }, (info) => {
  console.log(`Listening on http://127.0.0.1:${info.port}`)
})
