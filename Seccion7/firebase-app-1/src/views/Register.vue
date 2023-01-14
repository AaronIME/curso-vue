
        <!-- <form @submit.prevent="handleSubmit">
            <input type="email" placeholder="Ingrese email" v-model.trim="email">
            <input type="password" placeholder="Ingrese contraseña" v-model.trim="password">
            <button type="submit" :disabled="userStore.loadingUser">Crear usuario</button>
        </form> -->
<template>
    <a-row>
        <a-col span="12" offset="6">
            <h1>Register</h1>
            <!-- @submit.prevent="handleSubmit" -->
            <a-form name="basicLogin" autocomplete="off" layout="vertical" :model="formState" @finish="onFinish"
                @finishFailed="onFinishFailed">
                <a-form-item name="email" label="Ingesa tu correo"
                    :rules="[{ required: true, whitespace: true, type:'email', message: 'Ingresa un email' }]">
                    <a-input v-model:value="formState.email"></a-input>
                </a-form-item>
                <a-form-item name="password" label="Ingesa contraseña"
                    :rules="[{ whitespace: true, required: true, min: 6, message: 'Ingresa una contraseña con minimo 6 caracteres' }]">
                    <a-input-password v-model:value="formState.password"></a-input-password>
                </a-form-item>
                <a-form-item name="repassword" label="Repita contraseña" :rules="[{ validator: validatePass }]">
                    <a-input-password v-model:value="formState.repassword"></a-input-password>
                </a-form-item>
                <a-form-item>
                    <a-button type="submit" html-type="submit" :disabled="userStore.loadingUser">Registrarme</a-button>
                </a-form-item>
                <!-- <input type="email" placeholder="Ingrese email" v-model.trim="email"> -->
                <!-- <input type="password" placeholder="Ingrese contraseña" v-model.trim="password"> -->
                <!-- <button type="primary" :disabled="userStore.loadingUser">Acceso</button> -->
            </a-form>
        </a-col>
    </a-row>
</template>


<script setup>
import { ref, reactive } from 'vue';
import { useUserStore } from '../stores/user'
import { message } from 'ant-design-vue';

const formState = reactive({
    email: '',
    password: '',
    repassword: '',
    //   remember: true,
});

const userStore = useUserStore()

// const email = ref('')
// const password = ref('')

// const handleSubmit = async() => {
//     if(!email.value || password.value.length < 6){
//         return alert('llena los campos')
//     }
//     await userStore.registerUser(email.value, password.value)
//     alert('verifica tu cuenta de correo')
// }



const onFinish = async (values) => {
    console.log('Success:', values);
    const error = await userStore.registerUser(formState.email, formState.password)
    if(!error){
        message.success('Cuenta creada con exito!')
        return
    }

    switch(error){
        case 'auth/email-already-in-use':
            message.warning('Cuenta ya registrada')
        break;
        default:
            message.warning('error inesperado');

    }
};

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

let validatePass = async (_rule, value) => {
    if (value === '') {
        return Promise.reject('Repita contraseña');
    }
    if (value !== formState.password) {
        return Promise.reject('No coinciden las contraseñas');
    }
    return Promise.resolve();

};

</script>