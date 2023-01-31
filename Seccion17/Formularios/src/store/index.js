import { createStore } from 'vuex'
import router from '@/router';

export default createStore({
  state: {
    tareas:[],
    tarea: {
      id:"",
      nombre: "",
      categorias: [],
      estado: "",
      number: 0
    }
  },
  getters: {
  },
  mutations: {
    set(state, tarea){
      state.tareas.push(tarea)
      console.log(state.tareas);
      localStorage.setItem('tareas',JSON.stringify(state.tareas))
    },
    delete(state, id){
      state.tareas = state.tareas.filter(tarea => tarea.id !== id);
      localStorage.setItem('tareas',JSON.stringify(state.tareas))
    },
    tarea(state, id){
      if(!state.tareas.find(tarea => tarea.id == id)){
        router.push('/');
      }else{
        state.tarea = state.tareas.find(tarea => tarea.id == id);
      }
    },
    update(state, tarea){
      state.tareas = state.tareas.map(item => item.id == tarea.id ? tarea : item);
      localStorage.setItem('tareas',JSON.stringify(state.tareas))
      router.push('/')
    },
    cargar(state, tareas){
      state.tareas = tareas
    }
  },
  actions: {
    cargarLocalStorage({commit}){
      if(localStorage.getItem('tareas')){
        const tareas = JSON.parse(localStorage.getItem('tareas'));
        commit('cargar', tareas)
        return
      }

      localStorage.setItem('tareas', JSON.stringify([]))
    },
    setTareas({commit}, tarea){
      commit('set', tarea)
    },
    deleteTarea({commit}, id){
      commit('delete', id)
    },
    setTarea({commit}, id){
      commit('tarea', id)
    },
    updateTarea({commit}, tarea){
      commit('update', tarea)
    }
  },
  modules: {
  }
})