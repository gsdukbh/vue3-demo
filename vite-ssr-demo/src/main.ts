import App from './App.vue'
import {createSSRApp, createApp as _createApp} from 'vue'
import router from './router'
import store from './store'

// SSR每个请求都需要一个新的应用程序实例，因此我们导出了一个函数

export function createApp() {
    const app = import.meta.env.SSR ? createSSRApp(App) : _createApp(App)
    app.use(router)
    app.use(store)
    // app.use(Antd)
    return {app, router, store}
}
