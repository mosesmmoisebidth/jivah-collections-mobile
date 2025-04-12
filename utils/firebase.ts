// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDLvm4dyidH7EuhvfYphnAEMvGGJuTwfCg",
  authDomain: "jivah-10dfd.firebaseapp.com",
  projectId: "jivah-10dfd",
  storageBucket: "jivah-10dfd.firebasestorage.app",
  messagingSenderId: "328033865017",
  appId: "1:328033865017:web:207be8ed727355787b6ce8",
  measurementId: "G-EP9VJPV441",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();