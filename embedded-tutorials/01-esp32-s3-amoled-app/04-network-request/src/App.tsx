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
