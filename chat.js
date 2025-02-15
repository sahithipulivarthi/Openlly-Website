// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDK6SH0AHg91V6r32oJqND0HSwVVWJEFGo",
    authDomain: "openlly-chat.firebaseapp.com",
    projectId: "openlly-chat",
    storageBucket: "openlly-chat.appspot.com", // ✅ Fixed the incorrect URL
    messagingSenderId: "688100647446",
    appId: "1:688100647446:web:aa691dfc484ed712a2cb37",
    measurementId: "G-WCPHMVTJ17"
};

// ✅ Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ✅ Debugging: Check Firebase connection
console.log("Firebase initialized:", app.name);

// ✅ Test Firebase Firestore connection
db.collection("test").add({
    message: "Testing Firebase connection",
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
}).then(() => {
    console.log("✅ Firebase is working!");
}).catch(error => {
    console.error("❌ Firebase error:", error);
});

// ✅ Generate a random username for each session
if (!sessionStorage.getItem("username")) {
    const randomUsername = "User" + Math.floor(Math.random() * 10000);
    sessionStorage.setItem("username", randomUsername);
}
const username = sessionStorage.getItem("username");

// ✅ Function to send a message to Firestore
function sendMessage() {
    const messageInput = document.getElementById("messageInput");
    const messageText = messageInput.value.trim();
    const sendButton = document.getElementById("sendButton");

    if (messageText !== "") {
        // Change button appearance to indicate sending
        sendButton.style.backgroundColor = "#ccc";
        sendButton.innerText = "Sending...";

        db.collection("messages").add({
            username: username,
            text: messageText,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            messageInput.value = ""; // Clear input after sending
            messageInput.focus(); // Keep input active

            // Reset button appearance
            sendButton.style.backgroundColor = "#A7CDA0";
            sendButton.innerText = "Send";

            console.log("✅ Message sent:", messageText);
        })
        .catch(error => {
            console.error("❌ Error sending message:", error);
        });
    }
}

// ✅ Function to display messages in real-time
db.collection("messages").orderBy("timestamp").onSnapshot(snapshot => {
    let messagesHTML = "";
    snapshot.forEach(doc => {
        const data = doc.data();
        messagesHTML += `<p class="message"><strong>${data.username}:</strong> ${data.text}</p>`;
    });

    document.getElementById("messages").innerHTML = messagesHTML;

    // ✅ Debugging: Show message count
    console.log("✅ Loaded", snapshot.size, "messages");

    // Auto-scroll to the latest message
    document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;
});

// ✅ Enable 'Enter' key to send messages
document.getElementById("messageInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

// ✅ Attach sendMessage() to the send button
document.getElementById("sendButton").addEventListener("click", sendMessage);
