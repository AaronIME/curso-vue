import { createStore } from 'vuex'
import router from '@/router';

export default createStore({
  state: {
    tareas: [],
    tarea: {
      id: "",
      nombre: "",
      categorias: [],
      estado: "",
      number: 0
    }
  },
  getters: {
  },
  mutations: {
    set(state, tarea) {
      state.tareas.push(tarea)
      console.log(state.tareas);
      // localStorage.setItem('tareas',JSON.stringify(state.tareas))
    },
    delete(state, id) {
      state.tareas = state.tareas.filter(tarea => tarea.id !== id);
      // localStorage.setItem('tareas',JSON.stringify(state.tareas))
    },
    tarea(state, id) {
      if (!state.tareas.find(tarea => tarea.id == id)) {
        router.push('/');
      } else {
        state.tarea = state.tareas.find(tarea => tarea.id == id);
      }
    },
    update(state, tarea) {
      state.tareas = state.tareas.map(item => item.id == tarea.id ? tarea : item);
      // localStorage.setItem('tareas',JSON.stringify(state.tareas))
      router.push('/')
    },
    cargar(state, tareas) {
      state.tareas = tareas
    }
  },
  actions: {
    async cargarLocalStorage({ commit }) {
      try {
        const res = await fetch(`https://vue-firabase-2-default-rtdb.firebaseio.com/tareas.json`);
        const dataDB = await res.json();
        console.log(dataDB);
        console.log("Hola");
        
        const arrayTareas = [];

        for (let id in dataDB) {
          arrayTareas.push(dataDB[id]);
        }
        
        
        console.log(arrayTareas);
        commit('cargar', arrayTareas)

        // localStorage.setItem('tareas')
      } catch (error) {
        console.log(error); 
      }
      // if(localStorage.getItem('tareas')){
      //   const tareas = JSON.parse(localStorage.getItem('tareas'));
      //   commit('cargar', tareas)
      //   return
      // }

      // localStorage.setItem('tareas', JSON.stringify([]))
    },
    async setTareas({ commit }, tarea) {
      try {
        console.log("Tarea2:");
        console.log(tarea);
        const res = await fetch(`https://vue-firabase-2-default-rtdb.firebaseio.com/tareas/${tarea.id}.json`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(tarea)
        })

        const dataOB = await res.json()

        console.log(dataOB);
      } catch (error) {
        console.log(error);
      }
      commit('set', tarea)
    },
    async deleteTarea({ commit }, id) {
      try {
        const res = await fetch(`https://vue-firabase-2-default-rtdb.firebaseio.com/tareas/${id}.json`,{
          method:"DELETE",
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const dataDB = await res.json()
        console.log(dataDB);
      } catch (error) {
        console.log(error);
      }
      commit('delete', id)
    },
    setTarea({ commit }, id) {
      commit('tarea', id)
    },
    async updateTarea({ commit }, tarea) {
      
      try {
        const res = await fetch(`https://vue-firabase-2-default-rtdb.firebaseio.com/tareas/${tarea.id}.json`, {
          method: 'PATCH',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(tarea)
        })
        const dataDB = await res.json();
        console.log(dataDB);
        commit('update', tarea)
      } catch (error) {
        console.log(error);
      }
    }
  },
  modules: {
  }
})