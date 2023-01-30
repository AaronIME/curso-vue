import { createStore } from 'vuex'

export default createStore({
  //data
  state: {
    contador: 50
  },
  getters: {
  },
  //El objetivo de las mutaciones es modificar el state
  mutations: {
    incrementar(state, numero){
      state.contador += numero;
    },
    disminuir(state, numero){
      state.contador -= numero;
    }
  },
  //Se recomienda hacer acciones que ejecuten una mutacion
  //Las acciones activan o accionan una mutacion
  //Commit ejecuta una mutacion
  actions: {
    accionIncrementar({commit}, numero){
      //Ejecuta la accion incrementar
      commit('incrementar', numero)
    },
    accionDisminuir({commit}, numero){
      commit('disminuir', numero);
    },
    accionBoton({commit}, objeto){
      if(objeto.estado){
        commit('incrementar', objeto.numero)
      }else{
        commit('disminuir', objeto.numero);
      }
    }
  },
  modules: {
  }
})
