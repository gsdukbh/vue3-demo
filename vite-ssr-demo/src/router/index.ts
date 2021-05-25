import {createMemoryHistory, createRouter, createWebHistory} from 'vue-router'


// Auto generates routes from vue files under ./pages
// https://cn.vitejs.dev/guide/features.html#glob-import
const pages = import.meta.glob('../pages/*.vue')

const routes = Object.keys(pages).map((path) => {

    // @ts-ignore
    const name = path.match(/\.\/pages(.*)\.vue$/)[1].toLowerCase()
    console.log("path:", path)
    console.log("name :", name)
    return {
        path: name === '/home' ? '/' : name,
        component: pages[path] // () => import('./pages/*.vue')
    }
})

console.log(import.meta.env.SSR)

const router = createRouter({
    // import.meta.env.SSR is injected by Vite.
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes,
});

export default router;
