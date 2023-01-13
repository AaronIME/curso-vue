<script setup>
import { useFavoritosStore } from '@/store/favoritos';
import { storeToRefs } from 'pinia';
import { RouterLink } from 'vue-router';

const { favoritos } = storeToRefs(useFavoritosStore())
const { removeFavorito } = useFavoritosStore()
console.log(favoritos.value);

</script>
<template>
    <h1>Favoritos</h1>
    <p v-if="favoritos.length === 0">Sin favoritos</p>
    <ul v-else class="list-group">
        <div v-for="pokemon in favoritos">
            <router-link :to="`/pokemons/${pokemon.name}`">
                <li class="list-group-item">
                    {{ pokemon.name }}
                    <img :src="pokemon.sprites.front_default" alt="">
                    <button @click="removeFavorito(pokemon.id)" class="btn btn-danger" type="button">Borrar favorito</button>
                </li>
            </router-link>
        </div>
    </ul>
</template>