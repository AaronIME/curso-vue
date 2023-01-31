<script>
import NavBar from './components/NavBar.vue';
import { mapActions } from 'vuex';
export default {

  components:{
    NavBar
  },
  methods:{
    ...mapActions(['cargarLocalStorage'])
  },
  created(){
    this.cargarLocalStorage()
  }
}
</script>

<template>
  <NavBar></NavBar>
  <div class="container">
    <router-view/>  
  </div>
  
</template>

<style>

</style>
