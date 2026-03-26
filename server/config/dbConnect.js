import mongoose from "mongoose";

let isConnected = false;
const dbConnect = async () => {
  if (isConnected) return console.log("database connected succesfully.");
  try {
    const db = await mongoose.connect(process.env.MONGODB_ATLAS_URL, {
      dbName: "QuoBlog",
    });
    isConnected = db.connection.readyState;
    console.log("Database connected succesfully.");
  } catch (error) {
    console.log("MongoDB Conection error", error);
  }
};

export default dbConnect;
