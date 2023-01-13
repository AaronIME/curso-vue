import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
    apiKey: "AIzaSyCTsqBlZfx3ckuSzDhjphGyY8PZ5fs3Kys",
    authDomain: "vue-firabase-7baf0.firebaseapp.com",
    projectId: "vue-firabase-7baf0",
    storageBucket: "vue-firabase-7baf0.appspot.com",
    messagingSenderId: "704291815495",
    appId: "1:704291815495:web:41f59374a99a8ceccc7162"
  };

initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
