
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCJ9mSkFK08vrtoXKUnjIOFIolN2qXEtug",
  authDomain: "bangla-shop-3f8a6.firebaseapp.com",
  databaseURL: "https://bangla-shop-3f8a6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "bangla-shop-3f8a6",
  storageBucket: "bangla-shop-3f8a6.appspot.com", // Corrected storageBucket URL
  messagingSenderId: "1073532824559",
  appId: "1:1073532824559:web:10b38242196a5a3597241a",
  measurementId: "G-WDGKSTSLVH"
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // Initialize storage with the corrected config

export { app, auth, db, storage };
