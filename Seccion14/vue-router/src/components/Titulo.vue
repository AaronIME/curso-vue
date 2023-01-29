<script>
export default {
    name:"Titulo",
    props: {
        texto: String
    }
}
</script>
<template>
    <h2>{{ texto }}</h2>
</template>