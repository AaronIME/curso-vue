<script>
import { mapActions } from 'vuex';
export default{
    props:{
        estado: Boolean
    },
    computed:{
        textoBoton(){
            return this.estado ? "Aumentar" : "Disminuir"
        }
    },
    methods:{
        ...mapActions(['accionBoton'])
    }
}
</script>
<template>
    <button @click="accionBoton({estado:estado, numero:15})">{{ textoBoton }}</button>
</template>