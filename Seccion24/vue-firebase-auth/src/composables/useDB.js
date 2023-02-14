import { db, marcaTiempo } from "@/firebase"
import { useAuth } from "@vueuse/firebase"
import { ref } from "vue"


export const useDB = () => {
    const referencia = db.collection('todos')
    const cargando = ref(false)
    const {user} = useAuth()

    const getTodos = async () => {
        try {
            cargando.value = true;
            const res = await referencia.get()
            return res.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })
            )
            
        } catch (error) {
            return {
                error,
                res: true
            }
        } finally{
            cargando.value = false;
        }
    }

    const agregarTodo = async(texto) => {
        try {
            const todo = {
                texto: texto,
                fecha: marcaTiempo(),
                estado: false,
                uid: user.value.uid
            }

            const res = await referencia.add(todo)

            return{
                id: res.id,
                ...todo
            }
        } catch (error) {
            return{
                error,
                res: true
            }
        }
    }

    const eliminarTodo = async(id) => {
        try {
            await referencia.doc(id).delete()
            return{
                res: false
            }
        } catch (error) {
            return{
                error,
                res:true
            }
        }
    }

    const modificarTodo = async(todo) => {
        try {
            await referencia.doc(todo.id).update({
                estado: !todo.estado
            })

            return{
                res: false
            }
        } catch (error) {
            return{
                error,
                res: true
            }
        }
    }

    return {
        getTodos,
        agregarTodo,
        cargando,
        eliminarTodo,
        modificarTodo
    }
}