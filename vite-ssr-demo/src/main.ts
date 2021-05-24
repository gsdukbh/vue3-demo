import App from './App.vue'
import {createSSRApp} from 'vue'
import router from './router'
import store from './store'

// SSR每个请求都需要一个新的应用程序实例，因此我们导出了一个函数
// 创建一个新的应用程序实例。如果使用Vuex，我们还将创建一个
// 新鲜的商店在这里。
export function createApp() {
    const app = createSSRApp(App)
    app.use(router)
    app.use(store)
    return {app, router,store}
}
