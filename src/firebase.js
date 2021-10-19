import { initializeApp, getApp, getApps } from "firebase/app"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"
import { getAuth, onAuthStateChanged } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDiKwlW0XAcKezJEsn4cENpkUDAsKXmd48",
    authDomain: "instagramclone-meow.firebaseapp.com",
    projectId: "instagramclone-meow",
    storageBucket: "instagramclone-meow.appspot.com",
    messagingSenderId: "920601001029",
    appId: "1:920601001029:web:9190284b20586a4f15772c",
    measurementId: "G-Y9GD0SM427"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

const storage = getStorage()
const db = getFirestore()
const auth = getAuth()
export { firebaseConfig }

export { app, db, storage, auth }