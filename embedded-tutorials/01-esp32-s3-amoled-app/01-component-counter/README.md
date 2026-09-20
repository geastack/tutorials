# 01 — Component counter

In this lesson you create a Geastack project with the CLI, look at the three
files it generates, register your board and flash a touchscreen counter over
USB.

## 1. Create the project

```sh
npm install --global @geastack/cli
gea create component-counter
```

The CLI asks what you want to build and shows two options:

1. **Blank application**: an empty screen. Lesson 04 uses this one.
2. **Example application**: a complete app from the Geastack example gallery.

Choose **2**. The gallery opens with **1, Component Counter** as its first
entry, so choose **1** there. The CLI writes the project, picks ESP32 as the
target, enables BLE updates and runs `npm install`. When it finishes:

```sh
cd component-counter
```

## 2. Look at the app

The project has three source files and a font. `ReactiveComponent` turns the `count`
field into reactive state, so assigning it redraws the number.

`src/index.tsx` mounts the app:

```tsx
import { mount } from '@geastack/core'
import { App } from './App'

mount(App)
```

`src/App.tsx` holds the state and the screen:

```tsx
import { ReactiveComponent } from '@geastack/core'
import './styles.css'

export class App extends ReactiveComponent {
  count = 0

  decrement() {
    this.count = this.count - 1
  }

  increment() {
    this.count = this.count + 1
  }

  template() {
    return (
      <div class="screen">
        <span class="eyebrow">GEASTACK</span>
        <span class="title">Component state</span>
        <span class="count">{this.count}</span>
        <div class="controls">
          <button class="button secondary" onClick={() => this.decrement()}>−</button>
          <button class="button primary" onClick={() => this.increment()}>+</button>
        </div>
      </div>
    )
  }
}
```

`src/styles.css` styles it. The `@font-face` rule points at the Inter font the
CLI put in `assets/fonts/`. Firmware bakes text from that TTF, so every app needs
such a rule, or the board falls back to a small bitmap font:

```css
@font-face {
  font-family: 'Inter';
  src: url('../assets/fonts/Inter-Regular.ttf');
}

.screen {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  padding: 28px;
  gap: 16px;
  align-items: center;
  justify-content: center;
  background-color: #080b12;
  color: #f8fafc;
  font-family: 'Inter';
}

.eyebrow { color: #2dd4bf; font-size: 13px; }
.title { color: #cbd5e1; font-size: 22px; }
.count { color: #ffffff; font-size: 76px; line-height: 1; }
.controls { display: flex; flex-direction: row; gap: 16px; }
.button { display: flex; align-items: center; justify-content: center; width: 92px; height: 58px; border-radius: 14px; border-width: 2px; font-size: 30px; }
.secondary { color: #f8fafc; background-color: #1e293b; border-color: #475569; }
.primary { color: #042f2e; background-color: #2dd4bf; border-color: #5eead4; }
```

## 3. Register the board

Connect your board over USB and run:

```sh
gea setup
```

The wizard asks a few questions. Answer them like this:

1. **What do you want to set up?** Choose **1, Known supported board**.
2. **Which board do you have?** Pick your board from the list. It shows every
   board Geastack can flash, with the chip and display next to each name.
3. **Board alias.** Press Enter to accept `amoled`. The alias is how you name
   the board when more than one is registered.
4. **Is the board connected over USB right now?** Answer `y`. The CLI finds the
   serial port and remembers the board's serial number.
5. **OTA host/IP.** Press Enter to leave it empty. OTA stands for over the air
   update. You would enter the board's IP address here if you wanted to send
   firmware over Wi-Fi. Lesson 03 sends firmware over Bluetooth instead, and
   that does not need an address.
6. **Save this board setup?** Answer `y`.

The CLI writes `.gea/boards.json`, checks your ESP-IDF install and configures
the build. The last line tells you the flash command.

## 4. Check, build and flash

```sh
npm run check
```

`check` runs the TypeScript compiler. When everything is fine it prints only
the command it ran and nothing else. Any type error shows up here with a file
name and line number.

```sh
gea build
gea flash --monitor
```

The first build compiles ESP-IDF and takes a few minutes. Flashing installs the
app and opens the serial monitor. Tap the two buttons on the display and the
number changes.

The commands do not name the board because only one is registered, so the CLI
uses it. Once you register a second board, add `--board amoled` to each device
command, or the CLI stops and lists the aliases to choose from.

To see the screen from your Mac, stop the monitor with Ctrl+C first, because
the monitor keeps the serial port busy, then run:

```sh
gea screenshot screenshot.png
```

Keep the USB cable connected for the next lessons. Each numbered folder in this
tutorial is the finished project for that lesson, so you can compare your files
with the folder at any point.
