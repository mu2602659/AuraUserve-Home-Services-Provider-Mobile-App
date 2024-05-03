// Backend code
const express = require('express');
const multer = require('multer');
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

// Schema for post images
const postImageSchema = new mongoose.Schema({
  originalFilename: String,
  imageData: String, // Store image data as base64 string
  description: String, // Add field for image description
  service: String, // Add field for service name
  title: String, // Add field for title
  price: Number, // Add field for price
  address: String, // Add field for address
  uploadedAt: {
    type: Date,
    default: Date.now,
  }
});


const PostImage = mongoose.model('PostImage', postImageSchema);
const postImageStorage = multer.memoryStorage(); // Store uploaded files in memory

const uploadPostImage = multer({ 
  storage: postImageStorage,
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

// Schema for profile images
const profileImageSchema = new mongoose.Schema({
  name: String,
  imageData: String,
});
const ProfileImage = mongoose.model('ProfileImage', profileImageSchema);
const profileImageStorage = multer.memoryStorage(); // Store uploaded files in memory
const uploadProfileImage = multer({ 
  storage: profileImageStorage,
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


// Endpoint to upload profile images
app.post('/profile-image', uploadProfileImage.single('avatar'), async function (req, res) {
  const file = req.file;

  if (!file) {
    return res.status(400).send({ status: 'error', message: 'No file uploaded' });
  }

  try {
    // Convert image to base64
    const imageData = file.buffer.toString('base64');

    // Save the profile image data to the database
    const profileImage = new ProfileImage({
      name: req.body.name,
      imageData: imageData,
    });
    await profileImage.save();

    console.log('Profile image uploaded and saved to database:', profileImage);

    res.status(200).send({ status: 'ok', message: 'Profile image uploaded successfully' });
  } catch (error) {
    console.error('Error saving profile image to database:', error);
    res.status(500).send({ status: 'error', message: 'Failed to upload profile image to database' });
  }
});


// Endpoint to upload post images
app.post('/post-image', uploadPostImage.single('avatar'), async function (req, res) {
  const file = req.file;
  if (!file) {
    return res.status(400).send({ status: 'error', message: 'No file uploaded' });
  }
  try {
    // Convert image to base64
    const imageData = file.buffer.toString('base64');
    // Check if the post already exists
    const existingPost = await PostImage.findOne({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      address: req.body.address,
      service: req.body.service
    });
    if (existingPost) {
      return res.status(400).send({ status: 'error', message: 'Duplicate post' });
    }
     // Save the image data to the database
     const postImage = new PostImage({
      originalFilename: file.originalname,
      imageData: imageData,
      description: req.body.description,
      title: req.body.title,
      price: req.body.price,
      address: req.body.address,
      service: req.body.service
    });
    await postImage.save();

    console.log('Post image uploaded and saved to database:', postImage);

    res.status(200).send({ status: 'ok', message: 'File uploaded successfully', file: req.file });
  } catch (error) {
    console.error('Error saving image to database:', error);
    res.status(500).send({ status: 'error', message: 'Failed to upload file to database' });
  }
});

// Endpoint to fetch post images
app.get('/post-images', async function(req, res) {
  try {
    let query = {};
    if(req.query.service) {
      query.service = req.query.service; // Filter by service name if provided
    }
    const postImages = await PostImage.find(query);
    res.status(200).json(postImages);
  } catch (error) {
    console.error('Error fetching post images:', error);
    res.status(500).send({ status: 'error', message: 'Failed to fetch post images from database' });
  }
});



// Endpoint to fetch profile images
app.get('/profile-images', async function(req, res) {
  try {
    const profileImages = await ProfileImage.find();
    res.status(200).json(profileImages);
  } catch (error) {
    console.error('Error fetching profile images:', error);
    res.status(500).send({ status: 'error', message: 'Failed to fetch profile images from database' });
  }
});

// Endpoint to fetch post images
app.get('/post-images', async function(req, res) {
  try {
    const postImages = await PostImage.find();
    res.status(200).json(postImages);
  } catch (error) {
    console.error('Error fetching post images:', error);
    res.status(500).send({ status: 'error', message: 'Failed to fetch post images from database' });
  }
});

// Endpoint to delete profile images
app.delete('/profile-image/:id', async function(req, res) {
  const imageId = req.params.id;

  try {
    const deletedProfileImage = await ProfileImage.findByIdAndDelete(imageId);
    if (!deletedProfileImage) {
      return res.status(404).send({ status: 'error', message: 'Profile image not found' });
    }
    console.log('Profile image deleted successfully:', deletedProfileImage);
    res.status(200).send({ status: 'ok', message: 'Profile image deleted successfully' });
  } catch (error) {
    console.error('Error deleting profile image:', error);
    res.status(500).send({ status: 'error', message: 'Failed to delete profile image' });
  }
});

// Endpoint to delete post images
app.delete('/post-image/:id', async function(req, res) {
  const postId = req.params.id;
  try {
    const deletedPostImage = await PostImage.findByIdAndDelete(postId);
    if (!deletedPostImage) {
      return res.status(404).send({ status: 'error', message: 'Post not found' });
    }
    console.log('Post deleted successfully:', deletedPostImage);
    res.status(200).send({ status: 'ok', message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).send({ status: 'error', message: 'Failed to delete post' });
  }
});

// Endpoint to fetch latest profile image
app.get('/latest-profile-image', async function(req, res) {
  try {
    const latestProfileImage = await ProfileImage.findOne().sort({ uploadedAt: -1 }).limit(1);
    res.status(200).json(latestProfileImage);
  } catch (error) {
    console.error('Error fetching latest profile image:', error);
    res.status(500).send({ status: 'error', message: 'Failed to fetch latest profile image from database' });
  }
});

// Serve uploaded images
app.use('/uploads', express.static('uploads'));

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
