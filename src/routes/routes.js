import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/store/routes.store'

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router