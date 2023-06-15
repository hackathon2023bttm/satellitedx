// const mongoose = require("mongoose");

// const uri = process.env.MONGODB_URI
// const options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

// if (!process.env.MONGODB_URI) {
//   throw new Error('Please add your Mongo URI to .env.local')
// }

// let client

// // if (process.env.NODE_ENV === 'development') {
// //   console.log('hasmongoclientprom', !!global._mongoClientPromise)
// //   if (!global._mongoClientPromise) {
// //     client = mongoose.connect(uri, options);
// //     global._mongoClientPromise = client.getClient();
// //   }
// // } else {
// //   client = mongoose.connect(uri, options);
// // }

// client = mongoose.connect(uri, options);
// module.exports = client;


import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
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
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default dbConnect
