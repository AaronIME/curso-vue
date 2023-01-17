<script setup>
import { message } from 'ant-design-vue';
import { ref, reactive } from 'vue';
import { useUserStore } from '../stores/user';

const userStore = useUserStore();
const fileList = ref([])

const onFinish = async (values) => {
    console.log(values.displayName);
    const error = await userStore.updateUser(values.displayName, fileList.value[0]);
    // fileList.value.forEach((file) => {
    //     console.log(file)
    // });

    // if (fileList.value[0]) {
    //     // const error = await userStore.updateImg(fileList.value[0]);
    //     if (error) {
    //         return message.error('Problemas al subir tu imagen, intentalo mas tarde');
    //     }
    //     message.success('Se actualizo tu imagen')
    // }

    if (!error) {
        return message.success('Perfil actualizado correctamente');
    }

    message.error("Ocurrio un error al actualizar el perfil")
}

const beforeUpload = file => {
    fileList.value = [...fileList.value, file];
    return false;
};

const handleChange = info => {
    // validar los tipos de imagenes
    if (info.file.status !== 'uploading') {
        const isJpgOrPng = info.file.type === 'image/jpeg' || info.file.type === 'image/png';
        if (!isJpgOrPng) {
            handleRemove(info.file)
            return message.error('Solo imagenes png o png');
        }
        const isLt2M = info.file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            handleRemove(info.file)
            return message.error('Maximo 2MB!');
        }
    }
    // valida que sea solo una imagen
    // si el user sube otra, se reemplazara
    let resFileList = [...info.fileList];
    resFileList = resFileList.slice(-1);
    resFileList = resFileList.map(file => {
        if (file.response) {
            file.url = file.response.url;
        }
        return file;
    });

    fileList.value = resFileList;
};

const handleRemove = file => {
    const index = fileList.value.indexOf(file);
    const newFileList = fileList.value.slice();
    newFileList.splice(index, 1);
    fileList.value = newFileList;
};



</script>
<template>

    <a-row>

        <a-col span="12" offset="6">
            <h1>Pelfil del usuario</h1>
            <!-- @submit.prevent="handleSubmit" -->
            <div class="text-center mb-5">
                <a-avatar :src="userStore.userData.photoURL" :size="100"/>
            </div>
            <a-form name="basicPerfil" autocomplete="off" layout="vertical" :model="userStore.userData"
                @finish="onFinish">
                <a-form-item name="email" label="Tu correo(no modificable)"
                    :rules="[{ required: true, whitespace: true, type: 'email', message: 'Ingresa un email' }]">
                    <a-input disabled v-model:value="userStore.userData.email"></a-input>
                </a-form-item>
                <a-form-item name="displayName" label="Ingresa tu nickName"
                    :rules="[{ required: true, whitespace: true, message: 'Ingresa un nick valido' }]">
                    <a-input v-model:value="userStore.userData.displayName"></a-input>
                </a-form-item>

                <div class="clearfix">
                    <a-upload v-model:file-list="fileList" list-type="picture" :before-upload="beforeUpload" 
                        @change="handleChange">
                        <a-button>
                            Subir foto de perfil
                        </a-button>
                    </a-upload>
                </div>

                <a-form-item>
                    <a-button :loading="userStore.loadingUser" type="submit" html-type="submit"
                        :disabled="userStore.loadingUser" class="mt-5">Actualizar información</a-button>
                </a-form-item>
                <!-- <input type="email" placeholder="Ingrese email" v-model.trim="email"> -->
                <!-- <input type="password" placeholder="Ingrese contraseña" v-model.trim="password"> -->
                <!-- <button type="primary" :disabled="userStore.loadingUser">Acceso</button> -->
            </a-form>
        </a-col>
    </a-row>
</template>
<style>
.mb-5 {
    margin-bottom: 2rem;
}
.mt-5 {
    margin-top: 2rem;
}
</style>
