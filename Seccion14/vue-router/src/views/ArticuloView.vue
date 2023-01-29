<script>
import Titulo from '@/components/Titulo.vue';

export default {
    data() {
        return {
            id: this.$route.params.id,
            post: null
        }
    },
    components: {
        Titulo
    },
    methods: {
        obtenerPost() {
            fetch(`https://jsonplaceholder.typicode.com/posts/${this.id}`)
                .then(res => res.json())
                .then(data => {
                        this.post = data;
                    }
                )
                .catch(
                    error => {
                        console.log(error);
                    }
                );
        }
    },
    created() {
        this.obtenerPost();
    }
}
</script>
<template>
    <Titulo texto="Titulo del articulo"></Titulo>
    <h2>Parametro: {{ id }}</h2>
    <h2>{{ post.title }}</h2>
    <p>{{ post.id }} - {{ post.body }}</p>
</template>