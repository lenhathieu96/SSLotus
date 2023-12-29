// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9Ao8bHYHo9dJrKU-sH0vu0kWnMuLyp9g",
  authDomain: "otus-63127.firebaseapp.com",
  projectId: "otus-63127",
  storageBucket: "otus-63127.appspot.com",
  messagingSenderId: "582903712261",
  appId: "1:582903712261:web:a8d268e28f709b5a79ea6c",
  measurementId: "G-KBTYQXECEP",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);
export default firestore;
