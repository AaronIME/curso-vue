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
    },
    user: null,
    error:{
      tipo:null,
      mensaje:''
    }
  },
  //Retornan informacion del state
  getters: {
    usuarioAutenticado(state){
      //!!: devuelve false si un valor es nulo
      return !!state.user
    }
  },
  mutations: {
    setError(state, error){
      if(error == "EMAIL_NOT_FOUND"){
        return state.error = {tipo:'email', mensaje:'Email no encontrado'}
      }
    },
    setUser(state, user) {
      state.user = user;
      console.log("Guardando usuario en local storage");
      console.log(state.user);
    },
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
    async cargarLocalStorage({ commit, state} ) {
      if(localStorage.getItem('user')){
        console.log("HOLA");
        commit('setUser', JSON.parse(localStorage.getItem('user')));
      }else{
        commit('setUser', null);
      }
      try {
        const res = await fetch(`https://vue-firabase-2-default-rtdb.firebaseio.com/tareas/${state.user.localId}.json?auth=${state.user.idToken}`);
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
    async setTareas({ commit, state }, tarea) {
      try {
        console.log(state.user.localId);
        const res = await fetch(`https://vue-firabase-2-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`, {
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
    async deleteTarea({ commit, state }, id) {
      try {
        const res = await fetch(`https://vue-firabase-2-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${id}.json?auth=${state.user.idToken}`, {
          method: "DELETE",
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
    async updateTarea({ commit,state }, tarea) {

      try {
        const res = await fetch(`https://vue-firabase-2-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(tarea)
        })
        const dataDB = await res.json();
        console.log(dataDB);
        commit('update', tarea)
      } catch (error) {
        console.log(error);
      }
    },
    async updateTarea({ commit, state }, tarea) {

      try {
        const res = await fetch(`https://vue-firabase-2-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(tarea)
        })
        const dataDB = await res.json();
        console.log(dataDB);
        commit('update', tarea)
      } catch (error) {
        console.log(error);
      }
    },
    async registrarUsuarios({ commit }, user) {
      console.log(user);
      try {
        const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBDZ-8wXu4dlWNA1pUzgcFqy3sn5xJ5SSg', {
          method: 'POST',
          headers: {
            'Content-Type': 'aplicación/json'
          },
          body: JSON.stringify({
            email: user.email,
            password: user.password,
            returnSecureToken: true
          })
        })

        const userDB = await res.json();
        if (userDB.error) {
          console.log(userDB.error);
          
          return
        }
        commit('setUser', userDB);
        router.push('/')
        localStorage.setItem('user', JSON.stringify(userDB));
      } catch (error) {
        console.log(error);
      }

    },
    async ingresoUsuarios({ commit }, usuario) {
      try {
        console.log(usuario);
        const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBDZ-8wXu4dlWNA1pUzgcFqy3sn5xJ5SSg', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: usuario.email,
            password: usuario.password,
            returnSecureToken: true
          })
        });
        const userDB = await res.json();
        console.log(userDB);
        if (userDB.error) {
          console.log(userDB.error);
          commit('setError',userDB.error)
          return
        }
        
        
        commit('setUser', userDB);
        router.push('/')
        localStorage.setItem('user', JSON.stringify(userDB));


      } catch (error) {
        console.log(error);
      }
    },
    cerrarSesion({commit}){
      commit('setUser', null);
      router.push('/ingreso')
      localStorage.removeItem('user')
    }
  },
  modules: {
  }
})