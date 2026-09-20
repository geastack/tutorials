import { Store } from '@geastack/core'

class CounterStore extends Store {
  count = 100

  decrement() { this.count = this.count - 1 }
  increment() { this.count = this.count + 1 }
  reset() { this.count = 100 }
}

export const counter = new CounterStore()
