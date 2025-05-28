// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBcMc0YY-WwRqVNbYaLc8087RohRe-1JVQ",
    authDomain: "tee-green-spa-d13d8.firebaseapp.com",
    projectId: "tee-green-spa-d13d8",
    storageBucket: "tee-green-spa-d13d8.appspot.com",
    messagingSenderId: "626364577015",
    appId: "1:626364577015:web:d8f38c463437dc50a24ff2",
    measurementId: "G-P7YGYXT0PX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

// Export the Firebase instances
export { app, analytics, db, auth }; 