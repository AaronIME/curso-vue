<script>
import { useUser } from '@/composables/useUser';
import { useAuth } from '@vueuse/firebase';
export default{
    setup(){
        const {signIn, signOut} = useUser()
        const {user, isAuthenticated} = useAuth()
        return{
            signIn,
            signOut,
            user,
            isAuthenticated
        }
    }
}
</script>
<template>
    <div v-if="isAuthenticated">
        <h1>Pefil</h1>
        <pre>{{ user }}</pre>
    </div>
</template>