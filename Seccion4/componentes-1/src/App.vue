<!--Codigo que se ahorra al utilizar el azucar sintactico-->
<!-- <script>
import {ref} from "vue"

export default{
  setup(){
    const counter = ref(0)
    
    const increment = () => counter.value++;

    return {
      counter,
      increment,
    }
  },
};
</script> -->

<!-- Utilizando composition api(azucar sintactico) -->
<!-- <script select> -->
<!-- //Para la Api de opciones se tiene que usar la exportacion por defecto
//Se devuelven los objetos o metodos correspondientes que vamos a utilizar en el template

//UTILIZANDO API DE OPCIONES
// export default{
//   //retorna todos los datos reactivos que ocupemos utilizar
//   data(){
//     return{//Aqui retornamos un objeto con cada uno de nuestros datos
//       counter:0
//     }
//   },
//   //Retorna todos los metodos que necesitemos utilizar
//   methods: {
//     increment(){
//       this.counter++
//     }

//   }
// }
// </script> -->

<script setup>
//En una exportacion por defecto no se necesitan las llaves
import ButtonCounter from './components/ButtonCounter.vue'
import BlogPost from './components/BlogPost.vue'
import PaginatePosts from './components/PaginatePosts.vue'
import LoadingSpinner from './components/LoadingSpinner.vue'

import { ref, computed } from 'vue'

// const posts = ref(
//   [{ id: 1, title: "Post 1", body: "Descripcion 1", colorText: "primary" },
//   { id: 2, title: "Post 2", body: "Descripcion 2", colorText: "secondary" },
//   { id: 3, title: "Post 3", body: "Descripcion 3", colorText: "danger" },
//   { id: 4, title: "Post 4", colorText: "light" }]
// )

const posts = ref([])

const favorito = ref('')

//Funcion que se utilizara como evento personalizado
const cambiarFavorito = (title) => {
  favorito.value = title
}

const loading = ref(true)

const funcion = async () => {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await res.json()
    posts.value = data
    loading.value = false
  } catch (error) {
    console.log(error);
  }
}

funcion()
const postXpage = 10
const inicio = ref(0)
const fin = ref(postXpage)


const next = () => {
  inicio.value += postXpage
  fin.value += postXpage
}

const prev = () => {
  inicio.value -= postXpage
  fin.value -= postXpage
}

const maxLength = computed(() => posts.value.length)

//Setup viene con un evento preestablecido llamado created
//Created: crea toda la logica que esta en el script y luego la monta en el sitio web
//Una vez que se monta se llama al evento OnMounted
// onMounted(async() => {
//   try {
//     //Await se utiliza unicamente para promesas
//     //Await devuelve lo que contiene la promesa
//     const res = await fetch('https://jsonplaceholder.typicode.com/posts')
//     posts.value = await res.json()
    
//   } catch (error) {
//     console.log(error);
//   } finally{
//     loading.value = false
//   }
// }),

</script>

<template>
  <LoadingSpinner v-if="loading"/>
  <div class="container" v-else>
    <h1>App</h1>
    <h2>Mis post favorito: {{ favorito }}</h2>
    <!-- <button @click="increment">{{ counter }}</button> -->
    <ButtonCounter />
    <!-- kebab-case -->
    <button-counter></button-counter>
    <!-- props: son accesorios que hacen dinamicos a los componentes -->
    <!--
  <BlogPost title="Post 1" :id="1" body="Descripcion 1" colorText="primary"/>
  <BlogPost title="Post 2" :id="2" body="Descripcion 2" colorText="secondary"/>
  <BlogPost title="Post 3" :id="3" body="Descripcion 3" colorText="danger"/>
  <BlogPost title="Post 4" :id="4" colorText="danger"/>
  -->

    <button @click="prev">Prev Provisorio</button>
    <button @click="next">Next Provisorio</button>

    <PaginatePosts class="mb-2" @next="next" @prev="prev" :inicio="inicio" :fin="fin" :maxLength="maxLength" />

    <!-- Utilizando V-FOR -->
    <!-- Utilizando evento personalizado #evento="#funcion"-->
    <BlogPost v-for="post in posts.slice(inicio, fin)" :title="post.title" :id="post.id" :body="post.body"
      :colorText="post.colorText" @cambiarFavorito="cambiarFavorito" />
    <!-- Le estamos pasando todo el metodo cambiarFuncion -->
    <!-- :cambiarFavorito="cambiarFavorito" -->
    <!-- Tambien podemos pasar una fucnion como prop -->

  </div>
</template>

<style>

</style>