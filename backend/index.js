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













/*var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// add the users
const batch = db.batch();

const coustomer3 = db.collection("Coustomers").doc("3")
const coustomer4 = db.collection("Coustomers").doc("4")

batch.set(coustomer3, { id : "3" , name : "uzair"});
batch.set(coustomer4, { id : "4" , name : "arsalan"});
batch.set(coustomer4, { id : "466" , name : "aran"});
batch.commit().then(res => {
  console.log("Data added successfully!");
});

// delete specify user with id
db.collection( "Coustomers").doc('2').delete().then(res => {
  console.log(`Document with ID of '2' deleted.`);
})

//read or get all the data from firestore
let coustomerRef = db.collection('Coustomers');

coustomerRef.get().then((querySnapshot) => {
  querySnapshot.forEach(document => {
    console.log(document.data());
  })
})

//get a speciify user id
db.collection( "Coustomers").doc('1').get().then(doc => {
  console.log(doc.data());
})

// listen for  real time update
db.collection( "Coustomers").doc('1').onSnapshot(docSnapshot => {
  console.log(docSnapshot.data());
})*/