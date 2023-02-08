<template>
  <div class="home">
    <input type="text" v-model.trim="nombre">
    <p>{{ mostrarUsuario }}</p>
    <Boton :textoBoton="'Activar'"></Boton>
    <Form></Form>
    <suspense>
      <!-- Cuando se realiza la solicitud de la API -->
      <template #default>
        <Pokemones></Pokemones>
      </template>
      <!-- Mientras espera la solicitud de la api -->
      <template #fallback>
        loading...
      </template>
    </suspense>
    
  </div>
</template>

<script setup>
import Boton from '../components/Boton.vue';
import Form from '@/components/Form.vue';
import Pokemones from '@/components/Pokemones.vue';
import { ref } from 'vue';
import { computed } from 'vue';
  const nombre = ref('')
  
  const mostrarUsuario = computed(() => {
    return nombre.value != '' ? "Hola " + nombre.value : "Invitado"
  })

</script>
