import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";
import { useUserStore } from "./user-store";

const links = ref([]);

export const useLinkStore = defineStore('link', () => {
    const userStore = useUserStore()
    const createLink = async (link) => {
        console.log("Bearer " + userStore.token);
        try {
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

        }
    }

    const getLinks = async () => {
        try {
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
        }
    }

    getLinks()

    return {
        createLink,
        links
    }
});

