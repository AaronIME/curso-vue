<template>
  <div class="home">
    <h2 :style="cambiarColor">Contador: {{ contador }}</h2>
    <button @click="aumentarContador()">Aumentar</button>
    <button @click="disminuirContador()">Disminuir</button>
  </div>
</template>

<script>


export default {
  name: 'HomeView',
  data(){
    return {
      contador:0
    }
  },
  computed:{
    cambiarColor(){
      return this.contador < 0 ? 'color:red': 'color:blue'
    }
  },
  methods:{
    aumentarContador(){
      this.contador += 1;
    },
    disminuirContador(){
      this.contador -= 1;
    }
  }
}
</script>
