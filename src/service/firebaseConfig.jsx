
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore  } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC15glwbJmcMdkd8x2Pc7qcV1ZsXNExA9o",
  authDomain: "makemyplane1.firebaseapp.com",
  projectId: "makemyplane1",
  storageBucket: "makemyplane1.firebasestorage.app",
  messagingSenderId: "924525164288",
  appId: "1:924525164288:web:667fae4654ef4bed9ae5e5",
  measurementId: "G-WB1ZTYE9SP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
