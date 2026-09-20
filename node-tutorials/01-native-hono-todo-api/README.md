# Build a native Hono todo API

This tutorial starts with an empty Node project and ends with a Hono todo API
compiled into a native executable and backed by MongoDB. Each numbered folder
is a complete project snapshot at the end of that step.

Follow the steps in order:

1. [`01-hello-world`](./01-hello-world/README.md) — create a Node project,
   install the compiler, and build one TypeScript file.
2. [`02-functions-and-types`](./02-functions-and-types/README.md) — add typed
   objects and functions.
3. [`03-modules`](./03-modules/README.md) — split the program across multiple
   source files.
4. [`04-hono-server`](./04-hono-server/README.md) — turn the project into a
   native Hono HTTP server.
5. [`05-todo-api`](./05-todo-api/README.md) — build an in-memory JSON todo API.
6. [`06-mongodb-todo-api`](./06-mongodb-todo-api/README.md) — persist the Hono
   todo API in MongoDB.

To run a completed snapshot directly:

```sh
cd 01-hello-world
npm install
npm run build
npm start
```

See the [Node tutorials index](../README.md) for npm authentication and global
compiler installation.
