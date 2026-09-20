import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { MongoClient, ObjectId, type Document } from 'mongodb'
import { env } from 'node:process'

type TodoDocument = Document & {
  _id: ObjectId
  title: string
  completed: boolean
}

const uri = env.MONGODB_URI
if (typeof uri !== 'string' || uri.length === 0) {
  throw new Error('Set MONGODB_URI before starting the server')
}

const client = new MongoClient(uri)
const todos = client.db('geatsc_tutorial').collection<TodoDocument>('todos')
const app = new Hono()

const json = (value: Record<string, unknown>, status = 200): Response =>
  new Response(JSON.stringify(value), {
    status,
    headers: { 'content-type': 'application/json; charset=UTF-8' },
  })

app.get('/todos', async (context) => {
  const documents = await todos.find({}).sort({ _id: 1 }).toArray()
  const result = documents.map((document: Document) => {
    const id = document._id as ObjectId
    return {
      id: id.toHexString(),
      title: document.title as string,
      completed: document.completed as boolean,
    }
  })

  return context.json(result)
})

app.post('/todos', async (context) => {
  const value: unknown = await context.req.json()
  if (typeof value !== 'object' || value === null) {
    return json({ error: 'Expected a JSON object' }, 400)
  }

  const input = value as Record<string, unknown>
  if (typeof input.title !== 'string' || input.title.trim().length === 0) {
    return json({ error: 'title is required' }, 400)
  }

  // MongoDB's insert boundary accepts BSON's dictionary-shaped Document.
  // Computed keys keep the literal in that representation while the collection
  // retains its strongly typed document schema.
  const id = new ObjectId()
  const title = input.title.trim()
  const todo: Document = {
    ['_id']: id,
    ['title']: title,
    ['completed']: false,
  }
  await todos.insertOne(todo as TodoDocument)

  return json(
    {
      id: id.toHexString(),
      title,
      completed: false,
    },
    201,
  )
})

await client.connect()

serve({ fetch: (request) => app.fetch(request), port: 3000 }, (info) => {
  console.log(`Listening on http://127.0.0.1:${info.port}`)
})
