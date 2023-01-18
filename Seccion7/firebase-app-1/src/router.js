import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "./stores/user";

import Home from "./views/Home.vue";
import Editar from "./views/Editar.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Perfil from "./views/Perfil.vue";
import NotFound from "./views/NotFound.vue";
import { useDatabaseStore } from "./stores/database";

const requireAuth = async (to, from, next) => {
    const userStore = useUserStore();
    userStore.loadingSession = true;
    const user = await userStore.currentUser();
    if (user) {
        next();
    } else {
        next("/login");
    }
    userStore.loadingSession = false;
};

const redirection = async(to, from, next) => {
    const databaseStore = useDatabaseStore()
    const userStore = useUserStore();
    userStore.loadingSession = true;
    const name = await databaseStore.getUrl(to.params.pathMatch[0])
    console.log(name);
    if(!name){
        next();
        userStore.loadingSession = false;
    }else{
        window.location.href = name;
        next();
        userStore.loadingSession = true;
    }
}

const routes = [
    { path: "/", component: Home, beforeEnter: requireAuth, name: "home"},
    { path: "/editar/:id", component: Editar, beforeEnter: requireAuth, name: "edit"},
    { path: "/login", component: Login, name: "login" },
    { path: "/register", component: Register, name: "register" },
    { path: "/perfil", component: Perfil, beforeEnter: requireAuth, name: "perfil" },
    { path: "/:pathMatch(.*)*", component: NotFound, beforeEnter:redirection, name: "404"},
];

const router = createRouter({
    routes,
    history: createWebHistory(),
});

export default router;
