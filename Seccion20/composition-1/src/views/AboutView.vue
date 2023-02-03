<script >
import { ref, computed } from 'vue';
import Titulo from '@/components/Titulo.vue';
import Btn from '@/components/Btn.vue';


export default {
  components:{
    Titulo,
    Btn
  },
  setup() {

    const contador = ref(0);
    
    const texto = ref('');

    const aumentarContador = () => {
      contador.value++;
    }

    const disminuirContador = () => {
      contador.value--;
    }

    const cambiarColor = computed(() => {
      if (contador.value < 0) {
        return 'color:red'
      }else{
        return 'color:blue'
      }
    })


    return {
      contador, aumentarContador, disminuirContador, cambiarColor, texto
    }
  }
}
</script>

<template>
  <Titulo :contador="contador" :color="cambiarColor"></Titulo>
  <!-- <div class="about">
    <h2 :style="cambiarColor">Contador:{{ contador }}</h2>
  </div>
  <button @click="aumentarContador()">Aumentar</button>
  <button @click="disminuirContador()">Disminuir</button> -->
  <Btn :textoBoton="'Aumentar'" @accion="aumentarContador()"></Btn>
  <Btn :textoBoton="'Disminuir'" @accion="disminuirContador()"></Btn>
  <hr>
  <input type="text" v-model="texto">
  <p>{{ texto }}</p>
</template>


