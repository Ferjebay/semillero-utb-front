import { createRouter, createWebHistory } from 'vue-router'

import authRouter from '../views/auth/router'
import dashboardRouter from '../views/dashboard/router'
import isAuthenticated from '../views/auth/router/auth-guard'

const routes = [
  {
    path: '/',    
    ...authRouter
  },
  {
    path: '/dashboard',
    beforeEnter: [isAuthenticated],
    ...dashboardRouter
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router


