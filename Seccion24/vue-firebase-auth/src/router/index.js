import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {firebase} from '../firebase'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: () => import('../views/Perfil.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/crud',
    name: 'Crud',
    component: () => import('../views/Crud.vue'),
    meta: {
      requireAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async(to, from, next)=>{
  const requiresAuth = to.matched.some(record => record.meta.requireAuth)
  if(requiresAuth && !(await firebase.getCurrentUser())){
    next('/')
  }
  next()
})

export default router
