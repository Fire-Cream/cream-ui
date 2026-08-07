import { createApp } from 'vue'
import App from './App.vue'
import CreamUI from 'cream-ui'
import '@cream-ui/theme-chalk/src/index.scss'

const app = createApp(App)
app.use(CreamUI)
app.mount('#app')
