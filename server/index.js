const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);

dotenv.config(); // Load environment variables from .env file

connectDB(); // Connect to the database

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));