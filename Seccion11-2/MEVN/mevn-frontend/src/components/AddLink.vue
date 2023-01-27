<script setup>
import { useLinkStore } from 'src/stores/link-store';
import { useNotify } from '../composables/notifyHook'
import { ref } from 'vue';

const {showNotify} = useNotify();
const linkStore = useLinkStore();
const link = ref("");
const loading = ref(false);
const formAdd = ref(null);

const addLink = async() => {
    try {
        loading.value = true;
        await linkStore.createLink(link.value);
        // $q.notify('Link agregado con exito') 
        showNotify('Link agregado con exito', 'green');
        link.value = ""
        formAdd.value.resetValidation();
    } catch (error) {
        if(error.errors){
            return error.errors.forEach(element => {
                showNotify(element.msg);
            });
        }
        
        showNotify(error);
    } finally {
        loading.value = false;
    }
}


</script>
<template>        
    <q-form ref="formAdd" @submit.prevent="addLink()">
        <q-input lazy-rules v-model="link" label="Introduce el nuevo link" placeholder="Ingresa el link aqui"
        :rules="[(val => val && val.trim() !=  '') || 'Introduce un link']"></q-input>
        <q-btn class="q-mt-sm full-width" type="submit" label="Agregar link" color="primary" :loading="loading"></q-btn>
    </q-form>
</template>