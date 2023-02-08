<script>
import { ref } from 'vue'

export default {
    async setup() {
        const pokemones = ref([])

        try {
            const res = await fetch('https://pokeapi.co/api/v2/pokemon')
            pokemones.value = await res.json()

        } catch (error) {
            console.log(error);
        }



        return {
            pokemones,

        }
    }
}
</script>
<template>
    <pre>{{ pokemones.results }}</pre>
</template>