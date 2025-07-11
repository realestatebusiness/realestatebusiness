import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, connectAuthEmulator } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB7sc4GX9QTytrO83Ye1knJaTLrd3UUwRo",
  authDomain: "realestatebusiness-2bd31.firebaseapp.com",
  projectId: "realestatebusiness-2bd31",
  storageBucket: "realestatebusiness-2bd31.appspot.com",
  messagingSenderId: "395220333308",
  appId: "1:395220333308:web:4a64b514b7087288959d79",
  measurementId: "G-QTW3Q1566L"
};

const app = initializeApp(firebaseConfig);

let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

const auth = getAuth(app);

// Development configuration for phone auth
if (process.env.NODE_ENV === 'development') {
  // Optional: Connect to Auth emulator for local development
  // Uncomment the line below if you want to use Firebase emulator
  // connectAuthEmulator(auth, 'http://localhost:9099');
  
  console.log('🔥 Firebase: Development mode enabled');
  console.log('📱 Phone Auth: Use mock implementation or configure test numbers');
}

export { app, analytics, auth };