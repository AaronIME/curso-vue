<script>
import { useDB } from '@/composables/useDB';
import { inject } from 'vue';
import { ref } from 'vue';
export default {
    setup() {
        const todos = inject('todos')
        const { agregarTodo } = useDB()
        const texto = ref('')
        const error = inject('error')

        const procesarFomulario = async () => {
            if (!texto.value.trim()) {
                console.log("Texto vacio");
                return;
            }
            const todo = await agregarTodo(texto.value)
            
            if(todo.res){
                error.value = todo.error
                texto.value = ""
                return
            }
            
            todos.value = [...todos.value, todo]
            texto.value = ""
        }
        return {
            texto,
            procesarFomulario
        }
    }
}
</script>
<template>
    <form @submit.prevent="procesarFomulario()">
        <input type="text" placeholder="Enter para agregar ToDo" class="form-control my-3" v-model="texto">


    </form>
</template>