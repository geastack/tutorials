# 06 — MongoDB todo API

Continue from lesson 05 by replacing the in-memory array with MongoDB. The API
still uses Hono, but todos now survive server restarts.

The [`06-mongodb-todo-api`](.) directory is the completed project for reference.

## 1. Install the MongoDB driver

From the lesson 05 project, install the official Node.js driver:

```sh
npm install --save-exact mongodb@7.1.1 bson@7.3.3
```

The versions are exact because they are the ones this lesson is verified to
compile natively. `bson` is a direct dependency because the native MongoDB implementation
compiles BSON's TypeScript source together with the driver's. Application code
continues to import the public `mongodb` package.

The driver's source also imports the types of its optional peers -- Kerberos
authentication, client-side encryption and the GCP metadata client. Install
them as development dependencies so the compiler can read those types:

```sh
npm install --save-dev --save-exact kerberos@7.0.0 mongodb-client-encryption@7.0.0 gcp-metadata@7.0.1
```

They stay out of the executable. A development dependency is installed for its
types only, so the binary answers the driver's guarded `require` of one the way a
production install (`npm install --omit=dev`) does: the module is not found, and
the driver carries on without that feature.

The driver's wire compression imports `node:zlib`, so the executable links the
system's zlib, brotli decoder and zstd. Install them once: `brew install brotli zstd`
on macOS, `sudo apt install zlib1g-dev libbrotli-dev libzstd-dev` on Debian/Ubuntu (an updated
Ubuntu 24.04 package carries the brotli security fix the build checks for). On
a system whose brotli lacks that fix, the build says so; the node-compat
README's `BROTLI_DIR` recipe covers that case.

The finished project has its own name, so its executable is
`dist/hono-mongodb-app`. Rename yours to match:

```sh
npm pkg set name=hono-mongodb-app scripts.start=./dist/hono-mongodb-app
```

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

The explicit `Document` shape puts the literal straight into BSON's
string-indexed `Document` representation instead of relying on the compiler to
convert a closed object literal at the insert boundary. Keeping `id` in a
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
