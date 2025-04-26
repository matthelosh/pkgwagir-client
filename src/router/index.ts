import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import DashView from '@/views/DashView.vue'
import KaihView from '@/views/KaihView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LoginView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashView,
    },
    {
      path: '/kaih',
      name: 'kaih',
      component: KaihView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
