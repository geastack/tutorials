# 02 — Move state into a store

Lesson 02 continues in the `component-counter` project from lesson 01. You
move `count` out of the component and into a `Store`, so other components can
share the same state. The screen still updates when a store method assigns the
field.

## 1. Add the store

Create `src/counter-store.ts`:

```ts
import { Store } from '@geastack/core'

class CounterStore extends Store {
  count = 0

  decrement() { this.count = this.count - 1 }
  increment() { this.count = this.count + 1 }
  reset() { this.count = 0 }
}

export const counter = new CounterStore()
```

## 2. Use it from the component

Replace `src/App.tsx` with this version. The component no longer owns any
state, it only reads and calls the store:

```tsx
import { ReactiveComponent } from '@geastack/core'
import { counter } from './counter-store'
import './styles.css'

export class App extends ReactiveComponent {
  template() {
    return (
      <div class="screen">
        <span class="eyebrow">GEASTACK</span>
        <span class="title">Shared store</span>
        <span class="count">{counter.count}</span>
        <div class="controls">
          <button class="button secondary" onClick={() => counter.decrement()}>−</button>
          <button class="button primary" onClick={() => counter.increment()}>+</button>
        </div>
        <button class="reset" onClick={() => counter.reset()}>Reset</button>
      </div>
    )
  }
}
```

Add a style for the new button at the end of `src/styles.css`, and change the
accent colour if you want to see at a glance that the new build is running:

```css
.reset { display: flex; align-items: center; justify-content: center; width: 120px; height: 40px; border-radius: 10px; color: #cbd5e1; background-color: #111827; border-color: #334155; }
```

## 3. Check, build and flash

```sh
npm run check
gea build
gea flash --monitor
```

Keep the USB cable connected until the flash finishes. Lesson 03 installs the
next build without it.
