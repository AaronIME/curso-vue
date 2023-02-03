<script>
import { useRoute } from 'vue-router';
import { useFetch } from '@/hooks/useFetch';
export default{
    setup(){
        const nombreParams = useRoute().params.nombre
        const {arrayPaises} = useFetch(`https://restcountries.com/v2/name/${nombreParams}`);
    
        
        
        return{
            arrayPaises,
            nombreParams
        }
    }
}
</script>
<template>
    <h1>Detalle: {{ nombreParams}}</h1>
    <!-- <pre>{{ arrayData.arrayPaises[0] }}</pre> -->
    <p v-for="pais in arrayPaises">
        {{ pais.name }} - {{ pais.region }}
    </p>
</template>