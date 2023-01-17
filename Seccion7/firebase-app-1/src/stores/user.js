import { defineStore } from "pinia";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendEmailVerification,
    signInWithEmailAndPassword,
    signOut, updateProfile
} from "firebase/auth";
import { auth, db, storage } from "../firebaseConfig";
import router from "../router";
import { useDatabaseStore } from "./database";
import { doc, getDoc, setDoc } from "firebase/firestore/lite";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";


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
        async setUser(user) {
            try {
                const docRef = doc(db, "users", user.uid);
                // const docSpan = await getDoc(docRef);

                this.userData = {
                    email: user.email,
                    uid: user.uid,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                }

                await setDoc(docRef, this.userData);


                // if (docSpan.exists()) {
                //     console.log("existe");
                //     console.log(docSpan.data());
                //     this.userData = { ...docSpan.data() };
                // } else {
                //     console.log("no existe");
                //     await setDoc(docRef, {
                //         email: user.email,
                //         uid: user.uid,
                //         displayName: user.displayName,
                //         photoURL: user.photoURL,

                //     })
                //     this.userData = {
                //         email: user.email,
                //         uid: user.uid,
                //         displayName: user.displayName,
                //         photoURL: user.photoURL,

                //     }
                // }
            } catch (error) {
                console.log(error);
            }
        },
        // async updateImg(imagen) {
        //     try {
        //         const storageRef = ref(storage, `perfiles/${this.userData.uid}`);

        //         await uploadBytes(storageRef, imagen.originFileObj)

        //         const photoURL = await getDownloadURL(storageRef)

        //         await updateProfile(auth.currentUser, {
        //             photoURL: photoURL
        //         })

        //         this.setUser(auth.currentUser)
        //     } catch (error) {
        //         console.log(error);
        //         return error.code;

        //     }
        // },
        async updateUser(displayName, imagen) {
            try {
                if (imagen) {
                    console.log(imagen);
                    const storageRef = ref(storage, `perfiles/${this.userData.uid}`);

                    await uploadBytes(storageRef, imagen.originFileObj)

                    const photoURL = await getDownloadURL(storageRef)

                    await updateProfile(auth.currentUser, {
                        photoURL: photoURL
                    })
                }

                await updateProfile(auth.currentUser, {
                    displayName: displayName
                })
                this.setUser(auth.currentUser)
                console.log(auth.currentUser);
            } catch (error) {
                console.log(error);
                return error
            }
        },
        async loginUser(email, password) {
            this.loadingUser = true;
            try {
                const { user } = await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

                await this.setUser(user)



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
                router.push("/login");
                // this.userData = null;

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
                            console.log(user);
                            // this.userData = {
                            //     email: user.email,
                            //     uid: user.uid,
                            // };
                            // await this.setUser(user)
                            this.userData = {
                                email: user.email,
                                uid: user.uid,
                                displayName: user.displayName,
                                photoURL: user.photoURL,
                            }
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
