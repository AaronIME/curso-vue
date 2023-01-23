<template>
  <q-page padding>
    <q-btn @click="access">Ingresar</q-btn>
    <q-btn @click="createLink">Crear link</q-btn>
    <p>TOKEN: {{ token }}</p>
    <p>Expiracion: {{ expiresIn }}</p>
  </q-page>
</template>

<script setup>
import { api } from 'src/boot/axios';
import { ref } from 'vue';

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

const token = ref()
const expiresIn = ref()

const access = async () => {
  try {
    const res = await api.post("/auth/login", {
      email: "correo3@gmail.com",
      password: "123456"
    })
    token.value = res.data.token;
    expiresIn.value = res.data.expiresIn;
    setTime()
  } catch (error) {
    console.log(error);
  }
}

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

const setTime = () => {
  setTimeout(() => {
    console.log("Se refresco");
    refreshToken()
  }, expiresIn.value * 1000 - 600);
}



const refreshToken = async () => {
  try {
    const res = await api.get("/auth/refresh");
    token.value = res.data.token;
    expiresIn.value = res.data.expiresIn;
    setTime()
  } catch (error) {
    console.log(error);
  }
}

refreshToken();
</script>
