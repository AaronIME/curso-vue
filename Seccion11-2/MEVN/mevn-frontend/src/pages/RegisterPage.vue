<script setup>
import { useUserStore } from 'src/stores/user-store';
import { ref } from 'vue';
import {useQuasar} from 'quasar';
import { useRouter } from 'vue-router';


const email = ref('correo3@gmail.com');
const password = ref('123456');
const repassword = ref('123456');
const userStore = useUserStore();
const router = useRouter()

const $q = useQuasar();
console.log(userStore.token);

const handleSubmit = async () => {
    try {
        console.log("paso las validaciones");
        console.log("Submit de formulario " + email.value + " " + password.value);
        await userStore.register(email.value, password.value, repassword.value);
        router.push('/');
        email.value = "";
        password.value = "";
    } catch (error) {
        if (error.error) {
            alertDialogBackend(error.error);
        } else if(error.errors[0].msg){
            alertDialogBackend(error.errors[0].msg);
        } else {
            alertDialogBackend(error.errors[0].msg);
        }
        
    }
}

const alertDialogBackend = (message) => {
      $q.dialog({
        title: 'Alert',
        message: message
      })
    }

</script>

<template>
    <q-page class="row justify-center">
        <div class="col-12 col-sm-6 col-md-5">
            <h3>Register</h3>
            <q-form @submit.prevent="handleSubmit()">
                <q-input v-model="email" type="text" label="Ingrese su email" :rules="[
                    val => (val && RegExp('^[^@]+@[^@]+\.[a-zA-Z]{2,}$').test(val)) || 'Formato email incorrecto'
                ]"></q-input>
                <q-input v-model="password" type="password" label="Ingrese su contrasena" :rules="[
                    val => val && val.length > 5 || 'Contraseña minimo de 6 caracteres',
                ]"></q-input>
                <q-input v-model="repassword" type="repassword" label="Repita su contrasena" :rules="[
                    val => val && val == password || 'No coinciden las contraseñas',
                ]"></q-input>
                <q-btn label="Registro" type="submit"></q-btn>
            </q-form>
        </div>
    </q-page>
</template>