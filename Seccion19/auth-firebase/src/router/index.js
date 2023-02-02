import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store'



const routes = [
  {
    path: '/',
    name: 'home',
    meta:{
      requireAuth: true
    },
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/editar/:id',
    name: 'editar',
    meta:{
      requireAuth: true
    },
    component: () => import('../views/EditarView.vue')
  },
  {
    path: '/registro',
    name: 'registro',
    component: () => import('../views/RegistroView.vue')
  },
  {
    path: '/ingreso',
    name: 'ingreso',
    component: () => import('../views/IngresoView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

router.beforeEach((to, from, next) => {
  if(to.meta.requireAuth){
    if(store.getters.usuarioAutenticado){
      next()
    }
    next('/ingreso')
  }
  next()
})