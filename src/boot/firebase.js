// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import {
  getAuth,
  connectAuthEmulator,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBURbotYDvfYyJ3Ubkbi3Brj8SaNlGr4Rw",
  authDomain: "ematch-dev.firebaseapp.com",
  projectId: "ematch-dev",
  storageBucket: "ematch-dev.appspot.com",
  messagingSenderId: "756338738701",
  appId: "1:756338738701:web:6a7dd867f77f421b283744",
  measurementId: "G-0QZ0HS34KJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const analytics = getAnalytics(app);
const storage = getStorage(app);

export { app, storage, auth, db };
