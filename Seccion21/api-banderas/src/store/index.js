import { createStore } from 'vuex'

export default createStore({
  state: {
    paises: [],
    paisesFiltrados: []
  },
  getters: {
    topPaisesPoblacion(state){
      return state.paisesFiltrados.sort((a,b)=>{
        return a.population < b.population ? 1 : -1
      })
    }
  },
  mutations: {
    setPaises(state, paises){
      state.paises = paises
    },
    
    setPaisesFiltrados(state, paisesfilt){
      state.paisesFiltrados = paisesfilt
    }
  },
  actions: {
    async getPaises({commit}){
      const res = await fetch(`https://restcountries.com/v3/all`);
      const data = await res.json();
      console.log(data);
      commit('setPaises', data)
    },
    filtrarRegion({commit, state}, region){
      console.log(region);
      const filtro = state.paises.filter(pais => 
        pais.region.includes(region)
      )
      commit('setPaisesFiltrados', filtro)
    },
    filtroNombre({commit, state}, texto){
      const textoCliente = texto.toLowerCase()
      const filtro = state.paises.filter(pais =>{
        const textoApi = pais.name.common.toLowerCase()
        if(textoApi.includes(textoCliente)){
          return pais
        }
      });
      commit('setPaisesFiltrados', filtro)
    }
  },
  modules: {
  }
})
