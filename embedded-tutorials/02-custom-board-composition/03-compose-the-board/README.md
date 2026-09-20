# 03 — Compose the board with the CLI

Create an empty app-local ESP32-S3 target:

```sh
npx gea setup
```

Choose **Custom board target**, use `manual-amoled` as the alias, and select
ESP32-S3. Choose **None / configure later** for each controller. Add the
microSD slot with pins 2, 1, and 3; add the active-low launcher button on pin 0;
and skip USB serial for now. This creates the board alias and a target
definition under `.gea/`; it does not select a ready-made board preset.

Inspect the catalog before assembling the board:

```sh
npx gea chips list
npx gea chips info co5300
npx gea chips info ft3168
```

Add the controllers one at a time. Each command reads its questions from the
installed `@geastack/chips` catalog, so the CLI asks only for interfaces,
dimensions, and pins that controller needs:

```sh
npx gea chips add co5300 --board manual-amoled
npx gea chips add ft3168 --board manual-amoled
npx gea chips add axp2101 --board manual-amoled
npx gea chips add qmi8658 --board manual-amoled
npx gea chips add es8311 --board manual-amoled
```

The FT3168, AXP2101, and QMI8658 share one I²C bus. The first I²C chip asks for
SDA and SCL; later additions reuse those values. This board uses GPIO 15 for
SDA and GPIO 14 for SCL.

The checked-in [target definition](./.gea/targets/manual-amoled.json) is the
result. The CLI rejects unknown chips, incompatible MCU
bindings, missing required values, and duplicate GPIO assignments before the
native build starts.

You can change a role later without editing JSON:

```sh
npx gea chips remove co5300 --board manual-amoled
npx gea chips add co5300 --board manual-amoled
```

Continue with [04 — Build and flash](../04-build-and-flash/README.md).
