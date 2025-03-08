// client/src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Add Storage import

// Log environment variables for debugging
console.log("API Key:", import.meta.env.VITE_FIREBASE_API_KEY);
console.log("Project ID:", import.meta.env.VITE_FIREBASE_PROJECT_ID);
console.log("App ID:", import.meta.env.VITE_FIREBASE_APP_ID);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCnE8oEYM1OIBgCR1JbWyYjlfm_DbEsA2Q",
  authDomain: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com` || "blog-07-9c422.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "blog-07-9c422",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "blog-07-9c422.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "356678865577",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:356678865577:web:f5bc713606152e14e80fb8",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app); // Export Storage