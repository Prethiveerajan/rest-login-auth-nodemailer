require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routes'); // Ensure the path to your routes file is correct
const app = express();
const PORT = process.env.PORT || 8080; 

// Middleware
app.use(express.json());
app.use(cors()); 

// Connect to MongoDB
mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error("Database Connection error", error);
    });

// Define routes
app.use('/api', router); 

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
