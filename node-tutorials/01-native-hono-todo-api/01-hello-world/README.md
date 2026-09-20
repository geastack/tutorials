# 01 — Hello world

In this lesson you will create a Node project from an empty directory, install
`geatsc`, and compile one TypeScript file into a native executable.

The [`01-hello-world`](.) directory is the completed project for reference.

## 1. Create the project

```sh
mkdir hello-world
cd hello-world
npm init -y
npm pkg set name=hello-world type=module
```

You now have a `package.json` describing an otherwise empty Node project.

## 2. Install geatsc

Add the compiler as a development dependency:

```sh
npm install --save-dev @geastack/compiler
```

This adds `@geastack/compiler` to `devDependencies` and creates a lockfile. Add
commands for building and running the program:

```sh
npm pkg set scripts.build=geatsc scripts.start=./dist/hello-world
```

`npm run build` will use the compiler installed in this project.

## 3. Configure TypeScript

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "noEmit": true
  },
  "include": ["src"]
}
```

## 4. Write the program

Create the source directory:

```sh
mkdir src
```

Then create `src/index.ts`:

```ts
console.log('Hello, world!')
```

`geatsc` recognizes `src/index.ts` as the project entry point.

## 5. Compile and run

```sh
npm run build
npm start
```

The build creates the native executable at `dist/hello-world`. Running it prints:

```text
Hello, world!
```

Continue with [`02-functions-and-types`](../02-functions-and-types/README.md).
