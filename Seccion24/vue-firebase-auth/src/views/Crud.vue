<script>
import { useAuth } from '@vueuse/firebase';
import { useDB } from '../composables/useDB'
import Cargando from '@/components/Cargando.vue';
import { onMounted } from 'vue';
import { ref } from 'vue';
import Error from '@/components/Error.vue';
import { provide } from 'vue';
import { computed } from 'vue';
import TodoForm from '@/components/TodoForm.vue';
import Todo from '@/components/Todo.vue';

export default {
    components: {
        Cargando,
        Error,
        TodoForm,
        Todo
    },
    setup() {
        const { isAuthenticated } = useAuth()
        const { getTodos, cargando } = useDB()
        const todos = ref([])
        const error = ref(null)
        

        const pintarError = computed(() => error.value ? true : false) 

        onMounted(async () => {
            todos.value = await getTodos()
            if(todos.value.res){
                console.log(todos.value.error);
                error.value = todos.value.error;    
                
            }
        })


        provide('error',error)
        provide('todos',todos)
        
        

        return {
            isAuthenticated,
            todos,
            cargando,
            pintarError
        }
    }
}
</script>
<template>
    <div v-if="isAuthenticated">
        <h1>Crud</h1>
        <Cargando v-if="cargando"></Cargando>
        <div v-else>
            <Error v-if="pintarError"></Error>
            <TodoForm></TodoForm>
            <Todo v-for="(todo, index) in todos" :key="todo.id" :todo="todo"></Todo>
            <pre>
                {{ todos }}
            </pre>
        </div>

    </div>
</template>