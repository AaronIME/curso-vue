<script setup>
//Metodo donde se especifican los props que se envian
//Los props se utilizan como variables

// defineProps(['title','id','body','colorText'])//Recibiendo props

//defineProps tambien puede devolver los props correspondientes
// const props = defineProps(['title','id','body','colorText'])
// console.log(props.title);

//Los PROPS tambien pueden ser utilizados como objetos
//A cada Prop se le indica el tipo de dato
//Se pueden tambien indicar objetos y tener valores por default
defineProps({
    title: String,
    id: Number,
    body: {
        type: String,
        default: 'Sin descripcion'
    },
    colorText: String,
    // cambiarFavorito: Function

})
//Usando defineEmits en vez de $emit
const emit = defineEmits(['cambiarFavorito'])
</script>

<template>

    <div class="card" :id="id">
        <div class="card-body">
            <!-- se accede al prop mediante la interpolacion -->
            <h5 class="card-title" :class="`text-${colorText}`">{{ id }} - {{ title }}</h5>
            <p class="card-text">{{ body }}</p>
            
            <!-- Utilizando defineEmits-->
            <button @click="emit('cambiarFavorito', title)" class="btn btn-outline-primary">Favorito</button>
            
            <!-- Utilizando una funcion prop-->
            <!-- <button @click="cambiarFavorito(title)" class="btn btn-outline-primary">Favorito</button> -->
            
            <!-- Utilizando $emit-->
            <!-- <button @click="$emit('cambiarFavorito', title)" class="btn btn-outline-primary">Favorito</button> -->

            <!-- Aqui se emite el evento haciendo referencia a la propiedad(evento personalizado) ademas se le pasa como segundo argumento el tiulo del nuevo favorito -->
        </div>
    </div>
</template>

<style>

</style>