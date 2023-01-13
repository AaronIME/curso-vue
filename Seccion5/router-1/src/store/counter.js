import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

// You can name the return value of `defineStore()` anything you want, 
// but it's best to use the name of the store and surround it with `use` 
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application

//Composition Api
export const useCounterStore = defineStore('counter', () => {
    const count = ref(0)

    const increment = () => count.value++

    const double = computed(() => {
        return count.value * 2
    })
    
    return {
        count,
        increment,
        double
    }
});

//Api de opciones
// export const useCounterStore = defineStore('counter', {
//   //Data reactiva
//     state: () => ({
//         count: 0
//     }),
//     //Metodos
//     actions: {
//         increment(){
//             this.count++
//         }
//     },
//     //Propiedades computadas
//     getters: {
//         double: (state) => state.count * 2
//     }
// })
