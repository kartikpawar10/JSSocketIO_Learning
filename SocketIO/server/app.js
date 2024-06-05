import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import { log } from "console";
const app = express();
const server = new createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
const PORT = 3000;
app.get("/", (req, res) => {
  res.send("Hello JS");
});

io.on("connection", (socket) => {
  console.log("User Connected", socket.id);

  /* # MOSTLY emit is done by frontend 
   # We apply the emit in server but we trigger it from frontend*/
  socket.broadcast.emit("msg", ` ${socket.id} has joined Beehive `);
  socket.emit("msg", `Welcome ${socket.id} in beehive`);
  socket.on("message", ({ socketID, message }) => {
    console.log(message);
    if (socketID) {
      io.to(socketID).emit("recieve-message", `${socket.id} ::> ${message}`);
    } else {
      socket.broadcast.emit("recieve-message", `${socket.id} ::> ${message}`);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
