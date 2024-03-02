// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getAuth, browserLocalPersistence, setPersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDa97PaioPNHZ50ntcj37kdXrwXGHLWiEM",
  authDomain: "aurauserve.firebaseapp.com",
  projectId: "aurauserve",
  storageBucket: "aurauserve.appspot.com",
  messagingSenderId: "630857184523",
  appId: "1:630857184523:web:9d6af0d8fdcd9452309e0e",
  measurementId: "G-0GRDNG9M89"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = initializeAuth(app);

// Set persistence to AsyncStorage
setPersistence(auth, browserLocalPersistence, AsyncStorage);

export { auth };