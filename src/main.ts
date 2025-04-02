// Vue core
import { createApp } from 'vue'
// External libraries
import { createPinia } from 'pinia'
// Components
import App from './App.vue'
// Styles
import './assets/main.css'
// Internal modules
import { i18n } from './i18n'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
