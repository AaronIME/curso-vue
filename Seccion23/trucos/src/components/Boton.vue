<script setup>
    import { defineProps } from 'vue';
    const props = defineProps({
        textoBoton: String
    })
</script>
<template>
    <p>componente</p>
    <button>{{ textoBoton }}</button>
</template>