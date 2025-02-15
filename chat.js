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
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Generate a random username (if not already set)
if (!sessionStorage.getItem("username")) {
    const randomUsername = "User" + Math.floor(Math.random() * 10000);
    sessionStorage.setItem("username", randomUsername);
}
const username = sessionStorage.getItem("username");


function sendMessage() {
    const messageInput = document.getElementById("messageInput");
    const messageText = messageInput.value.trim();

    if (messageText !== "") {
        db.collection("messages").add({
            username: username, // Include username
            text: messageText,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            messageInput.value = ""; // Clear input field after sending
        });
    }
}


db.collection("messages").orderBy("timestamp").onSnapshot(snapshot => {
    let messagesHTML = "";
    snapshot.forEach(doc => {
        const data = doc.data();
        messagesHTML += `<p><strong>${data.username}:</strong> ${data.text}</p>`;
    });
    document.getElementById("messages").innerHTML = messagesHTML;
});
