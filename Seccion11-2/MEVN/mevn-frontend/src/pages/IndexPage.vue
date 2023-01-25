<template>
  <q-page padding>
    <!-- <q-btn @click="userStore.access">Ingresar</q-btn>
    <q-btn @click="createLink">Crear link</q-btn>
    <q-btn @click="userStore.logout">Cerrar sesion</q-btn> -->
    <p>TOKEN: {{ userStore.token }}</p>
    <p>Expiracion: {{ userStore.expiresIn }}</p>
    <q-btn @click="linkStore.createLink('https://www.google.com')">Crear link</q-btn>
    <AddLink/>
    <pre>
      {{ linkStore.links }}
    </pre>
    <template v-for="link in linkStore.links" :key="link.id">
      <LinkCard></LinkCard>    
    </template>
    
  </q-page>
</template>

<script setup>
import AddLink from 'src/components/AddLink.vue';
import LinkCard from 'src/components/LinkCard.vue';
import { useLinkStore } from 'src/stores/link-store';
import { useUserStore } from 'src/stores/user-store';


const linkStore = useLinkStore();
const userStore = useUserStore();



</script>
