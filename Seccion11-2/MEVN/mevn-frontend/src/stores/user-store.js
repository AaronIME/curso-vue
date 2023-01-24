import { api } from "src/boot/axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore('user', () => {
    const token = ref(null);
    const expiresIn = ref(null);

    const access = async (email, password) => {
        try {
            const res = await api.post("/auth/login", {
                email: email,
                password: password
            })
            token.value = res.data.token;
            expiresIn.value = res.data.expiresIn;
            sessionStorage.setItem('user', true)
            setTime()
        } catch (error) {
            if (error.response) {
                
                throw error.response.data;
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
    }

    const register = async (email, password, repassword) => {
        try {
            const res = await api.post("/auth/register", {
                email: email,
                password: password,
                repassword: repassword
            })
            token.value = res.data.token;
            expiresIn.value = res.data.expiresIn;
            sessionStorage.setItem('user', true)
            setTime()
        } catch (error) {
            if (error.response) {
                
                throw error.response.data;
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            console.log(error.config);
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
            sessionStorage.removeItem('user')
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
        logout,
        register
    }
})