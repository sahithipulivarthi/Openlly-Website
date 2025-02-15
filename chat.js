// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDK6SH0AHg91V6r32oJqND0HSwVVWJEFGo",
  authDomain: "openlly-chat.firebaseapp.com",
  projectId: "openlly-chat",
  storageBucket: "openlly-chat.firebasestorage.app",
  messagingSenderId: "688100647446",
  appId: "1:688100647446:web:aa691dfc484ed712a2cb37",
  measurementId: "G-WCPHMVTJ17"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
