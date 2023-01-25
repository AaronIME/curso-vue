import { useQuasar } from "quasar"

export const useNotify = () => {
    const $q = useQuasar()
    const showNotify = (message = "Error de servidor", color = "negative", icon) => {
        $q.notify({
            message,
            color,
            icon: "report_problem" //Acepta un icono o null
        }) 
    }
    return{
        showNotify
    }
}