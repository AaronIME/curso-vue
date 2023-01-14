<template>
    <a-row>
        <a-col span="12" offset="6">
            <h1>Login</h1>
            <!-- @submit.prevent="handleSubmit" -->
            <a-form name="basicLogin" autocomplete="off" layout="vertical" :model="formState" @finish="onFinish"
                @finishFailed="onFinishFailed">
                <a-form-item name="email" label="Ingesa tu correo"
                    :rules="[{ required: true, whitespace:true, type:'email', message: 'Ingresa un email' }]">
                    <a-input v-model:value="formState.email"></a-input>
                </a-form-item>
                <a-form-item  name="password" label="Ingesa contraseña"
                    :rules="[{ whitespace:true, required: true, min:6, message: 'Ingresa una contraseña con minimo 6 caracteres' }]">
                    <a-input-password v-model:value="formState.password"></a-input-password>
                </a-form-item>
                <a-form-item>
                    <a-button type="submit" html-type="submit" :disabled="userStore.loadingUser">Ingresar</a-button>
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


const userStore = useUserStore()

// const email = ref('')
// const password = ref('')

const formState = reactive({
    email: '',
    password: ''
    //   remember: true,
});

// const handleSubmit = async () => {
//     if (!formState.email || formState.password.length < 6) {
//         return alert('llena los campos')
//     }
//     await userStore.loginUser(formState.email, formState.password)
// }



const onFinish = async (values) => {
    console.log('Success:', values);

    const error = await userStore.loginUser(formState.email, formState.password)
    if(!error){
        message.success('Inicio de sesion existoso')
        return
    }

    switch(error){
        case 'auth/user-not-found':
            message.warning('No existe esa cuenta')
        break;
        case 'auth/wrong-password':
            message.warning('Contraseña invalida');
        break;
        default:
            message.warning('error inesperado');

    }
};

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

</script>