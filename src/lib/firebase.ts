import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCbotlNhilPElmdPs_UUKfIwJLipHdzPzY",
  authDomain: "bazar-bangla-kdllz.firebaseapp.com",
  databaseURL: "https://bazar-bangla-kdllz-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "bazar-bangla-kdllz",
  storageBucket: "bazar-bangla-kdllz.appspot.com", // Corrected from 'firebasestorage.app' if it was a typo
  messagingSenderId: "689762581635",
  appId: "1:689762581635:web:f06f5e43d34df83f23afb6"
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
