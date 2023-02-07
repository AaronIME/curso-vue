<script>
import { inject } from 'vue';
export default{
    setup(){
        const contador = inject('contador')//Se recibe la clave de la variable que se quiere inyectar
        return{
            contador
        }
    }
}
</script>
<template>
    <h3>Contador: {{ contador }}</h3>
</template>