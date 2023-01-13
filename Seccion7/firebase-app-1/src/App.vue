<template>
  <a-layout>
    <a-layout-header v-if="!userStore.loadingSession">
      <a-menu theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }" v-model:selectedKeys="selectedKeys">
        <a-menu-item v-if="userStore.userData" key="home">
          <router-link to="/" >Home</router-link>
        </a-menu-item>
        <a-menu-item v-if="!userStore.userData" key="login">
          <router-link to="/login" >Login</router-link>
        </a-menu-item>
        <a-menu-item v-if="!userStore.userData" key="register">
          <router-link to="/register" >Register</router-link>
        </a-menu-item>
        <a-menu-item @click="userStore.logoutUser" v-if="userStore.userData" key="logout">Logout</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content :style="{ padding: '0 50px'}">
      
      <div :style="{ background: '#fff', padding: '24px', minHeight: '380px' }">
        <div v-if="userStore.loadingSession">
          loading user...
        </div>
        <router-view></router-view>
      </div>
    </a-layout-content>

  </a-layout>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from './stores/user'

const route = useRoute()
const userStore = useUserStore()
const selectedKeys = ref([])

//Esta pendiente de un dato, recibe el dato que se espera y su accion correspondiente
watch(() => route.name, () => {selectedKeys.value = [route.name]});



</script>