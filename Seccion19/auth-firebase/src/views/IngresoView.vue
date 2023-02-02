<script>
import { mapActions, mapState } from 'vuex';
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
            return !(this.email != '' && this.pass1 != "")
        },
        ...mapState(['error'])
    },
    methods:{
        ...mapActions(['ingresoUsuarios']),
        procesarFormulario(){
            console.log(this.email);
            console.log(this.pass1);
            this.ingresoUsuarios({email:this.email, password:this.pass1});
            this.email = "";
            this.pass1 = "";

        }
    }
}
</script>
<template>
    <div class="alert alert-danger" v-if="error.tipo != null">
        {{ error.mensaje }}
    </div>
    <h1>Ingreso de ususarios</h1>
    <form @submit.prevent="procesarFormulario()">
        <input type="email" placeholder="Email" class="form-control mb-2" v-model.trim="email">
        <input type="password" placeholder="Password" class="form-control mb-2" v-model.trim="pass1">
        <button type="submit" class="btn btn-primary" :disabled="bloquear">Ingresar</button>
    </form>
</template>
