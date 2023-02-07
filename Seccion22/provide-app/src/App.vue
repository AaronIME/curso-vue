<template>
  <h1>App contador: {{ contador }}</h1>
  <ContadorUno></ContadorUno>
  <ContadorAccion></ContadorAccion>
</template>

<script>
import { ref } from 'vue';
import { provide } from 'vue';
import ContadorUno from './components/ContadorUno.vue';
import ContadorAccion from './components/ContadorAccion.vue';

export default {
  name: 'App',
  components: {
    ContadorUno,
    ContadorAccion
  },
  setup(){
    const contador = ref(0);
    //Hace que la variable sea accedida desde cualquier componente secundario
    provide('contador', contador)
    return{
      contador
    }
  }
}
</script>

