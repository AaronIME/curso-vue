<template>
    <div>
        <h1>Editar id: {{route.params.id}}</h1>
        <a-form name="editform" autocomplete="off" layout="vertical" :model="formState" @finish="onFinish"
            @finishFailed="onFinishFailed">
            <!-- :rules="[{ required: true, message: 'Please input your username!' }]" -->
            <a-form-item label="Ingrese url" name="url"
                :rules="[{ required: true, whitespace: false, pattern: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/, message: 'Ingrese una url valida' }]">
                <!-- v-model:value="formState.username" -->
                <a-input v-model:value="formState.url"></a-input>
            </a-form-item>
            <a-form-item>
                <a-button :loading="databaseStore.loading" :disabled="databaseStore.loading" type="primary"
                    html-type="submit">Editar</a-button>
            </a-form-item>
        </a-form>
        <!-- <form @submit.prevent="handleSubmit">
            <input type="text" placeholder="Ingrese URL" v-model="url">
            <button type="submit">Editar</button>
        </form> -->
    </div>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue';
import { useRoute } from 'vue-router'
import { useDatabaseStore } from '../stores/database'
import { message } from 'ant-design-vue';

const databaseStore = useDatabaseStore()

const formState = reactive({
    url: ''
});

const route = useRoute()
// console.log(route.params.id)

// const handleSubmit = () => {
//     // validaciones de el input
//     databaseStore.updateUrl(route.params.id, url.value)
// }

// const url = ref('')

const onFinish = async (value) => {
    console.log("todo correcto " + value.url);
    const error = await databaseStore.updateUrl(route.params.id, formState.url)
    if(!error){        
        formState.url = ''
        return message.success('URL editada exitosamente')
    }
    switch(error){
        default:
            message.error('Ocurrio un error inesperado');
    }

    
}
const onFinishFailed = async(value) => {
    
}

onMounted(async () => {
    formState.url = await databaseStore.leerUrl(route.params.id)
})
</script>