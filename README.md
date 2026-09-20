# GeaStack tutorials

Step-by-step courses that build real GeaStack applications — from a first
"hello" to a native HTTP server and a custom ESP32-S3 board.

Every tutorial is a named folder whose numbered subfolders are its progressive
steps, and each step is a complete project snapshot. You can run any step as
it stands, or diff one against the next to see exactly what changed.

## Learning paths

### [Node](./node-tutorials/README.md)

Compile Node and server applications into native executables.

1. [Build a native Hono todo API](./node-tutorials/01-native-hono-todo-api/README.md)
   — start with Hello World, introduce types and modules, build a Hono API,
   then add MongoDB persistence.

### [Embedded](./embedded-tutorials/README.md)

Build, flash and update a Gea app on real hardware.

1. [Build an ESP32-S3 AMOLED app](./embedded-tutorials/01-esp32-s3-amoled-app/README.md)
   — create a touchscreen counter, extract its state into a store, install the
   next build over Bluetooth, and make a network request.
2. [Compose a custom board target](./embedded-tutorials/02-custom-board-composition/README.md)
   — install each runtime and toolchain package explicitly, then use the CLI
   to assemble an app-local ESP32-S3 target from chips and GPIO assignments.

## What you need

Node.js 22 or newer and npm. The embedded path also needs an ESP32-S3 board.
`npx gea doctor` checks the toolchains for whichever target you pick and names
anything that is missing.

Each tutorial installs the compiler into its own project snapshot, so the
compiler version is recorded in that step's `package.json` and everyone
working through it builds with the same one.

## License

MIT (see `LICENSE`). Use it, change it, ship closed-source products on it, no
strings attached. The only GeaStack code under a different license is the
embedded board support (`targets` and `@geastack/chips`, GPL-3.0-only):
shipping closed-source firmware through those needs a commercial license.
Contact [contact@geastack.com](mailto:contact@geastack.com) for commercial terms, support and hosted builds.
