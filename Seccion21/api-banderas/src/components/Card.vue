<script>
export default{
    props:['pais'],
    setup(){
        const numeroFormato = (number) => {
            return new Intl.NumberFormat('de-DE').format(number)
        }
        return{
            numeroFormato
        }
    }
}
</script>
<template>
    <div class="card">
        <div class="card-body">
            <h5 class="text-center">{{ pais.name.common }}</h5>
            <p class="text-center">
                <img :src="pais.flags[0]" :alt="`bandera-${pais.name}`" class="img-fluid w-50">
            </p>
            <p class="card-text">
                <span class="badge bg-dark d-block mb-1">nativeName: {{ pais.name.official }}</span>
                <span class="badge bg-info d-block p-3 mb-1">population: {{ numeroFormato(pais.population) }}</span>
                <span class="badge bg-dark d-block mb-1">capital: <span v-if="pais.capital">{{ pais.capital[0] }}</span></span>
                <span class="badge bg-dark d-block mb-1">region: {{ pais.region }}</span>
            </p>
        </div>
    </div>
</template>