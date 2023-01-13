import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const pinia = createPinia()
const app = createApp(App)

//Se esta usando el plugin de router
app.use(router)

app.use(pinia)
app.mount('#app')
