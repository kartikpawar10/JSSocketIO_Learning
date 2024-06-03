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
  socket.emit("msg", "RM WON!!");
});

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
