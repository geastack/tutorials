import { Display, WiFi, mount } from '@geastack/core'
import { App } from './App'

// Reserve internal DMA memory for the ESP32 Wi-Fi driver, then connect with
// credentials supplied through the ignored local .env file.
Display.setFlushConfig({ rows: 36, depth: 2 })
const ssid = import.meta.env.GEA_WIFI_SSID
const password = import.meta.env.GEA_WIFI_PASSWORD
if (ssid.length > 0) WiFi.configure(ssid, password)

mount(App)
