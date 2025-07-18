// config/config.ts

import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

const JWT_SECRET = process.env.JWT_SECRET || 'defaultSecret'; // Fallback if .env is missing

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export { connectDB, JWT_SECRET };
