import mongoose from "mongoose";

export default async function connectDB() {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected to database: ${conn.connection.name}`)
    } catch (err) {
        console.log(`Error on DB connection attempt ${err}`)
        process.exit(1)
    }
}