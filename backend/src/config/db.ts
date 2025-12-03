import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  const MONGO_URI = process.env.MONGO_URI;

  if (!MONGO_URI) {
    throw new Error("❌MONGO_URI is not defined in environment variables.");
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log("🚀 MongoDB connection established successfully.");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
    throw error;
  }
};
