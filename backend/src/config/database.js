import mongoose from 'mongoose';
import dotenv from 'dotenv-flow';

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  console.error('❌ ERROR: MONGO_URL is not defined in environment variables');
  process.exit(1);
}

/**
 * Connect to MongoDB database
 */
export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

/**
 * Disconnect from MongoDB database
 */
export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('✅ MongoDB disconnected successfully');
  } catch (error) {
    console.error('❌ MongoDB disconnection error:', error.message);
  }
};

export default { connectDB, disconnectDB };
