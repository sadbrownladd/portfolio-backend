const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const educationRoutes = require('./routes/educationRoutes');
const skillRoutes = require('./routes/skillRoutes');
const projectRoutes = require('./routes/projectRoutes');
const experienceRoutes = require('./routes/experienceRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

require('dotenv').config();

// Log every incoming request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.use('/api/education', educationRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/contact', contactRoutes);

const PORT = process.env.PORT || 5000;

const connectDB = require('./config/db');
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});