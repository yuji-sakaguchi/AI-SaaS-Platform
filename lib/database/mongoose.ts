import mongoose, { Mongoose } from 'mongoose';

// Define the MongoDB URL using environment variables
const MONGODB_URL = process.env.MONGODB_URL;

// Define the structure of the MongooseConnection interface
interface MongooseConnection {
    conn: Mongoose | null; // Mongoose connection or null if not initialized
    promise: Promise<Mongoose> | null;
}

// Next.js runs serverless so each request is handled independetly allowing for better scalability and reliability
// No need to manage persistent connections between many instances

// Global variable to cache the Mongoose connection and promise
let cached: MongooseConnection = (global as any).mongoose 
if (!cached) { // If the Mongoose connection is not cached, initialize it
    cached = (global as any).mongoose = {
        conn: null, promise: null
    }
}

// Function to connect to the MongoDB database
export const connectToDatabase = async () => {
    if (cached.conn) return cached.conn;
    if (!MONGODB_URL) throw new Error("Missing MONGODB_URL");
    cached.promise = cached.promise || mongoose.connect(MONGODB_URL, { dbName: "imaginify", bufferCommands: false })
    cached.conn = await cached.promise; // Wait for the Mongoose connection promise to resolve and set the connection
    return cached.conn;
}