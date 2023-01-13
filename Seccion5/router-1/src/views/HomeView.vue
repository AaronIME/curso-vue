<script setup>
//Utilizando pinia para utilizar variables globales
import { useCounterStore } from '@/store/counter.js'
//Libreria para desestructurar reactivos
import { storeToRefs } from 'pinia'

const useCounter = useCounterStore();

// Desestructuracion de metodos store
//Las propiedades reactivas no se pueden desestructurar
const { increment } = useCounter
//Hay un metodo especial para desestrucutrar reactivos
const { count, double } = storeToRefs(useCounter)
</script>

<template>
  <h1>Home</h1>
  <p>Contador: {{ count }}</p>
  <p>Doble: {{ double }}</p>
  <button @click="increment" class="btn btn-primary" type="button">Increment</button>


</template>
