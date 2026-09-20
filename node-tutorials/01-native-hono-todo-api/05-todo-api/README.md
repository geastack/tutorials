# 05 — Todo API

Continue in the Hono project from lesson 04. In this lesson you will add typed
application state, a JSON endpoint, request-body parsing, and input validation.

The [`05-todo-api`](.) directory is the completed project for reference.

## 1. Define a todo

Replace `src/index.ts`. Start with the imports, the `Todo` type, and an in-memory
list:

```ts
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
```

## 2. Add JSON responses

Use Hono's JSON response for the typed list:

```ts
app.get('/todos', (context) => context.json(todos))
```

Add a helper for object responses that carry a custom status code:

```ts
const json = (value: Record<string, unknown>, status = 200): Response =>
  new Response(JSON.stringify(value), {
    status,
    headers: { 'content-type': 'application/json; charset=UTF-8' },
  })
```

Place the helper before the GET route.

## 3. Create todos

Add a route that reads JSON from the request, validates it, and appends a todo:

```ts
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
```

Finally, start the server:

```ts
serve({ fetch: (request) => app.fetch(request), port: 3000 }, (info) => {
  console.log(`Listening on http://127.0.0.1:${info.port}`)
})
```

The complete result is available in [`src/index.ts`](./src/index.ts).

## 4. Compile and run

```sh
npm run build
npm start
```

Keep the server running and exercise the API from another terminal:

```sh
curl http://127.0.0.1:3000/todos
curl -X POST http://127.0.0.1:3000/todos \
  -H 'content-type: application/json' \
  -d '{"title":"Build the todo tutorial"}'
curl http://127.0.0.1:3000/todos
```

The first request returns the seeded todo, the second creates a todo with ID 2,
and the final request returns both items.
