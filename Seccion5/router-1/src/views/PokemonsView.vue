<script setup>
    // import axios from 'axios'
    import {ref} from 'vue'
    //Importamos el router link
    import {RouterLink} from 'vue-router'
    //useGetData: nombre del metodo que estamos exportando
    import { useGetData } from '@/composables/getData'//@ hace referecia a la carpeta principal 'src'


    const pokemons = ref([])

    const {data, getData, loading, error} = useGetData()
    getData('https://pokeapi.co/api/v2/pokemon')

    // Utilizando axios en lugar de fetch para obtener data de una api
    // const getData = async() => {
    //     try {
    //         // const {data} = await axios.get('https://pokeapi.co/api/v2/pokemon');
    //         const {data} = await axios.get('https://pokeapi.co/api/v2/pokemon');
    //         pokemons.value = data.results;
    //         console.log(pokemons.value);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // getData()
    

</script>

<template>
    <h1>Pokemons</h1>
    <div v-if="error" class="alert alert-danger" role="alert">
        {{ error }}
    </div>
    <p v-if="loading">Loading...</p>
    
    <div class="container mb-2" v-if="data">
        <ul class="list-group">
            <li class="list-group-item" v-for="pokemon in data.results" :key="pokemon.name">
                <router-link :to="`/pokemons/${pokemon.name}`" >{{ pokemon.name }}</router-link>
            </li>
        </ul>
        <button :disabled="!data.previous" class="btn btn-outline-primary me-3" type="button" @click="getData(data.previous)">Previous</button>
        <button :disabled="!data.next" class="btn btn-info" type="button" @click="getData(data.next)">Next</button>
    </div>
    
</template>

<style>

</style>