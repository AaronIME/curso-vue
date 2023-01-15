<script setup>
import { async } from '@firebase/util';
import { useDatabaseStore } from '../stores/database';
import { reactive } from 'vue';
import { message } from 'ant-design-vue';

const databaseStore = useDatabaseStore()

const formState = reactive({
    url: ''
})

const onFinish = async (value) => {
    console.log("todo correcto " + value.url);
    const error = await databaseStore.addUrl(formState.url);
    if(!error){        
        formState.url = ''
        return message.success('URL agregado exitosamente')
    }
    switch(error){
        default:
            message.error('Ocurrio un error inesperado');
    }

    
}
const onFinishFailed = async(value) => {
    
}
</script>
<template>
    <a-form name="basic" autocomplete="off" layout="vertical" :model="formState" @finish="onFinish"
        @finishFailed="onFinishFailed">
        <!-- :rules="[{ required: true, message: 'Please input your username!' }]" -->
        <a-form-item label="Ingrese url" name="url"
            :rules="[{ required: true, whitespace: false, pattern: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/, message: 'Ingrese una url valida' }]">
            <!-- v-model:value="formState.username" -->
            <a-input v-model:value="formState.url"></a-input>
        </a-form-item>
        <a-form-item>
            <a-button :loading="databaseStore.loading" :disabled="databaseStore.loading"  type="primary" html-type="submit">Agregar</a-button>
        </a-form-item>
    </a-form>
</template>
<style>

</style>