<script>
import { useStore } from 'vuex'
import { onMounted, computed } from 'vue'
import Card from './Card.vue'
export default{
    components:{
        Card
    },
    setup(){
        const store = useStore()
        

        onMounted(async () => {
            await store.dispatch('getPaises')
            await store.dispatch('filtrarRegion','Americas')
        })

        const paises = computed(() => {
            return store.getters.topPaisesPoblacion
        });

        return{
            paises
        }
    }
}   
</script>
<template>
    <div class="row">
        <div class="col-12">
            <Card v-for="(pais, index) in paises" :id="index" :pais="pais"></Card>
        </div>
    </div>
</template>