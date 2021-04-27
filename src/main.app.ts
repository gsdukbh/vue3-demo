/* eslint-disable */
import {createApp, createSSRApp} from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

const isSSR = typeof window === 'undefined'
export function buildApp() {
    const app = ( !isSSR ? createSSRApp(App) : createApp(App));
    app.use(router);
    app.use(store);
    return {app, router, store};
}
