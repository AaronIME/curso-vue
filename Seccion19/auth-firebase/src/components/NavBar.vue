<script>
import { mapGetters, mapActions } from 'vuex';
export default{
    computed:{
        ...mapGetters(['usuarioAutenticado'])
    },
    methods:{
        ...mapActions(['cerrarSesion'])
    }
}
</script>
<template>
    <div class="navbar navbar-dark bg-dark">
        <router-link to="/" class="navbar-brand">Formulario</router-link>
        <div class="d-flex">
            <router-link class="btn btn-dark" to="/" v-if="usuarioAutenticado">
                Tareas
            </router-link>
            <router-link class="btn btn-dark" to="/ingreso" v-if="!usuarioAutenticado">
                Ingresar
            </router-link>
            <router-link class="btn btn-dark" to="/registro" v-if="!usuarioAutenticado">
                Registrarme
            </router-link>
            <button class="btn btn-danger ml-3" v-if="usuarioAutenticado" @click="cerrarSesion()">Cerrar sesión</button>
        </div>
    </div>
</template>