<script>
import NavBar from './components/NavBar.vue';
export default {
  components:{
    NavBar
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
