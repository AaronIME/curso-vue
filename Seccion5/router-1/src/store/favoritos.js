import { defineStore } from "pinia";
import { ref } from "vue";

export const useFavoritosStore = defineStore('favoritos', () =>{
    const favoritos = ref([])

    if(localStorage.getItem('favoritos')){
        favoritos.value = JSON.parse(localStorage.getItem('favoritos'))
    }

    const addFavorito = (pokemon) => {
        favoritos.value.push(pokemon)
        //Utilizando localStorage
        localStorage.setItem('favoritos',JSON.stringify(favoritos.value))//Necesita un nombre, ademas los datos los guarda como texto
    }

    const removeFavorito = (id) => {
        favoritos.value = favoritos.value.filter(item => {
            return item.id !== id
        })
    }

    const findPoke = (name) => favoritos.value.find( item => item.name === name)
    

    return {
        favoritos,
        addFavorito,
        removeFavorito,
        findPoke
    }
})