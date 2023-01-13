<!-- Los componentes nos permiten dividir la interfaz de usuario en piezas independientes y retutilizables -->
<script setup>
    import {ref} from 'vue'
    const counter = ref(0)
    const increment = () => counter.value++
</script>

<template>
    <button @click="increment">Counter: {{ counter }}</button>
    
</template>