// Server.js backend file
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

const mongoUrl = "mongodb+srv://AuraUserve:aura1234@cluster0.jqlyfp6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Update with your MongoDB connection string
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((e) => {
    console.log(e);
  });

const UserDetailSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    mobile: String,
    image: String, // Store only the image URI in the database
  },
  {
    collection: "UserInfo",
  }
);

mongoose.model("UserInfo", UserDetailSchema);

const User = mongoose.model("UserInfo");

app.get('/', (req, res) => {
  res.send({ status: "started" });
});

app.post("/register", upload.single('image'), async (req, res) => {
  const { name, email, mobile } = req.body;
  const image = req.file ? req.file.path : null;

  console.log(req.body);

  const oldUser = await User.findOne({ email: email });

  if (oldUser) {
    if (image) {
      fs.unlinkSync(image);
    }
    return res.send({ status: "error", data: "User already exists!!" });
  }

  try {
    await User.create({
      name: name,
      email: email,
      mobile,
      image
    });
    console.log("uploaded successfully!");
    res.send({ status: "ok", data: "User Created" });
  } catch (error) {
    if (image) {
      fs.unlinkSync(image);
    }
    console.log("Error uploading image:", error);
    res.send({ status: "error", data: error });
  }
});
// Add this route to your backend server.js file

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/latest-user', async (req, res) => {
  try {
    const latestUser = await User.findOne().sort({ _id: -1 }).limit(1);
    res.json(latestUser);
  } catch (error) {
    console.error('Error fetching latest user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(5001, () => {
  console.log('node js server started');
});
