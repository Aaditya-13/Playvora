import mongoose from "mongoose";
import env from "../config/env.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(env.MONGODB_URI);

        console.log(
            `✅ MongoDB Connected: ${connectionInstance.connection.host}`
        );
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error.message);

        process.exit(1);
    }
};

export default connectDB;