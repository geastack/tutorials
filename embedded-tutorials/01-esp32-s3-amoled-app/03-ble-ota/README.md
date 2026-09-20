# 03 — Update over BLE

Lesson 03 stays in the `component-counter` project. The counter was created
with Bluetooth updates enabled, and the USB flash in lesson 01 put the BLE OTA
service on the board. Now you change two lines and install the new build over
Bluetooth with no USB data connection.

## 1. Check that BLE updates are on

Bluetooth updates are a setting in `package.json`, under the `gea` section:

```json
"ota": {
  "ble": true
}
```

The counter starter sets it to `true`. If it is missing or `false` in your
project, set it to `true` now, then flash once over USB with
`gea flash` so the running firmware contains the OTA service.
The same switch works the other way: set it to `false` and rebuild when an app
does not need Bluetooth, and the BLE stack stays out of the firmware.

## 2. Change the app

Make the new build easy to recognise. In `src/counter-store.ts` start the
counter at 100:

```ts
  count = 100
```

In `src/App.tsx` change the title line:

```tsx
        <span class="title">Installed over BLE</span>
```

## 3. Unplug the cable

Unplug the USB data cable and power the board from a charger or a power only
cable. The board keeps running the lesson 02 build.

## 4. Build and send it over Bluetooth

From a Mac with Bluetooth on:

```sh
npm run check
gea build
gea ota
```

Because Bluetooth updates were enabled when the project was created, `gea ota`
uses BLE without any extra flag. The CLI finds the nearby **Geastack OTA**
device, transfers the image in chunks, checks it, switches the boot partition
and reboots. The screen now says "Installed over BLE" and the counter starts at
100.

If the transfer is interrupted, power cycle the board and run the `gea ota`
command again. The partition that is running is never overwritten, so the board
always has a working app.
