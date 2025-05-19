const mongoose = require('mongoose');

// Set strictQuery before connecting
mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB with URI:', process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;