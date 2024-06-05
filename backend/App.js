const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

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
  imageData: String,
  description: String,
  service: String,
  title: String,
  price: Number,
  address: String,
  uploadedAt: {
    type: Date,
    default: Date.now,
  }
});
const PostImage = mongoose.model('PostImage', postImageSchema);
const postImageStorage = multer.memoryStorage();

const uploadPostImage = multer({ 
  storage: postImageStorage,
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Only image files are allowed!'));
    }
    cb(null, true);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = uuidv4();
    cb(null, 'avatar' + uniqueSuffix);
  }
});

// Schema for profile images
const ProfileImageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageData: { type: String, required: true },
});
const ProfileImage = mongoose.model('ProfileImage', ProfileImageSchema);
const profileImageStorage = multer.memoryStorage();
const uploadProfileImage = multer({ 
  storage: profileImageStorage,
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Only image files are allowed!'));
    }
    cb(null, true);
  },
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

const ProviderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageData: { type: String, required: true },
});
const Provider = mongoose.model('Provider', ProviderSchema);

app.get('/providers', async (req, res) => {
  try {
    const providers = await Provider.find();
    res.status(200).send(providers);
  } catch (error) {
    console.error('Error fetching providers:', error);
    res.status(500).send({ message: 'Failed to fetch providers.' });
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


const bookingSchema = new mongoose.Schema({
  serviceName: String,
  fullName: String,
  email: String,
  phone: String,
  serviceTime: Date,
  serviceDate: Date,
  location: {
    type: { type: String },
    coordinates: [Number]
  },
  address: String,
  workDescription: String,
  providerName: String,
  status: { type: String, default: 'pending' },
  rejectionReason: String,
  contactNumber: String,
  rating: Number,
  comment: String,
  userName: String,
});

const Booking = mongoose.model('Booking', bookingSchema);


// Fetch all bookings
app.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).send('Server error');
  }
});

// Create a new booking
app.post('/bookings', async (req, res) => {
  try {
    const { serviceName, fullName, email, phone, serviceTime, serviceDate, location, workDescription, providerName, contactNumber } = req.body;
    const newBooking = new Booking({
      serviceName,
      fullName,
      email,
      phone,
      serviceTime,
      serviceDate,
      location,
      workDescription,
      providerName,
      contactNumber,
    });
    await newBooking.save();
    console.log('Booking created:', newBooking);
    res.status(201).send(newBooking);
  } catch (error) {
    console.error('Error submitting booking:', error);
    res.status(400).send({ message: 'Failed to submit booking. Please try again later.', error });
  }
});


// Update booking status
app.patch('/bookings/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(id, { status }, { new: true });

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    console.log('Booking status updated:', booking);
    res.status(200).json(booking);
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ error: 'Failed to update booking status' });
  }
});

// Accept a booking
app.put('/bookings/:id/accept', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status: 'accepted' }, { new: true });
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    console.log('Booking accepted:', booking);
    res.json(booking);
  } catch (err) {
    console.error('Error accepting booking:', err);
    res.status(500).json({ error: 'Failed to accept booking' });
  }
});

// Reject a booking
app.put('/bookings/:id/reject', async (req, res) => {
  const { rejectionReason, contactNumber } = req.body;
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, 
      { 
        status: 'rejected', 
        rejectionReason, 
        contactNumber 
      }, 
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    console.log('Booking rejected:', booking);
    res.json(booking);
  } catch (err) {
    console.error('Error rejecting booking:', err);
    res.status(500).json({ error: 'Failed to reject booking' });
  }
});
// Submit rating and comment
app.put('/bookings/:id/rate', async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment, userName } = req.body;
    const booking = await Booking.findByIdAndUpdate(id, { rating, comment, userName }, { new: true });

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    console.log('Rating submitted:', booking);
    res.status(200).json(booking);
  } catch (error) {
    console.error('Error submitting rating:', error);
    res.status(500).json({ error: 'Failed to submit rating' });
  }
});

// Fetch ratings and comments
app.get('/bookings/ratings', async (req, res) => {
  try {
    const ratings = await Booking.find({ rating: { $ne: null } });
    res.status(200).json(ratings);
  } catch (error) {
    console.error('Error fetching ratings:', error);
    res.status(500).json({ error: 'Failed to fetch ratings' });
  }
});
///////////////////////////////




















// Serve uploaded images
app.use('/uploads', express.static('uploads'));

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
