# Compose a custom board target

This tutorial starts with an ordinary empty npm project and assembles an
ESP32-S3 board from the installed chip catalog. It never selects the ready-made
Waveshare board preset. The generated target definition selects native driver
sources and becomes the C++ pin map used by the firmware.

Each numbered folder is a complete snapshot at the end of that step:

1. [`01-create-the-app`](./01-create-the-app/README.md) — initialize npm,
   install the Gea runtime, and write the TypeScript application.
2. [`02-install-hardware-packages`](./02-install-hardware-packages/README.md) —
   install the compiler, chip catalog, target catalog, and CLI as normal
   project dependencies.
3. [`03-compose-the-board`](./03-compose-the-board/README.md) — use `gea setup`
   and `gea chips` to select the MCU, controllers, buses, and GPIO map.
4. [`04-build-and-flash`](./04-build-and-flash/README.md) — build the generated
   target and install it over USB, then use BLE OTA for later updates.

`@geastack/chips` is one npm package. npm downloads its complete reusable
driver catalog; the package currently weighs about 8 KB compressed and 35 KB
unpacked. A selected target compiles only the drivers that board uses into the
firmware. npm cannot install one directory or subpath from a package, so
commands such as `npm install @geastack/chips/co5300` are not valid package
installs.

The composable base is the generic `esp32-s3` platform. It supplies ESP-IDF,
the Gea runtime, partitions, build integration, and OTA plumbing. The app-local
definition supplies the peripherals and pin map. Unsupported controllers
fail during configuration with a direct error.

See the [embedded tutorials index](../README.md) for the guided alternative.
