import { onMounted, ref } from "vue";
export function useFetch(url) {
    const arrayPaises = ref([]);

    onMounted(async () => {
        try {
            const res = await fetch(url)
            arrayPaises.value = await res.json()
            console.log(arrayPaises.value);
        } catch (error) {
            console.log(error);
        }
    })

    return {
        arrayPaises
    }
}