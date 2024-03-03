// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getAuth, browserLocalPersistence, setPersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJH_KVfrsmsfLlmI2ExnoOhyCAN-Y4DXM",
  authDomain: "aurauserve-376fc.firebaseapp.com",
  databaseURL: "https://aurauserve-376fc-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "aurauserve-376fc",
  storageBucket: "aurauserve-376fc.appspot.com",
  messagingSenderId: "602681964691",
  appId: "1:602681964691:web:5b16e9eeac599600857566",
  measurementId: "G-86YGLQ52WP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = initializeAuth(app);
setPersistence(getAuth(app), browserLocalPersistence, AsyncStorage);

// Get Firestore instance
const fr = getFirestore(app);

export { auth, fr };
