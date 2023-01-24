import { api } from "src/boot/axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore('user', () => {
    const token = ref(null);
    const expiresIn = ref(null);

    const access = async () => {
        try {
            const res = await api.post("/auth/login", {
                email: "correo3@gmail.com",
                password: "123456"
            })
            token.value = res.data.token;
            expiresIn.value = res.data.expiresIn;
            localStorage.setItem('user', true)
            setTime()
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
            console.log("refresh");
            setTime()
        } catch (error) {
            console.log(error);
        }
    }

    const logout = async () => {
        try {
            const res = await api({
                url: "/auth/logout"
            });
            console.log(res);
        } catch (error) {
            console.log(error);
        } finally {
            resetStore()
            localStorage.removeItem('user')
        }
    }

    const resetStore = () => {
        token.value = null
        expiresIn.value = null
    }

    return {
        token,
        expiresIn,
        access,
        setTime,
        refreshToken,
        logout
    }
})