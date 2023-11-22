const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);

import { Server, Socket } from "socket.io";

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

let usersInRoom: string[] = [];

const addUser = (socketId: string) => {
  !usersInRoom.some((id) => id === socketId) && usersInRoom.push(socketId);
};

const removeUser = (socketId: string) => {
  usersInRoom = usersInRoom.filter((id) => id !== socketId);
};

const getUser = (socketId: string) => {
  return usersInRoom.find((id) => id === socketId);
};

io.on("connection", (socket: Socket) => {
  console.log(`User ${socket.id} connected`);

  socket.on("chat-message", ({ author, text }) => {
    console.log("message: " + text);
    socket.broadcast.emit("chat-message", { author, text });
  });

  socket.on("join-room", ({ roomId, socketId }) => {
    console.log(`User ${socketId} joined room ${roomId}`);
    socket.join(roomId);
    io.to(roomId).emit("user-connected", { socketId, usersInRoom });
    addUser(socketId);
  });

  socket.on("get-users", ({ roomId, socketId }) => {
    socket.emit("get-users", { socketId, usersInRoom });
  });

  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected`);
    removeUser(socket.id);
  });
});

server.listen(3001, () => {
  console.log("listening on *:3001");
});
