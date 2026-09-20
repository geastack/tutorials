# 03 — Modules

Continue in the `hello-world` project from lesson 02. In this lesson you will
move reusable functions into a second TypeScript module.

The [`03-modules`](.) directory is the completed project for reference.

## 1. Create the math module

Create `src/math.ts`:

```ts
export function add(left: number, right: number): number {
  return left + right
}

export function multiply(left: number, right: number): number {
  return left * right
}
```

## 2. Import it from the entry point

Replace `src/index.ts` with:

```ts
import { add, multiply } from './math.js'

console.log(`2 + 3 = ${add(2, 3)}`)
console.log(`4 × 5 = ${multiply(4, 5)}`)
```

The import uses a `.js` extension because the project follows Node's ESM rules.
Geatsc resolves that import to `src/math.ts` while compiling the complete module
graph.

## 3. Compile and run

```sh
npm run build
npm start
```

The program prints:

```text
2 + 3 = 5
4 × 5 = 20
```
