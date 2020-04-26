const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const port = process.env.PORT || 4000;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// database //

var users = 0;

var messagePool = [];

// ------- //

app.route("/login", (req, res) => {
  var id = 0;
  if (availableActiveSpots.length > 0) {
    id = availableActiveSpots.pop();
    console.log("id of next active user: ", id);
    res.send({ id: id, isActive: true, isWaiting: false });
  } else if (availableWaitSpots.length > 0) {
    id = availableWaitSpots.pop();
    console.log("id of wait next user: ", id);
    res.send({ id: id, isActive: true, isWaiting: false });
  } else {
    res.send({ isActive: false, isWaiting: false, id: null });
  }
});

var id = 0;
var numUsers = 0;

io.on("connection", socket => {
  var addedUser = false;

  socket.on("new user", username => {
    if (addedUser) return;

    socket.username = username;
    socket.id = id;
    id += 1;
    ++numUsers;
    addedUser = true;
    socket.emit("numUsers", {
      numUsers: numUsers
    });

    socket.broadcast.emit("new user", {
      username: socket.username
    });
    //
    // socket.broadcast.emit - emits it to everyone,
    // socket.emit - emits only to the user who send the request
    //

    //
    // socket.broadcast.emit("new user", {
    //   username: socket.username
    // });
    //
  });

  socket.on("message", message => {
    socket.broadcast.emit("message", {
      body: message,
      senderId: socket.id,
      senderUsername: socket.username
    });
  });

  socket.on("disconnect", () => {
    if (addedUser) {
      --numUsers;

      socket.broadcast.emit("numUsers", {
        numUsers: numUsers
      });
      socket.broadcast.emit("user left", {
        username: socket.username
      });
    }
  });
});

server.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
