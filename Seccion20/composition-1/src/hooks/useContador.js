import {ref} from 'vue';
export function useContador() {
    const contador = ref(0);

    const aumentarContador = () => {
        contador.value++;
    }

    const disminuirContador = () => {
        contador.value--;
    }

    return{
        contador, aumentarContador, disminuirContador
    }
}