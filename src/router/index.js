import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/registro',
    name: 'registro',
    component: () => import('@/views/pages/Register/Home.vue')
  },
  {
    path: '/inicio',
    name: 'inicio',

    component: () => import('@/views/Home.vue')
  },
  {
    path: '/resultado',
    name: 'resultado',

    component: () => import('@/views/End.vue')
  },
  {
    path: '/revision',
    name: 'revision',
    component: () => import('@/views/pages/Review/Home.vue')
  },
  {
    path: '/*',
    redirect: 'inicio',
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
