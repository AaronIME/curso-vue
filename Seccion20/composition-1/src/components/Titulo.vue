<script>
import { computed } from 'vue';
export default{
    props:['contador', 'color'],
    setup(props){
        const signoPesos = computed(() =>{
            return "$" + props.contador
        });

        return {
            signoPesos
        }
    }
    // computed:{
    //     signoPesos(){
    //         return "$" + this.contador
    //     }
    // }
}
</script>
<template>
    <h1 :style="color">Contador:{{ signoPesos }}</h1>
</template>