<script setup>
    import { useUserStore } from 'src/stores/user-store';
    const userStore = useUserStore();

</script>
<template>
    <h3>Login</h3>
    <p>{{ userStore.token }}</p>
</template>