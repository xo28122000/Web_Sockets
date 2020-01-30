var express = require("express");
var app = express();
var http = require("http").createServer(app);

var io = require("socket.io")(http);

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/");
});

app.use(express.static("public"));

io.on("connection", function(socket) {
  // when user is connected
  io.emit("user joined", "a new user just joined");
  console.log("user connected");

  // when user is disconnected
  socket.on("disconnect", function() {
    console.log("user disconnected");
  });

  // events emitted from the front end are recorded like this
  //   when "chat message" event is triggered from the front end

  socket.on("chat message", function(msg) {
    console.log("message: " + msg);
    // emit helps to send the json data back to all sockets
    io.emit("chat message", msg);
  });
});

http.listen(3000, function() {
  console.log("listening on *:3000");
});
