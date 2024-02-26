// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-cc7b4.firebaseapp.com",
  projectId: "mern-blog-cc7b4",
  storageBucket: "mern-blog-cc7b4.appspot.com",
  messagingSenderId: "739874414482",
  appId: "1:739874414482:web:2e6d8ffe1f3cae9a656b4b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);