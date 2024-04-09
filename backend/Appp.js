const express = require('express');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

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
  uniqueFilename: String,
  path: String,
  uploadedAt: {
    type: Date,
    default: Date.now,
  }
});

// Create a model based on the schema
const Image = mongoose.model('Image', imageSchema);

// Set up multer storage for uploading images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = uuidv4();
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

// Initialize multer with storage options
const upload = multer({ storage: storage });

// Handle POST request to /profile for single image upload
app.post('/profile', upload.single('avatar'), async function (req, res) {
  const file = req.file;

  if (!file) {
    return res.status(400).send({ status: 'error', message: 'No file uploaded' });
  }

  try {
    let originalFilename = file.originalname;

    // Check if the original filename already exists in the database
    const existingImage = await Image.findOne({ originalFilename });

    // If an image with the same original filename exists, generate a new filename
    if (existingImage) {
      let count = 1;
      let newFilename;
      do {
        count++;
        newFilename = `${path.parse(originalFilename).name} ${count}${path.extname(originalFilename)}`;
      } while (await Image.findOne({ originalFilename: newFilename }));
      
      originalFilename = newFilename;
    }

    // Save the image metadata to the database
    const image = new Image({
      originalFilename,
      uniqueFilename: `${uuidv4()}-${originalFilename}`,
      path: file.path,
    });
    await image.save();

    console.log('Image uploaded and saved to database:', image);

    res.status(200).send({ status: 'ok', message: 'File uploaded successfully', file: req.file });
  } catch (error) {
    console.error('Error saving image to database:', error);
    res.status(500).send({ status: 'error', message: 'Failed to upload file to database' });
  }
});

// Endpoint to fetch images
app.get('/images', async function(req, res) {
  try {
    const images = await Image.find();
    res.status(200).json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).send({ status: 'error', message: 'Failed to fetch images from database' });
  }
});

// Serve uploaded images
app.use('/uploads', express.static('uploads'));

// Start the server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
