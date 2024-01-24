// Maintain cached connection with vercel

import mongoose from 'mongoose'

const MONGODB_URL = `${process.env.MONGODB_URL}${process.env.DATABASE_DEV}`

if (!MONGODB_URL) {
  throw new Error(
    'Please define the MONGODB_URL environment variable inside .env.local'
  )
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */

//@ts-ignore
let cached = global.mongoose

if (!cached) {
  //@ts-ignore
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

    cached.promise = mongoose.connect(MONGODB_URL!, opts).then((mongoose) => {
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
