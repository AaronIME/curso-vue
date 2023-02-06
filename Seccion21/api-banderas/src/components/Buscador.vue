<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
export default{
    setup(){
        const store = useStore();
        const texto = ref('')

        const procesarInput = () => {
            store.dispatch('filtroNombre', texto.value)
        }
        
        return{
            texto,
            procesarInput
        }
    }
}
</script>
<template>
    <input type="text" placeholder="Ingrese pais" class="form-control mb-2" v-model="texto" @keyup="procesarInput">
</template>