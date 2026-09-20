# Embedded tutorials

Each folder is a separate hardware tutorial. Numbered folders inside it are the
progressive steps for that tutorial.

1. [Build an ESP32-S3 AMOLED app](./01-esp32-s3-amoled-app/README.md) — create a
   touchscreen counter, extract its state into a store, install the next build
   over Bluetooth, and make a network request.
2. [Compose a custom board target](./02-custom-board-composition/README.md) —
   install each runtime and toolchain package explicitly, then use the CLI to
   assemble an app-local ESP32-S3 target from chips and GPIO assignments.

## Before you start

Install the CLI globally once. The guided tutorial uses `gea create`; the
manual tutorial starts with `npm init` and installs the same packages one at a
time so their roles remain visible.

```sh
npm install --global @geastack/cli
```
