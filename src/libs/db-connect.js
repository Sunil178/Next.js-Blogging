import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
    console.error('Please define the MONGODB_URI environment variable inside .env')
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
    if (cached.conn) {
        console.log('Using cached DB connection');
        return cached.conn
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        }
        cached.promise = mongoose.connect(MONGODB_URI, opts).then(mongoose => {
            console.log('New MongoDB connection established');
            return mongoose
        })
    }
    cached.conn = await cached.promise
    return cached.conn
}

export default dbConnect
