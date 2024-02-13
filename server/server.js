import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
// import db from "./config/connection.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to chatDB");
  } catch (err) {
    console.error(err.message);
  }
}

connectToDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server start on ${process.env.PORT}`);
});
