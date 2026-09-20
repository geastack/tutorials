# 06 — MongoDB todo API

Continue from lesson 05 by replacing the in-memory array with MongoDB. The API
still uses Hono, but todos now survive server restarts.

The [`06-mongodb-todo-api`](.) directory is the completed project for reference.

## 1. Install the MongoDB driver

From the lesson 05 project, install the official Node.js driver:

```sh
npm install mongodb bson
```

`bson` is pinned because the native MongoDB implementation compiles its
version-matched TypeScript source. Application code continues to import the
public `mongodb` package.

## 2. Start MongoDB

This lesson uses a local MongoDB server. If you have Docker, start one with:

```sh
docker run --name geatsc-mongodb -p 27017:27017 -d mongo:8.0
```

Set its connection string in the shell where you will run the application:

```sh
export MONGODB_URI='mongodb://127.0.0.1:27017'
```

Keep connection strings in the environment; do not put them in `src/index.ts`
or commit them. The current native MongoDB target supports direct, unauthenticated
`mongodb://host:port` connections. TLS, authentication, replica-set discovery,
and `mongodb+srv` are later compatibility work.

The application will use the `geatsc_tutorial` database and the `todos`
collection. MongoDB creates both when the first todo is inserted.

## 3. Create a typed collection

Replace the in-memory `Todo` definition and array with a document type, a client,
and a typed collection:

```ts
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
```

Create each MongoDB `_id` in the application so the POST response can return it
without another query.

## 4. Read todos

Replace the GET route with a query. Convert each `ObjectId` to a string before
sending it as JSON:

```ts
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
```

## 5. Insert todos

Keep the validation from lesson 05, then replace `todos.push(todo)` with an
insert:

```ts
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
```

With `@geastack/compiler@1.0.4`, this explicit `Document` shape is required:
the compiler does not yet convert a closed object literal to BSON's
string-indexed `Document` representation automatically. Keeping `id` in a
typed local also ensures `ObjectId` methods use their native receiver after a
document has crossed the BSON dictionary boundary.

Connect before starting the HTTP server:

```ts
await client.connect()
```

The complete result is in [`src/index.ts`](./src/index.ts).

## 6. Compile and run

```sh
npm install
npm run build
MONGODB_URI='mongodb://127.0.0.1:27017' npm start
```

Keep the server running and exercise it from another terminal:

```sh
curl http://127.0.0.1:3000/todos
curl -X POST http://127.0.0.1:3000/todos \
  -H 'content-type: application/json' \
  -d '{"title":"Store todos in MongoDB"}'
curl http://127.0.0.1:3000/todos
```

The POST returns the inserted todo with its MongoDB ID. The final GET includes
the same todo, including after you restart the native executable.
