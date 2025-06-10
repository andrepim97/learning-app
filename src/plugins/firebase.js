// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDQmZyjR9X0cATccQ4L62VIMkwFfUR78qI",
    authDomain: "erdna-vue.firebaseapp.com",
    projectId: "erdna-vue",
    storageBucket: "erdna-vue.firebasestorage.app",
    messagingSenderId: "791732951112",
    appId: "1:791732951112:web:0b8ae5288903747fcee07d",
    measurementId: "G-77DGFCP466"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth }