// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArFjkP-KLNwviUp1HCo9UCsEc5No4vLwQ",
  authDomain: "healthsync-212ad.firebaseapp.com",
  projectId: "healthsync-212ad",
  storageBucket: "healthsync-212ad.firebasestorage.app",
  messagingSenderId: "53539849388",
  appId: "1:53539849388:web:b4c969370a26bfc449cb09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export services so we can use them in other files
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;