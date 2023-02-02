<template>
  <form @submit.prevent="procesarFormulario()">
    <Input :tarea="tarea"></Input>
    
  </form>
  <p>{{ tarea }}</p>

  <TablaTareas></TablaTareas>
  
  
</template>

<script>
// @ is an alias to /src

import { mapActions } from 'vuex';
import TablaTareas from '@/components/TablaTareas.vue';
import Input from './Input.vue';
import shortid from 'shortid'

export default {
  name: 'HomeView',
  data() {
    return {
      tarea: {
        id:"",
        nombre: "",
        categorias: [],
        estado: "",
        number: 0
      },
      shortid: shortid()
    }
  },
  components:{
    Input,
    TablaTareas
  },
  methods: {
    ...mapActions(['setTareas', 'cargarLocalStorage']),
    procesarFormulario() {
      console.log(this.tarea);
      if (this.tarea.nombre.trim() == "") {
        console.log("Campo vacio");
        return
      }
      
      //Generar id
      
      this.tarea.id = shortid.generate();
      console.log(this.tarea.id);

      this.setTareas(this.tarea);

      console.log("No esta vacio");
      this.tarea =
      {
        nombre: "",
        categorias: [],
        estado: "",
        number: 0
      }
    }
  },
  created(){
    this.cargarLocalStorage()
  }
}
</script>
