// ✅ Wait until the document is loaded before using Firebase
document.addEventListener("DOMContentLoaded", function () {

    // ✅ Ensure Firebase is loaded before accessing it 
    if (typeof firebase === "undefined") {
        console.error("❌ Firebase is not loaded. Check your script paths in HTML.");
        return;
    }

    const db = firebase.firestore();

    console.log("✅ Firebase initialized:", firebase.app().name);

    // ✅ Test Firestore Connection
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

    // ✅ Function to send messages
    function sendMessage() {
        const messageInput = document.getElementById("messageInput");
        const messageText = messageInput.value.trim();
        const sendButton = document.getElementById("sendButton");

        if (messageText !== "") {
            sendButton.style.backgroundColor = "#ccc";
            sendButton.innerText = "Sending...";

            db.collection("messages").add({
                username: username,
                text: messageText,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                messageInput.value = ""; // Clear input
                messageInput.focus(); // Keep input active

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
        console.log("✅ Loaded", snapshot.size, "messages");
    });

    // ✅ Enable 'Enter' key to send messages
    document.getElementById("messageInput").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    // ✅ Attach sendMessage() to the send button
    document.getElementById("sendButton").addEventListener("click", sendMessage);

});
