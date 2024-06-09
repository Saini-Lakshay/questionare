import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection?.isConnected) {
    console.log("Already connected to db");
    Promise.resolve(true);
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGO_URI || "", {});
    connection.isConnected = db.connections[0].readyState;
    console.log("DB connected successfully!");
    Promise.resolve(true);
  } catch (err) {
    console.log("DB connection failed!", err);
    process.exit(1);
    // Promise.reject(false)
  }
}

export default dbConnect;
