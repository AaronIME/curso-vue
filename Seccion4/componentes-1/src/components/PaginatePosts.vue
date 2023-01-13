<script setup>
const emit = defineEmits(['next','prev'])

const props = defineProps({
    inicio: Number,
    fin: Number,
    maxLength: Number
}) 

</script>
<template>
    <div class="btn-group" role="group" aria-label="Button group">
        <button @click="emit('prev')" :disabled="inicio === 0" class="btn btn-outline-primary" type="button">Previous {{ inicio }}</button>
        <button @click="emit('next')" :disabled="fin === maxLength" class="btn btn-outline-primary" type="button">Next {{fin}}</button>
    </div>
</template>
<style></style>