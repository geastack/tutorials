# 01 — Create the app

Start from an empty directory and initialize an ordinary npm project:

```sh
mkdir manual-amoled-app
cd manual-amoled-app
npm init -y
npm pkg set name=manual-amoled-app type=module
npm pkg set private=true --json
```

Install the application runtime and TypeScript directly:

```sh
npm install @geastack/core
npm install --save-dev typescript
```

Add the `check` script and `gea` application manifest shown in
[`package.json`](./package.json), then add [`.gitignore`](./.gitignore),
[`tsconfig.json`](./tsconfig.json), and the [`src`](./src) directory. The
manifest declares that this application may run on ESP32 and that its firmware
should include BLE updates. It does not select a physical board yet.

Check the application source:

```sh
npm run check
```

Continue with [02 — Install the hardware packages](../02-install-hardware-packages/README.md).
