var admin = require("firebase-admin");

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
})
