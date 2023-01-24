<template>
  <q-page padding>
    <!-- <q-btn @click="userStore.access">Ingresar</q-btn>
    <q-btn @click="createLink">Crear link</q-btn>
    <q-btn @click="userStore.logout">Cerrar sesion</q-btn> -->
    <p>TOKEN: {{ userStore.token }}</p>
    <p>Expiracion: {{ userStore.expiresIn }}</p>
  </q-page>
</template>

<script setup>
import { api } from 'src/boot/axios';
import { useUserStore } from 'src/stores/user-store';

const userStore = useUserStore();

// userStore.refreshToken();
// import { ref } from 'vue';

// const access = async() => {
//   console.log("Me diste click");
//   await axios.post("http://localhost:5000/api/v1/auth/login", {
//     email : "correo3@gmail.com",
//     password : "123456"
//   }).then((res) => {
//     console.log(res.data);
//   }).catch((error) => {
//     console.log(error);
//   })
// }

const createLink = async () => {
  try {
    const res = await api({
      method: "POST",
      url: "/links",
      headers: {
        "Authorization": 'Bearear ' + token.value
      },
      data: {
        longLink: "https://bluuweb.github.io/desarrollo-web-bluuweb/21-03-api-rest/#requisitos"
      }
    })

    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
}

</script>
