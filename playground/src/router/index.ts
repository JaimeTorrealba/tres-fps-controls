import { createRouter, createWebHistory } from 'vue-router'
import { basicsRoutes, intermediateRoutes } from './routes'

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/index.vue'),
  },
  ...basicsRoutes,
  ...intermediateRoutes,
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
