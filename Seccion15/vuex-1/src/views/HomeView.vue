<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1 :style=colorTexto>Mi contador: {{ contador }}</h1>
    <button @click="accionIncrementar(20)">Incrementar</button>
    <BtnDisminuir></BtnDisminuir>
    <hr>
    <BotonAccion :estado="true"></BotonAccion>
    <BotonAccion :estado="false"></BotonAccion>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapMutations, mapActions } from 'vuex';
import BtnDisminuir from '@/components/BtnDisminuir.vue';
import BotonAccion from '@/components/BotonAccion.vue';

export default {
  name: 'HomeView',
  components: {
    BtnDisminuir,
    BotonAccion
  },
  computed:{
    ...mapState(['contador']),

    colorTexto(){
      if(this.contador < 100){
        return 'color:red'
      }else{
        return 'color:green'
      }
    }

  },
  methods:{
    ...mapMutations(['incrementar']),
    ...mapActions(['accionIncrementar'])
  }
}
</script>
