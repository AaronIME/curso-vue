<script>
import Titulo from '../components/Titulo.vue';

export default {
    components: {
        Titulo
    },
    data(){
        return {
            arrayPosts:[],
        }
    },
    methods: {
        async obtenerPosts() {
            try {
                const res = await fetch('https://jsonplaceholder.typicode.com/posts')
                const data = await res.json()
                this.arrayPosts = data;                
            } catch (error) {
                console.log(error);
            }
        },

        obtenerPosts2() {
            fetch('https://jsonplaceholder.typicode.com/posts')
            .then(
                (res) => res.json()
            ).then(
                data => {
                    console.log(data)
                }
                
            ).catch(error => {
                console.log(error);
            })
        }
    },
    created(){
        this.obtenerPosts()
    }
}
</script>
<template>
    <Titulo texto="Titulo de mi Blog"></Titulo>
    <button @click="obtenerPosts()">Posts</button>
    <div v-for="post in arrayPosts" :key="post.id">
        <router-link :to="`/articulo/${post.id}`">{{  post.title  }}</router-link>
    </div>
</template>