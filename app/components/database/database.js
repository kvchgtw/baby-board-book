// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-babyboardbook.firebaseapp.com",
  projectId: "ai-babyboardbook",
  storageBucket: "ai-babyboardbook.appspot.com",
  messagingSenderId: "11412855467",
  appId: "1:11412855467:web:606f63f187da8a043c75ee",
  measurementId: "G-GPTM1MLPNH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;