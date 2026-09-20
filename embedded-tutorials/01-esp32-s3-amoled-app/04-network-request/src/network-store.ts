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
