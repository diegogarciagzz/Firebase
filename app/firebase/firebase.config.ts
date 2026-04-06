// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZQl3coaNWGgC3wRUoMgp7Ebfv5tWtwTY",
  authDomain: "proyectofirebase-f015d.firebaseapp.com",
  projectId: "proyectofirebase-f015d",
  storageBucket: "proyectofirebase-f015d.firebasestorage.app",
  messagingSenderId: "856940942231",
  appId: "1:856940942231:web:008cda733e1c6ad703ead2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db}