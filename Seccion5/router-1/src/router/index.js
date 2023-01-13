import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

//Aqui se hace la creacion de View Router

const router = createRouter({
  //Modo history usa el historial de navegacion del propio navegador
  //En versiones previas se utilizaba el modo hash
  history: createWebHistory(import.meta.env.BASE_URL),
  //Se envia un array de rutas
  //Aqui es donde se configuran cada unas de las rutas
  // linkActiveClass: "active",//Usando clases activas auto
  routes: [
    // //Si se llama directamente de esta forma, lo que esta pasando es que carga todos los componentes en cuestion
    // //y despues pinta solo el renderizado.
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    // //Aqui se muestran dos alternativas para pintar los componentes
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //Utiliza lazy load para renderizar los componentes
      //Lazy load: divide los componentes de cada ruta en fragmentos separados, solo los carga cuando se carga la ruta
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/pokemons',
      name: 'pokemons',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //Utiliza lazy load para renderizar los componentes
      //Lazy load: divide los componentes de cada ruta en fragmentos separados, solo los carga cuando se carga la ruta
      component: () => import('../views/PokemonsView.vue')
    },
    {
      path: '/pokemons/:name',
      name: 'poke',
      component: () => import('../views/PokeView.vue')
    },
    {
      path: '/favoritos',
      name: 'favoritos',
      component: () => import('../views/FavoritosView.vue')
    },
    {//Error 404 no coincide
      path: '/:pathMatch(.*)*',//Hace coincidir cualquier ruta ya sea anidada o no
      name: 'NotFount',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})

export default router
