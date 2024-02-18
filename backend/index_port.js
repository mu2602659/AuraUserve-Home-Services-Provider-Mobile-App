const http = require('http');
const admin = require("firebase-admin");

// Initialize Firebase Admin SDK with your service account key
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Function to add a user to Firestore
const addUserToFirestore = async (id, name) => {
  try {
    const userRef = db.collection("Coustomers").doc(id);
    await userRef.set({ id, name });
    console.log("User added successfully!");
  } catch (error) {
    console.error("Error adding user:", error);
  }
};

// Create an HTTP server
const PORT = 3000;
const server = http.createServer((req, res) => {
  // Handle incoming requests
  if (req.method === 'POST' && req.url === '/addUser') {
    let data = '';
    req.on('data', chunk => {
      data += chunk;
    });
    req.on('end', () => {
      const { id, name } = JSON.parse(data);
      addUserToFirestore(id, name);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: 'User added successfully' }));
    });
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
