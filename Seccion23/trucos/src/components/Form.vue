<script setup>
import { reactive, ref, toRefs } from 'vue';


const user = reactive({
    nombre: '',
    numero: 0,
    cursos: [],
    nacionalidad: ''
})

const {nombre, numero, cursos, nacionalidad} = toRefs(user)

const arrayDatos = ref([])

const enviarDatos = () => {
    if (!nombre.value.trim()) {
        console.log("Nombre vacio");
        return;
    }
    console.log(user);
    //Se crea una copia debido a que reactive sigue siendo reactivo a cualquier nivel de profundiad.
    const copy = {...user}
    arrayDatos.value.push(copy);

    user.nombre = '',
    user.numero = 0,
    user.cursos =  [],
    user.nacionalidad = ''
}
</script>

<template>
    <form @submit.prevent="enviarDatos()">
        <input type="text" v-model.trim="nombre" placeholder="nombre">
        <input type="number" v-model="numero">
        <div>
            <input type="checkbox" name="check-1" v-model="cursos" value="html">
            <label for="check-1">HTML</label>
            <input type="checkbox" name="check-2" v-model="cursos" value="css">
            <label for="check-2">CSS</label>
            <input type="checkbox" name="check-3" v-model="cursos" value="js">
            <label for="check-3">JS</label>
        </div>
        <div>
            <input type="radio" name="radio-1" v-model="nacionalidad" value="mexicana">
            <label for="radio-1">Mexicana</label>
            <input type="radio" name="radio-2" v-model="nacionalidad" value="estadounidense">
            <label for="radio-2">Estadounidense</label>
            <input type="radio" name="radio-3" v-model="nacionalidad" value="canadiense">
            <label for="radio-3">Canadiense</label>

        </div>
        <button type="submit">Enviar</button>
    </form>
    <p>{{ user }}</p>
    <p>{{ arrayDatos }}</p>
</template>
