import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB6SyaMbL-bJc_kApGlY_v_A6hD4TR7_uI",
    authDomain: "firestore-auth-1-15b08.firebaseapp.com",
    projectId: "firestore-auth-1-15b08",
    storageBucket: "firestore-auth-1-15b08.appspot.com",
    messagingSenderId: "51650570436",
    appId: "1:51650570436:web:ac3aa30c6a136791be8191"
  };

  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }
  
  const db = firebase.firestore()
  const auth = firebase.auth()
  const marcaTiempo = firebase.firestore.FieldValue.serverTimestamp

  firebase.getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsuscribe = firebase.auth().onAuthStateChanged(user => {
            unsuscribe()
            resolve(user)
        }, reject)
    })
  }

  

  export {db, auth, marcaTiempo, firebase}