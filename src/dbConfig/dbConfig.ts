import mongoose from "mongoose";

let isConnected = false; // Track the connection status

export async function connect() {
  try {
    if (isConnected) {
      console.log("⚡ Already connected to MongoDB");
      return;
    }

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI!, {
      dbName: process.env.DB_NAME, // Ensure the correct database is used
    });

    // Get the connection instance
    const connection = mongoose.connection;

    // Set the connection status flag
    connection.on("connected", () => {
      isConnected = true;
      console.log("✅ Connected to MongoDB");
    });

    // Handle errors
    connection.on("error", (err) => {
      console.log("❌ MongoDB connection error:", err);
      process.exit(1); // Exit process on error
    });

    // Ensure proper shutdown
    connection.on("disconnected", () => {
      console.log("MongoDB connection lost");
      isConnected = false;
    });
  } catch (error) {
    console.log("❌ Something went wrong during the MongoDB connection");
    console.error(error);
    process.exit(1); // Exit process on failure
  }
}
