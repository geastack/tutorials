# Build an ESP32-S3 AMOLED app

The tutorial starts with the interactive Gea CLI and takes an ESP32-S3 Touch
AMOLED 2.06 app from a first USB flash to a Bluetooth update and a live network
request. Each numbered folder is the finished project for that lesson, so you
can compare your files with it.

Lessons 01 to 03 work in one project. Lesson 04 starts a new project from the
blank starter.

1. [`01-component-counter`](./01-component-counter/README.md): create the
   project, register the board and flash a counter over USB.
2. [`02-counter-store`](./02-counter-store/README.md): move the counter state
   into a Gea store in the same project.
3. [`03-ble-ota`](./03-ble-ota/README.md): change two lines in the same
   project and install the build over Bluetooth, with no USB data cable.
4. [`04-network-request`](./04-network-request/README.md): new project. Connect
   the board to Wi-Fi and fetch live data.

See the [embedded tutorials index](../README.md) for CLI installation.
