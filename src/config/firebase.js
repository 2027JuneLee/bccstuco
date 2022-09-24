// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCN6M5Jg_MS7BtsvKjoCBeU7FnCjAuJRSg",
  authDomain: "bcc-stuco.firebaseapp.com",
  projectId: "bcc-stuco",
  storageBucket: "bcc-stuco.appspot.com",
  messagingSenderId: "549520775356",
  appId: "1:549520775356:web:f351df273ae85a2f1518b9",
  measurementId: "G-DHG0FC6NPR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);