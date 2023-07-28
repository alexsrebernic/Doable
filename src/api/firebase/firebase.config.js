// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from "firebase/auth"
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBy9lhk_ZNi9479XWzmHzs6jPll145idaQ",
  authDomain: "doable-e6ca3.firebaseapp.com",
  projectId: "doable-e6ca3",
  storageBucket: "doable-e6ca3.appspot.com",
  messagingSenderId: "598059087846",
  appId: "1:598059087846:web:152bd63848bd5a0d320827",
  measurementId: "G-XLJZRZFNT2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app)
export {auth,analytics,app,db}