import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
import LoginView from '@/views/LoginView.vue'
import DashView from '@/views/DashView.vue'
import KaihView from '@/views/KaihView.vue'
import AkademikView from '@/views/AkademikView.vue'

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
      meta: { requiresAuth: true },
    },
    {
      path: '/kaih',
      name: 'kaih',
      component: KaihView,
      meta: { requiresAuth: true },
    },
    {
      path: '/akademik',
      name: 'akademik',
      component: AkademikView,
      meta: { requiresAuth: true },
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/AboutView.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if (to.meta.requiresAuth && !userStore.token) {
    next({ name: 'home' })
  } else if (to.name === 'home' && userStore.token) {
    next({ name: 'dashboard' })
  } else {
    next()
  }
})
export default router
