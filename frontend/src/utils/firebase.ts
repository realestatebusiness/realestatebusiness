//src/utils/firebase.ts
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB7sc4GX9QTytrO83Ye1knJaTLrd3UUwRo",
  authDomain: "realestatebusiness-2bd31.firebaseapp.com",
  projectId: "realestatebusiness-2bd31",
  storageBucket: "realestatebusiness-2bd31.firebasestorage.app",
  messagingSenderId: "395220333308",
  appId: "1:395220333308:web:4a64b514b7087288959d79",
  measurementId: "G-QTW3Q1566L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); 
export { app, analytics, auth };