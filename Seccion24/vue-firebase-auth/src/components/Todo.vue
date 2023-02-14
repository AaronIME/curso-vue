<script>
import { useDB } from '@/composables/useDB'
import { inject } from 'vue'
import { ref } from 'vue'
export default{
    props: {
        todo:Object
    },
    setup(){
        const bloquear = ref(false)
        const {eliminarTodo, modificarTodo} = useDB()
        const error = inject('error')
        const todos = inject('todos')
        const eliminar = async(id) =>{
            bloquear.value = true;
            const respuesta = await eliminarTodo(id)
            
            if(respuesta.res){
                error.value = respuesta.error
                bloquear.value = false;
                return
            }

            todos.value = todos.value.filter((todo) => {
                return todo.id != id
            })
            bloquear.value = false;
        }
        const modificar = async(todo) => {
            const respuesta = await modificarTodo(todo)
            if(respuesta.res){
                error.value = respuesta.error
                return
            }
            todos.value = todos.value.map(item =>
               { return (item.id == todo.id ? {...item, estado: !todo.estado} : item) }
            )
        }
        return{
            eliminar,
            modificar,
            bloquear
        }
    }
}
</script>
<template>
    <div class="card shadow-sm mb-2">
        <div class="card-body">
            <p class="m-0" :class="{ 'text-decoration-line-through' : todo.estado}">
                {{todo.texto}}
            </p>
            <div class="mt-2">
                <button class="btn btn-warning me-1" @click="modificar(todo)">Finalizar</button>
                <button class="btn btn-danger" @click="eliminar(todo.id)" :disabled="bloquear">Eliminar</button>
            </div>
        </div>
    </div>
</template>