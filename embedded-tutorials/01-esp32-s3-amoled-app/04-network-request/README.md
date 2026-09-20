# 04 — Make a network request

Lesson 04 is a new project, not a continuation of lesson 03. You start from
the blank starter, connect the board to Wi-Fi, wait for the network stack and
fetch a short text over HTTPS with the normal `fetch` API.

## 1. Create a blank project

```sh
gea create network-request
```

Answer the wizard like this:

1. **What do you want to build?** Choose **1, Blank application**.
2. **Where should this application run?** Choose **2, ESP32 board**.
3. **Enable wireless firmware updates over Bluetooth?** Answer `n`.

The CLI writes `src/index.tsx`, `src/styles.css`, the Inter font under
`assets/fonts/`, a `tsconfig.json`, a `.gitignore` and installs the
dependencies. Then:

```sh
cd network-request
```

## 2. Write the app

`src/network-store.ts` owns the Wi-Fi state and the request. Waiting for
`WiFi.connected()` before calling `fetch` is required on the embedded target:

```ts
import { Store, WiFi } from '@geastack/core'

class NetworkStore extends Store {
  status = 'Starting Wi-Fi'
  message = 'Waiting for a connection…'
  requested = 0

  connect() {
    const ssid = import.meta.env.GEA_WIFI_SSID
    const password = import.meta.env.GEA_WIFI_PASSWORD
    if (ssid.length > 0) WiFi.configure(ssid, password)
    else WiFi.setEnabled(true)
  }

  tick() {
    if (this.requested || !WiFi.connected()) return
    this.requested = 1
    this.status = 'Connected: ' + WiFi.ssid()
    this.loadMessage()
  }

  async loadMessage() {
    this.status = 'Fetching over HTTPS'
    try {
      const response = await fetch('https://api.github.com/zen')
      if (response.ok) {
        this.message = await response.text()
        this.status = 'HTTP ' + response.status
      } else {
        this.message = 'The request failed'
        this.status = 'HTTP ' + response.status
      }
    } catch {
      this.message = 'Could not reach the server'
      this.status = 'Network error'
    }
  }
}

export const network = new NetworkStore()
```

`src/App.tsx` only shows the store fields:

```tsx
import { ReactiveComponent } from '@geastack/core'
import { network } from './network-store'
import './styles.css'

export class App extends ReactiveComponent {
  template() {
    return (
      <div class="screen">
        <span class="eyebrow">LIVE REQUEST</span>
        <span class="message">{network.message}</span>
        <span class="status">{network.status}</span>
      </div>
    )
  }
}
```

Replace `src/index.tsx`. `Display.setFlushConfig` reserves enough internal RAM
for the ESP32 Wi-Fi driver on this display, and the animation frame loop polls
the store until the network is up:

```tsx
import { Display, mount } from '@geastack/core'
import { App } from './App'
import { network } from './network-store'

Display.setFlushConfig({ rows: 36, depth: 2 })
network.connect()
mount(App)

requestAnimationFrame(function poll() {
  network.tick()
  requestAnimationFrame(poll)
})
```

Replace `src/styles.css`. Keep the `@font-face` rule, the font file it names is
already in `assets/fonts/`:

```css
@font-face {
  font-family: 'Inter';
  src: url('../assets/fonts/Inter-Regular.ttf');
}

.screen { display: flex; flex-direction: column; width: 100vw; height: 100vh; padding: 30px; gap: 20px; align-items: center; justify-content: center; background-color: #071018; color: #f8fafc; font-family: 'Inter'; }
.eyebrow { color: #38bdf8; font-size: 14px; }
.message { color: #ffffff; font-size: 30px; text-align: center; }
.status { color: #94a3b8; font-size: 15px; text-align: center; }
```

## 3. Add your Wi-Fi credentials

Create a file called `.env` in the project root with your network name and
password:

```sh
GEA_WIFI_SSID=Your Wi-Fi name
GEA_WIFI_PASSWORD=Your Wi-Fi password
```

The build inlines these two values into the firmware. `.env` is already in the
generated `.gitignore`, so it stays out of Git.

## 4. Register the board and flash

Board aliases live per project, so run the wizard again with the same answers
as in lesson 01: known board, default alias, connected over USB, no OTA host.

```sh
gea setup
npm run check
gea build
gea flash --monitor
```

The screen shows "Starting Wi-Fi", then the network name, then a short
sentence from the GitHub API with "HTTP 200" under it.
