<script>
import { mapState } from 'vuex';
import { mapActions } from 'vuex';
import Input from './Input.vue';
export default{
    components:{
        Input
    },
    computed:{
        ...mapState(['tarea'])
    },
    methods:{
        ...mapActions(['setTarea','updateTarea'])
    },
    created(){
        this.setTarea(this.$route.params.id)
    }

}
</script>
<template>
    Editar
    {{ $route.params.id }} - {{ tarea }}
    <form @submit.prevent="updateTarea(tarea)">
        <Input :tarea="tarea"></Input>
    </form>
</template>