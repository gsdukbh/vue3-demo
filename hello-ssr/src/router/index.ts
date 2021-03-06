import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
  RouteRecordRaw,
} from 'vue-router';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    props: true,
  },
  {
    path: '/about',
    name: 'About',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // ssr no
    // which is lazy-loaded when the route is visited.
    // component: About,
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];
const isServer = typeof window === 'undefined';
const history = isServer
  ? createMemoryHistory()
  : createWebHistory(process.env.BASE_URL);
const router = createRouter({
  history: history,
  routes,
});

export default router;
