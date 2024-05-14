//import firebase from "firebase/app";
import "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCE8rBU-zoOInUrZ7eCOHlNLkFSCVR3Iws",
  authDomain: "servify-app-6a259.firebaseapp.com",
  projectId: "servify-app-6a259",
  storageBucket: "servify-app-6a259.appspot.com",
  messagingSenderId: "108909445634",
  appId: "1:108909445634:web:43dce0c0ca05aeefa79d1b",
  measurementId: "G-PGFFXYSQ56",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export { db, auth, storage };
