// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEWy8kztFRV4xioQq3wmlLkyAurkmYoQU",
  authDomain: "todocook-b2074.firebaseapp.com",
  projectId: "todocook-b2074",
  storageBucket: "todocook-b2074.appspot.com",
  messagingSenderId: "55292095635",
  appId: "1:55292095635:web:8177a9441c3487d8c4b166",
  measurementId: "G-5Q840TY9WB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const db = getFirestore(app);

export const auth = getAuth(app);

export const storage = getStorage(app);

export function signup(email, password) {
  createUserWithEmailAndPassword(auth, email, password);
}