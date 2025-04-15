import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRWvph0Ev1YQYZFR-A_l_vww51qPlpkq8",
  authDomain: "tranquilify-messaging.firebaseapp.com",
  databaseURL: "https://tranquilify-messaging-default-rtdb.firebaseio.com",
  projectId: "tranquilify-messaging",
  storageBucket: "tranquilify-messaging.firebasestorage.app",
  messagingSenderId: "675653503137",
  appId: "1:675653503137:web:7c86d2d5411c093e3a08e0",
  measurementId: "G-7JXE7J3BWE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Optional: Initialize Analytics (only works on web)
//const analytics = getAnalytics(app);

// Initialize other services as needed
const database = getDatabase(app);
const auth = getAuth(app);

export { app, database, auth };