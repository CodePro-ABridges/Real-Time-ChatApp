import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import authRoutes from "./utils/auth.js"; // Adjust the path as necessary
import messageRoutes from "./utils/messages.js"; // Adjust the path as necessary

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Async function to connect to the database and start the server
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to chatDB");

    app.use("/api/auth", authRoutes);
    app.use("/api/messages", messageRoutes);

    const httpServer = createServer(app);
    const io = new Server(httpServer, {
      cors: {
        origin: "http://localhost:3000",
        credentials: true,
      },
    });

    global.onlineUsers = new Map();
    io.on("connection", (socket) => {
      console.log("A user connected");
      socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
      });

      socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
          socket.to(sendUserSocket).emit("msg-receive", data.msg);
        }
      });
    });

    httpServer.listen(process.env.PORT, () =>
      console.log(`Server on ${process.env.PORT}`),
    );
  } catch (err) {
    console.error("Database connection failed", err.message);
  }
};

startServer();
