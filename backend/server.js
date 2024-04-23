const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/home_services', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Schema for Ad
const adSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String
});
const Ad = mongoose.model('Ad', adSchema);

const app = express();

app.use(bodyParser.json());

// Route for posting an ad
app.post('/ads', async (req, res) => {
    try {
        const { title, description, category } = req.body;
        const ad = new Ad({ title, description, category });
        await ad.save();
        res.status(201).json({ message: 'Ad posted successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
