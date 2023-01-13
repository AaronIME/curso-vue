//Composable: es uba funcion que nos permite encapsular y reutilizar la logica, en react se conoce como hooks
import { ref } from "vue";
import axios from "axios";

export const useGetData = () => {
    const data = ref(null)
    const error = ref(null)
    const loading = ref(true)
    const getData = async(url) => {
        try {
            const res = await axios.get(url)
            data.value = res.data
        } catch (e) {
            error.value = "error de servidor"
        }finally{
            loading.value = false
        }
    }   

    return{
        getData,
        data,
        loading,
        error
    }
}