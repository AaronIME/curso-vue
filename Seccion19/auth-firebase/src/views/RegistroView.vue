<script>
import { mapActions } from 'vuex';
export default{
    data(){
        return{
            email:'',
            pass1:'',
            pass2:''
        }
    },
    computed:{
        bloquear(){
            return !(this.email != '' && this.pass1 != "" && this.pass1 == this.pass2 )
        }
    },
    methods:{
        ...mapActions(['registrarUsuarios']),
        procesarFormulario(){
            this.registrarUsuarios({email:this.email, password:this.pass1});
            this.email = "";
            this.pass1 = "";
            this.pass2 = "";

        }
    }
}
</script>
<template>
    <h1>Registro de ususarios</h1>
    <form @submit.prevent="procesarFormulario()">
        <input type="email" placeholder="Email" class="form-control mb-2" v-model.trim="email">
        <input type="password" placeholder="Password" class="form-control mb-2" v-model.trim="pass1">
        <input type="password" placeholder="Password" class="form-control mb-2" v-model.trim="pass2">
        <button type="submit" class="btn btn-primary" :disabled="bloquear">Registrar</button>
    </form>
</template>
