// External libraries
import { createRouter, createWebHistory } from 'vue-router'
// Views
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/heroes',
      name: 'heroes',
      component: () => import('@/views/SuperheroListView.vue')
    },
    {
      path: '/pentathlon',
      name: 'pentathlon',
      component: () => import('@/views/PentathlonView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('@/views/NotFoundView.vue')
    }
  ]
})

export default router
