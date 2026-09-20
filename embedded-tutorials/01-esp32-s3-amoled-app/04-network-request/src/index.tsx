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
