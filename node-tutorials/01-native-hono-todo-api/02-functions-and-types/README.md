# 02 — Functions and types

Continue in the `hello-world` project from lesson 01. In this lesson you will
add a typed object and pass it to a function.

The [`02-functions-and-types`](.) directory is the completed project for reference.

## 1. Replace the program

Replace `src/index.ts` with:

```ts
type Person = {
  name: string
  messages: number
}

function greeting(person: Person): string {
  return `Hello, ${person.name}! You have ${person.messages} messages.`
}

const visitor: Person = {
  name: 'Ada',
  messages: 3,
}

console.log(greeting(visitor))
```

The `Person` type describes the native data layout that geatsc generates, while
the function's parameter and return annotations make its contract explicit.

## 2. Compile and run

```sh
npm run build
npm start
```

The program prints:

```text
Hello, Ada! You have 3 messages.
```

Continue with [`03-modules`](../03-modules/README.md).
