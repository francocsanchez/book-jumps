import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.DATABASE_URL || "");
    const url = `${connection.connection.host}:${connection.connection.port}`;
    console.log(`🧠 MongoDB conectado correctamente → URL: ${url}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
