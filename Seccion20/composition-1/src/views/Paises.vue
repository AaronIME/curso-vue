<script>
import {useFetch} from '../hooks/useFetch'


export default {
    setup(){
        
        // const fetchData = async() =>{
        //     try {
        //         const res = await fetch('https://restcountries.com/v2/all')
        //         arrayPaises.value = await res.json()
        //         console.log(arrayPaises.value);
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }
        // fetchData()
        return  {
            ...useFetch('https://restcountries.com/v2/all')
        }
    }
}
</script>
<template>
    <h2>Lista de paises</h2>
    <p v-for="(pais, index) in arrayPaises" :key="index">
        <router-link :to="`/paises/${pais.name}`">{{ pais.name }}</router-link>
    </p>
</template>