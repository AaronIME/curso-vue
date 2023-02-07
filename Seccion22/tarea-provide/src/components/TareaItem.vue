<script>
import { inject } from 'vue';
export default {
    props: ['tarea'],
    setup() {
        const tareas = inject('tareas')
        const eliminar = (id) => {
            tareas.value = tareas.value.filter(tarea => tarea.id != id );
        }
        const modificar = (id) => {
            tareas.value = tareas.value.map(tarea => {
                if(tarea.id == id){
                    tarea.estado = !tarea.estado
                }
                return tarea
            }
            )
        }
        return{
            eliminar,
            modificar
        }
    }
}

</script>
<template>
    <div class="alert alert-warning mt-3 d-flex justify-content-between align-items-center" role="alert">
        <p :class="tarea.estado ? 'tachado' : ''">{{ tarea.tarea }}</p>
        <div>
            <i class="fa-solid fa-undo-alt mx-2 text-success" role="button" @click="modificar(tarea.id)" v-if="tarea.estado"></i>
            <i class="fa-solid fa-circle-check mx-2 text-success" role="button" @click="modificar(tarea.id)" v-if="!tarea.estado"></i>
            <i class="fa-solid fa-circle-minus text-danger" role="button" @click="eliminar(tarea.id)"></i>
        </div>
    </div>
</template>
<style scoped>
.tachado {
    text-decoration: line-through;
}
</style>