import { createApp,h } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/style/reset.css'
import lvElement from '@/components/package'
import './assets/style/index.scss'



const app = createApp(App)


app.use(router)
    .use(store)
    .use(router)
    .use(ElementPlus)
    .use(lvElement)
    .mount('#app')
