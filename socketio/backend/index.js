const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const port = process.env.PORT || 4000;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", socket => {
  console.log("New client connected");

  socket.on("incoming data", data => {
    socket.broadcast.emit("outgoing data", { num: data });
  });

  socket.on("disconnect", () => console.log("Client disconnected"));
});

server.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
