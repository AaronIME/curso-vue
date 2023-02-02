<script>
import { mapActions, mapState } from 'vuex';
export default {
    computed:{
        ...mapState(['tareas'])
    },
    methods:{
        ...mapActions(['deleteTarea'])
    },
    

}
</script>

<template>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Categorias</th>
                <th scope="col">Estado</th>
                <th scope="col">Número</th>
                <th scope="col">Accion</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="tarea in tareas" :key="tarea.id">
                <th>{{ tarea.id }}</th>
                <td>{{ tarea.nombre }}</td>
                <td>
                    <!-- {{ tarea.categorias }} -->
                    <ul>
                        <li v-for="categoria in tarea.categorias">
                            {{ categoria }}
                        </li>
                    </ul>
                </td>
                <td>{{ tarea.estado }}</td>
                <td>{{ tarea.number }}</td>
                <!-- :to="`editar/${tarea.id}`" -->
                <td>
                    <button class="btn btn-danger ml-2 btn-sm" @click="deleteTarea(tarea.id)">Delete</button>
                    <router-link class="btn btn-warning btn-sm" :to="{name:'editar', params:{id:tarea.id}}">Editar</router-link>
                </td>
            </tr>
        </tbody>
    </table>
</template>
        
