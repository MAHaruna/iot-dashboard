// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// >>> Use your project (same as your working HTML dashboard)
const firebaseConfig = {
  apiKey: "AIzaSyCZYeQLBOjWihC-t6WUbj0yfxA-m6GhGSM",
  authDomain: "famous-crossing-450810-k7.firebaseapp.com",
  databaseURL: "https://famous-crossing-450810-k7-default-rtdb.firebaseio.com",
  projectId: "famous-crossing-450810-k7",
  storageBucket: "famous-crossing-450810-k7.appspot.com",
  messagingSenderId: "",
  appId: ""
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
