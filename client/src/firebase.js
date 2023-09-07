// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIRE_BASE_API_KEY,
  authDomain: "league-statistics-tracker.firebaseapp.com",
  projectId: "league-statistics-tracker",
  storageBucket: "league-statistics-tracker.appspot.com",
  messagingSenderId: "900408690045",
  appId: "1:900408690045:web:ff0c263bc5356b7bf93814",
  measurementId: "G-33H0LNTJKT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);