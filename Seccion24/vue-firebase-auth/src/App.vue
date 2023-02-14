<template>
  <Cargando v-if="loading"></Cargando>
  <Navbar></Navbar>
  <router-view/>
</template>
<script>
import Cargando from "./components/Cargando.vue";
import Navbar from "./components/Navbar.vue"
import { firebase } from "@/firebase";
import { ref } from "vue";
import { onMounted } from "vue";
export default{
  components:{
    Navbar,
    Cargando
  },
  setup() {
    const loading = ref(false);
    onMounted(async() => {
      loading.value = true
      await firebase.getCurrentUser()
      loading.value = false
    })

    return{
      loading
    }
  }
}
</script>