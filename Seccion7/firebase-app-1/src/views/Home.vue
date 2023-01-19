<template>
    <div>
        <h1>Home</h1>
        <p>{{ userStore.userData?.email }}</p>

        <add-form></add-form>

        <!-- <form @submit.prevent="handleSubmit">
            <input type="text" placeholder="Ingrese URL" v-model="url">
            <button type="submit">Agregar</button>
        </form> -->

        <p v-if="databaseStore.loadingDoc">loading docs...</p>

        <a-space direction="vertical" v-if="!databaseStore.loadingDoc" style="width: 100%">
            <a-card :title="item.short" v-for="item of databaseStore.documents" :key="item.id">
                <template #extra>
                    <a-space>
                        <a-button type="primary" @click="router.push(`/editar/${item.id}`)">Editar</a-button>
                        <a-popconfirm title="¿Estás seguro de eliminarlo?" ok-text="Si" cancel-text="No"
                            @confirm="confirm(item.id)" @cancel="cancel()">
                            <a-button danger :loading="databaseStore.loading" :disabled="databaseStore.loading">Eliminar</a-button>
                        </a-popconfirm>
                        <a-button @click="copiarPortapapeles(item.id)">Copiar</a-button>
                    </a-space>
                </template>
                <p>{{ item.name }}</p>
            </a-card>
        </a-space>

        <!-- <ul v-if="!databaseStore.loadingDoc">
            <li v-for="item of databaseStore.documents" :key="item.id">
                {{ item.id }}
                <br>
                {{ item.name }}
                <br>
                {{ item.short }}
                <br>
                <button @click="databaseStore.deleteUrl(item.id)">Eliminar</button>
                <button @click="router.push(`/editar/${item.id}`)">Editar</button>
            </li>
        </ul> -->
    </div>
</template>

<script setup>
import { useUserStore } from '../stores/user'
import { useDatabaseStore } from '../stores/database';
// import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue';

const userStore = useUserStore()
const databaseStore = useDatabaseStore()
const router = useRouter()

databaseStore.getUrls()

const confirm = async(id) => {
    const error = await databaseStore.deleteUrl(id)
    if(!error){
        return message.success("Mensaje eliminado con exito")
    }
    return message.error(error)
    
}

const cancel = () => {
    message.error("No se elimino")
}

const copiarPortapapeles = (id) => {
    console.log(id);
    if(!navigator.clipboard){
        return message.error("Ocurrio un error al copiar al portapapeles")
    }

    const path = window.location + id;
    console.log(path);

    navigator.clipboard.writeText(path).then(()=>{
        return message.success("Copiado al portapapeles")
    })
    .catch(error => {
        return message.error("Ocurrio un error al copiar al portapapeles")
    });
}

// const url = ref('')

// const handleSubmit = () => {
//     // validaciones de esa url...
//     databaseStore.addUrl(url.value)
// }

</script>