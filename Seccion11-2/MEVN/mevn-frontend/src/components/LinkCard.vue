<script setup>
import { useQuasar } from 'quasar';
import { useLinkStore } from 'src/stores/link-store';
import { ref } from 'vue';
import { useNotify } from 'src/composables/notifyHook';

const { successNotify, errorNotify } = useNotify();

const linkStore = useLinkStore();

const $q = useQuasar();

defineProps({
    link: Object
});

const deleteLink = async (id) => {

    $q.dialog({
        title: 'Advertencia: Eliminar elemento',
        message: '¿Quieres eliminar este elemento?',
        cancel: true,
    }).onOk(async () => {
        try {
            await linkStore.removeLink(id)
            // console.log("Removido : " + id);
            successNotify('Se elimino el link');
        } catch (error) {
            if (error.errors) {
                return error.errors.forEach(element => {
                    errorNotify(element.msg);
                });
            }
            errorNotify(error);
        }
    });


}

const updateLink = async (link) => {
    $q.dialog({
        title: 'Actualizar LINK',
        message: 'Actualiza tu link aqui',
        prompt: {
            model: link.longLink,
            type: 'text' // optional
        },
        cancel: true,
        persistent: true,
    }).onOk(async (data) => {
        try {
            const newLink = { ...link, longLink: data };
            await linkStore.modifiedLink(newLink);
            successNotify('Se actualizo el link');
        } catch (error) {
            if (error.errors) {
                return error.errors.forEach(element => {
                    errorNotify(element.msg);
                });
            }
            errorNotify(error);
        }
    })
}

const copyLink = async(nanoLink) => {
    try {
        const path = `${process.env.FRONT_URI}${nanoLink}`;
        await navigator.clipboard.writeText(path);
        successNotify('Se copio el link');
    } catch (error) {
        console.log(object);
        errorNotify(error);
    }
}



</script>
<template>
    <q-card class="my-card q-mb-sm">
        <q-card-section>
            <div class="text-overline">{{ link.nanoLink }}</div>
            {{ link }}
        </q-card-section>
        <q-separator />

        <q-card-actions>
            <q-btn flat round icon="mdi-trash-can-outline" color="red" @click="deleteLink(link._id)" />
            <q-btn flat round icon="mdi-pencil-outline" @click="updateLink(link)" />
            <q-btn flat @click="copyLink(link.nanoLink)">Copy</q-btn>
        </q-card-actions>
    </q-card>

</template>