<script>
import AccionSaldo from './AccionSaldo.vue';

export default {
    components:{
        AccionSaldo
    },
    data() {
        return {
            saldo: 1000,
            cuenta: 'Visa',
            estado: true,
            desactivar: false,
            servicios: ['giro','abono','transferencia']
        }
    },methods:{
        aumentarSaldo(){
            this.saldo +=  100;
            this.desactivar = false;
        },

        disminuirSaldo(){
            if(this.saldo == 0){
                alert('Saldo agotado');
                this.desactivar = true;
            }else{
                this.saldo -=  100;
            }
        }
    }
}
</script>
<template>
    <h2>Tipo de cuenta: {{ cuenta }}</h2>
    <h2>Saldo {{ saldo }}</h2>
    <h2>Cuenta {{ estado ? 'Activa' : 'Inactiva' }}</h2>
    <div v-for="(servicio, index) in servicios" :key="index">
        {{ index }} - {{ servicio }}
    </div>
    <AccionSaldo texto="Aumentar saldo" @accion="aumentarSaldo"></AccionSaldo>
    <AccionSaldo :desactivar="desactivar" texto="Disminuir saldo" @accion="disminuirSaldo"></AccionSaldo>
</template>