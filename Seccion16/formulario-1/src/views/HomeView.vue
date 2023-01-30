<template>
  <form @submit.prevent="procesarFormulario()">

    <input type="text" class="form-control my-2" placeholder="Ingrese nombre" v-model.trim="tarea.nombre">

    <div class="form-check form-check-inline">
      <input class="form-check-input" type="checkbox" id="check-1" v-model="tarea.categorias" value="javascript">
      <label class="form-check-label" for="check-1">Javascript</label>
    </div>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="checkbox" id="check-2" v-model="tarea.categorias" value="nodejs">
      <label class="form-check-label" for="check-2">Node.js</label>
    </div>

    <div class="mt-2">
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" id="radio-1" v-model="tarea.estado" value="urgente">
        <label class="form-check-label" for="radio-1">Urgente</label>
      </div>

      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" id="radio-1" v-model="tarea.estado" value="relax">
        <label class="form-check-label" for="radio-1">Relax</label>
      </div>
    </div>

    <div class="mt-2">
      <input class="form-control" type="number" v-model.number="tarea.number">
    </div>

    <button class="btn btn-dark mt-5 btn-block" :disabled="bloquear" type="submit">Procesar</button>
  </form>
  <p>{{ tarea }}</p>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'HomeView',
  components: {

  },
  data() {
    return {
      tarea: {
        nombre: "",
        categorias: [],
        estado: "",
        number: 0
      }
    }
  },
  methods: {
    procesarFormulario() {
      console.log(this.tarea);
      if (this.tarea.nombre.trim() == "") {
        console.log("Campo vacio");
        return
      }
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
  computed: {
    bloquear() {
      return this.tarea.nombre.trim() != '' ? false : true;
    }
  }
}
</script>
