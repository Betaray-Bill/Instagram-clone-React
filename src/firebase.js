// Import the functions you need from the SDKs you need
import { initializeApp, getAuth, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDG9S2dT_nTk0XHFQIkyevnUBrkqpg6PdE",
    authDomain: "instagram-clone-meow.firebaseapp.com",
    projectId: "instagram-clone-meow",
    storageBucket: "instagram-clone-meow.appspot.com",
    messagingSenderId: "831063784318",
    appId: "1:831063784318:web:e89f72ae6b3220cc0b112f"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const storage = getStorage()
const auth = getAuth()

export { app, db, storage, auth }