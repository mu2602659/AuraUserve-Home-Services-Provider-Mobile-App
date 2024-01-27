// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

export const auth = getAuth(app);

