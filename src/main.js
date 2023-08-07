import { createApp,h } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/style/reset.css'
import lvElement from '@/components/package'
import './assets/style/index.scss'

// 测试移动端环境
function isMobile() {
    let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    // match的返回值：如果匹配不到，返回null; 否则返回匹配到的 array
    return flag;
}

window.isMobile = isMobile()

const app = createApp(App)


app.use(router)
    .use(store)
    .use(router)
    .use(ElementPlus)
    .use(lvElement)
    .mount('#app')
