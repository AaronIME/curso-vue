<script setup>
// import axios from 'axios';
import { ref } from 'vue';
//Libreria para recibir parametros dinamicos a javascript
import { useRoute, useRouter } from 'vue-router';
import { useGetData } from '@/composables/getData';
import { useFavoritosStore } from '@/store/favoritos';
import { storeToRefs } from 'pinia';

const route = useRoute()

//Use router nos permite empujar al usuario a otra pagina a traves de codigo
const router = useRouter()

const back = () => {
    router.push("/pokemons")
}

const poke = ref({})

// const getPokemon = async () => {
//     try {
//         const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${route.params.name}`)
//         poke.value = data
//         console.log(data);
//     } catch (error) {
//         console.log(error);
//         poke.value = null
//     }
// }


// getPokemon()

const { data, getData, loading, error} = useGetData()

getData(`https://pokeapi.co/api/v2/pokemon/${route.params.name}`)

const {addFavorito, findPoke} = useFavoritosStore()

</script>
<template>
    <div v-if="error" class="alert alert-danger" role="alert">
        No existe el pokemon
    </div>
    <div v-if="data">
        <!-- Recibiendo propiedad enviada por url -->
        <h1>Poke name: {{ $route.params.name }}</h1>
        <!-- Opcional chaining si no existe la propiedad no se pinta nada -->
        <img :src="data.sprites?.front_default">
        <button :disabled="findPoke(data.name)" @click="addFavorito(data)" class="btn btn-primary mb-2" type="button">Agregar a favoritos</button>
        
    </div>
    <!-- <h1 v-else>No existe el pokemon :(</h1> -->
    <button @click="back" class="btn btn-outline-primary" type="button">Regresar</button>
</template>