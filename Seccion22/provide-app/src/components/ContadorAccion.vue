<script>
import { inject } from 'vue';
export default{
    setup(){
        const contador = inject('contador')
        const aumentar = () => {
            contador.value++
        }
        const disminuir = () => {
            contador.value--
        }
        return{
            contador,
            aumentar,
            disminuir
        }
    }
}
</script>
<template>
    <button @click="aumentar()">Aumentar</button>
    <button @click="disminuir()">Disminuir</button>
</template>