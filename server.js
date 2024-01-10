// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
//const path = require('path');
const userRoutes = require('./routes/UserRoutes');

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/swethaproject', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('Error connecting to MongoDB', err));
    
app.use('/api', userRoutes);

app.listen(3000, () => {
    console.log(`Server running on port 3000`);
});
