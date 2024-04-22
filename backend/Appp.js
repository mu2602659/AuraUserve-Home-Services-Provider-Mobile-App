// Backend code
// Import necessary modules
const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// Create an Express app
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://AuraUserve:aura1234@cluster0.jqlyfp6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define a schema for the image model
const imageSchema = new mongoose.Schema({
  originalFilename: String,
  imageData: String, // Store image data as base64 string
  uploadedAt: {
    type: Date,
    default: Date.now,
  }
});

// Create a model based on the schema
const Image = mongoose.model('Image', imageSchema);

// Set up multer storage for uploading images
const storage = multer.memoryStorage(); // Store uploaded files in memory

// Initialize multer with storage options
const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Only image files are allowed!'));
    }
    cb(null, true);
  },
  // Rename the file to avatar1, avatar2, ...
  filename: function (req, file, cb) {
    const uniqueSuffix = uuidv4();
    cb(null, 'avatar' + uniqueSuffix);
  }
});

// Handle POST request to /profile for single image upload
app.post('/profile', upload.single('avatar'), async function (req, res) {
  const file = req.file;

  if (!file) {
    return res.status(400).send({ status: 'error', message: 'No file uploaded' });
  }

  try {
    // Convert image to base64
    const imageData = file.buffer.toString('base64');

    // Save the image data to the database
    const image = new Image({
      originalFilename: file.originalname,
      imageData: imageData,
    });
    await image.save();

    console.log('Image uploaded and saved to database:', image);

    res.status(200).send({ status: 'ok', message: 'File uploaded successfully', file: req.file });
  } catch (error) {
    console.error('Error saving image to database:', error);
    res.status(500).send({ status: 'error', message: 'Failed to upload file to database' });
  }
});

// Endpoint to fetch latest images
app.get('/latest-images', async function(req, res) {
  try {
    const latestImages = await Image.find().sort({ uploadedAt: -1 }).limit(5); // Fetch latest 5 images
    res.status(200).json(latestImages);
  } catch (error) {
    console.error('Error fetching latest images:', error);
    res.status(500).send({ status: 'error', message: 'Failed to fetch latest images from database' });
  }
});

// Endpoint to fetch all images
app.get('/all-images', async function(req, res) {
  try {
    const allImages = await Image.find();
    res.status(200).json(allImages);
  } catch (error) {
    console.error('Error fetching all images:', error);
    res.status(500).send({ status: 'error', message: 'Failed to fetch all images from database' });
  }
});

// Serve uploaded images
app.use('/uploads', express.static('uploads'));

// Start the server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
