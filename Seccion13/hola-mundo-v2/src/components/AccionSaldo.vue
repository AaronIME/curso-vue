<script>
    export default{
        props:{
            texto: String,
            desactivar:{
                type: Boolean,
                default: false
            }
        },
        methods:{
            accionSaldo(){
                this.$emit('accion')
            }
        }
    }
</script>
<template>
    <button :disabled="desactivar" @click="accionSaldo()">{{ texto }}</button>
</template>
<style>

</style>