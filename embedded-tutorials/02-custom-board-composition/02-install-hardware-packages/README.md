# 02 — Install the hardware packages

Continue in the project from step 01. Install each native build layer directly:

```sh
npm install @geastack/compiler
npm install @geastack/chips
npm install @geastack/targets
npm install @geastack/cli
```

These direct dependencies make the build layers visible in `package.json`:

- `@geastack/compiler` lowers the TypeScript module graph to native C++.
- `@geastack/chips` supplies the complete reusable display, touch, power,
  sensor, RTC, and audio driver catalog.
- `@geastack/targets` supplies supported board definitions and native build and
  flash adapters.
- `@geastack/cli` provides the `gea` command that coordinates those packages.

Installing `@geastack/chips` downloads the whole small catalog. It does not add
every chip to the firmware. The target's CMake source list decides which
drivers are compiled.

The CLI already depends on the packages it needs, so guided projects can keep a
smaller manifest. This manual tutorial lists them directly to expose each
layer. Only `typescript`, which is used for the optional source check, remains
in `devDependencies`.

No physical board has been selected yet. Continue with
[03 — Compose the board](../03-compose-the-board/README.md) to create one from
the chip catalog and give it a local alias.
