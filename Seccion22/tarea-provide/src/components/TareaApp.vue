<script>
import { provide, ref, watchEffect } from 'vue';
import TareaForm from './TareaForm.vue';
import TareaItem from './TareaItem.vue';
export default{
    setup(){
        const tareas =  ref([]);
        provide('tareas', tareas)

        if(localStorage.getItem('tareas')){
            tareas.value = JSON.parse(localStorage.getItem('tareas'))
        }

        watchEffect(()=>{
            localStorage.setItem('tareas', JSON.stringify(tareas.value));
        })
        return{
            tareas
        }
    },
    components:{
        TareaForm,
        TareaItem
    }
}
</script>
<template>
    <h1>App Tareas</h1>
    <TareaForm></TareaForm>
    <TareaItem v-for="tarea in tareas" :key="tarea.id" :tarea="tarea"></TareaItem>
    <div class="alert alert-dark mt-3" role="alert" v-if="tareas.length == 0">
        Sin tareas pendientes ✌
    </div>
    {{ tareas }}
</template>