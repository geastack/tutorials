import { ReactiveComponent } from '@geastack/core'
import { counter } from './counter-store'
import './styles.css'

export class App extends ReactiveComponent {
  template() {
    return (
      <div class="screen">
        <span class="eyebrow">GEASTACK</span>
        <span class="title">Installed over BLE</span>
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
