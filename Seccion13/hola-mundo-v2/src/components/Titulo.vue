<script>
    export default {
        name: 'Titulo',
        props:{
            texto: String
        }
    }
</script>

<template>
    <h1>{{ texto }}</h1>
</template>

<!-- scoped: indica que los estilos solo seran aplicados dentro de ese componente -->
<style scoped>
h1 {
    color: lightgreen
}
</style>