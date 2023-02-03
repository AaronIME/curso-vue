<script>
import {useContador} from '../hooks/useContador';
import Btn from '@/components/Btn.vue';
export default{
    components:{
        Btn
    },
    setup(){

        return {
            ...useContador()
        }
    }
}

</script>

<template>
    <h2>Contador: {{ contador }}</h2>
    <Btn :textoBoton="'Aumentar'" @accion="aumentarContador()"></Btn>
    <Btn :textoBoton="'Disminuir'" @accion="disminuirContador()"></Btn>
</template>