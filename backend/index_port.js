// app.js (or server.js)
const express = require('express');
const bodyParser = require('body-parser');
const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Update the route handlers to use the local IP address
app.post('/addUser', async (req, res) => {
  try {
    const { id, name } = req.body;
    const userRef = db.collection("Customers").doc(id);
    await userRef.set({ id, name });
    res.status(200).json({ message: 'User added successfully' });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: 'Error adding user' });
  }
});

app.post('/sendMessage', async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;
    const messageRef = db.collection("Messages").doc();
    await messageRef.set({ senderId, receiverId, message, timestamp: Date.now() });
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: 'Error sending message' });
  }
});

app.get('/getMessages', async (req, res) => {
  try {
    const userId = req.query.userId;
    const messagesSnapshot = await db.collection("Messages").where('receiverId', '==', userId).get();
    const messages = messagesSnapshot.docs.map(doc => doc.data());
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: 'Error fetching messages' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
