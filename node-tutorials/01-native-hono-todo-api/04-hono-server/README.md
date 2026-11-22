# 04 — Hono server

Continue in the project from lesson 03. In this lesson you will install Hono,
add HTTP routes, and compile the project into a native server.

The [`04-hono-server`](.) directory is the completed project for reference.

## 1. Install Hono

Install Hono and its official Node server adapter, at the versions this
tutorial is built and tested with:

```sh
npm install --save-exact hono@4.12.34 @hono/node-server@2.1.1
npm install --save-dev @types/node
```

The compiler builds the libraries from their TypeScript source, so pin them:
newer Hono releases can use constructs this compiler release does not yet
compile.

Rename the package and update the executable used by `npm start`:

```sh
npm pkg set name=hono-app scripts.start=./dist/hono-app
```

## 2. Create the Hono application

Replace `src/index.ts` with:

```ts
import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (context) => context.text('Hello Hono!'))
app.get('/json', (context) => context.json({ hello: 'world' }))

serve({ fetch: (request) => app.fetch(request), port: 3000 }, (info) => {
  console.log(`Listening on http://127.0.0.1:${info.port}`)
})
```

`Hono` supplies the complete framework and router. `@hono/node-server` is
Hono's official bridge between Node HTTP requests and the web-standard
`Request` and `Response` objects used by `app.fetch`.

## 3. Compile and run

```sh
npm run build
npm start
```

Keep the server running and use another terminal to call both routes:

```sh
curl http://127.0.0.1:3000/
curl http://127.0.0.1:3000/json
```

The responses are:

```text
Hello Hono!
{"hello":"world"}
```

Continue with [`05-todo-api`](../05-todo-api/README.md).
