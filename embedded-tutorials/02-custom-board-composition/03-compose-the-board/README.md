# 03 — Compose the board with the CLI

Create an empty app-local ESP32-S3 target:

```sh
npx gea setup --local
```

`--local` saves the board in this project's `.gea/` directory. This project was
made with `npm init`, so it has no `.gea/boards.json` yet, and without the flag
the wizard would save the alias and target definition under `~/.geastack/`
instead.

Answer the wizard like this:

1. **What do you want to set up?** Choose **Custom board profile**.
2. **Custom board alias.** Enter `manual-amoled`.
3. **MCU / SoC.** Choose **ESP32-S3**.
4. **Display controller**, **Touch controller**, **Power-management
   controller**, **Inertial measurement unit**, **Audio codec** and **I/O
   expander (backlight, reset lines)**: choose **None / configure later** for
   each. The `gea chips add` commands below add them one at a time.
5. **Does this board expose a microSD slot?** Answer `y`, then enter `2` for the
   **microSD clock pin**, `1` for the **microSD command pin** and `3` for the
   **microSD data 0 pin**.
6. **Use a hardware button to return to the launcher?** Answer `y`, enter `0`
   for the **Launcher button pin** and choose **Active low**.
7. **Is the board connected over USB right now?** Answer `n`. Step 04
   identifies the board when you plug it in.
8. **Save this custom board target?** Answer `y`.

The wizard writes `.gea/boards.json` with the `manual-amoled` alias and the
target definition `.gea/targets/manual-amoled.json`; it does not select a
ready-made board preset. If ESP-IDF is not installed it offers to install it.
Because no controllers are selected yet, it ends with "Profile saved" and the
hint to add the remaining roles with `gea chips add`.

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
