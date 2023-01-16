import { defineStore } from "pinia";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendEmailVerification,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import router from "../router";
import { useDatabaseStore } from "./database";
import {doc, getDoc, setDoc} from "firebase/firestore/lite";

export const useUserStore = defineStore("userStore", {
    state: () => ({
        userData: null,
        loadingUser: false,
        loadingSession: false,
    }),
    actions: {
        async registerUser(email, password) {
            this.loadingUser = true;
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                // this.userData = { email: user.email, uid: user.uid };
                await sendEmailVerification(auth.currentUser);
                router.push("/login");
            } catch (error) {
                console.log(error.code);
                return error.code
            } finally {
                this.loadingUser = false;
            }
        },
        async setUser(user){
            try {
                const docRef = doc(db,"users",user.uid);
                const docSpan = await getDoc(docRef);
                if(docSpan.exists()){
                    console.log("existe");
                    this.userData = { ...docSpan.data() };
                }else{
                    console.log("no existe");
                    await setDoc(docRef, {
                         email: user.email,
                         uid: user.uid,
                         displayName: user.displayName,
                         photoURL: user.photoURL,

                    })
                    this.userData = {
                        email: user.email,
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,

                   }
                }
            } catch (error) {
                console.log(error);
            }
        },
        async loginUser(email, password) {
            this.loadingUser = true;
            try {
                // const { user } = 
                await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

                
                
                router.push("/");
                // this.userData = { email: user.email, uid: user.uid };
                
            } catch (error) {
                console.log(error.code);
                return error.code
            } finally {
                this.loadingUser = false;
            }
        },
        async logoutUser() {
            const databaseStore = useDatabaseStore();
            databaseStore.$reset();
            try {
                await signOut(auth);
                this.userData = null;
                router.push("/login");
            } catch (error) {
                console.log(error);
            }
        },
        currentUser() {
            return new Promise((resolve, reject) => {
                const unsuscribe = onAuthStateChanged(
                    auth,
                    async (user) => {
                        if (user) {
                            // this.userData = {
                            //     email: user.email,
                            //     uid: user.uid,
                            // };
                            await this.setUser(user)
                        } else {
                            this.userData = null;
                            const databaseStore = useDatabaseStore();
                            databaseStore.$reset();
                        }
                        resolve(user);
                    },
                    (e) => reject(e)
                );
                unsuscribe();
            });
        },
    },
});
