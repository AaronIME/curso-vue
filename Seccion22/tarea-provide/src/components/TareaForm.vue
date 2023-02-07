<script>
import { inject } from 'vue';
import { ref } from 'vue';

export default{
    setup(){
        const texto = ref('')
        const tareas = inject('tareas')

        const agregarTarea = () => {
            if(texto.value === ''){
                return console.log('texto vacio');
            }
            
            const tarea = {
                tarea: texto.value,
                estado: false,
                id: Date.now()
            }

            tareas.value.push(tarea);
            
        }
        return{
            agregarTarea,
            tareas,
            texto
        }
    }
}
</script>
<template>
    <form @submit.prevent="agregarTarea()">
        <input type="text" placeholder="Introduce tarea" class="form-control my-3" v-model.trim="texto">
        <button class="btn btn-primary w-100">Agregar</button>
    </form>
</template>