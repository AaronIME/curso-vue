import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";
import { useUserStore } from "./user-store";
import { useQuasar } from "quasar";



const links = ref([]);

export const useLinkStore = defineStore('link', () => {
    const $q = useQuasar();
    const userStore = useUserStore()
    const createLink = async (link) => {
        console.log("Bearer " + userStore.token);
        try {
            $q.loading.show();
            const res = await api({
                url: "/links",
                method: "POST",
                headers: {
                    authorization: "Bearer " + userStore.token
                },
                data: {
                    longLink: link
                },
            })

            links.value.push(res.data.newLink)
        } catch (error) {

            throw error.response?.data || error

        }finally{
            $q.loading.hide();
        }
    }

    const removeLink = async(id) => {
        try {
            $q.loading.show();
            await api({
                method:"DELETE",
                url:`/links/${id}`,
                headers:{
                    authorization: "Bearer " + userStore.token
                }
            })
            links.value = links.value.filter(item => item._id != id);
        } catch (error) {
            throw error.response?.data || error
        }finally{
            $q.loading.hide();
        }
    }

    const modifiedLink = async(link) => {
        try {
            $q.loading.show();
            await api({
                method: "PATCH",
                url: `links/${link._id}`,
                headers:{
                    authorization: "Bearer " + userStore.token
                },
                data:{
                    longLink: link.longLink
                }
            })  
            // console.log("Actualizado");
            links.value = links.value.map(item => item._id == link._id ? link : item)
        } catch (error) {
            throw error.response?.data || error
        }finally{
            $q.loading.hide();
        }
    }

    const getLinks = async () => {
        try {
            $q.loading.show();
            console.log("Llamando a todos los links✨");
            const res = await api({
                method: "GET",
                url: "/links",
                headers: {
                    authorization: "Bearer " + userStore.token
                }
            })
            links.value = [...res.data.links]
            // links.value = res.data.links.map(item => {
            //     return { longLink:item.longLink, nanoLink: item.nanoLink }
            // })
        } catch (error) {
            console.log(error);
        }finally{
            $q.loading.hide();
        }
    }

    getLinks()

    return {
        modifiedLink,
        removeLink,
        createLink,
        links
    }
});

