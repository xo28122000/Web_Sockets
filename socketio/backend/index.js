const express = require("express");
const app = express();
const port = 4000;

const maxUsers = 5;

const users = [];
const emptyList = [0, 1, 2, 3, 4];
const enterQueue = [];

messages = [];

app.get("/addUser", (req, res) => {
  if (!req.name) {
    res.send({ success: false });
  }
  if (users.length >= maxUsers) {
    enterQueue.push(req.name);
    res.send({ success: true, wait: true, id: -1 });
  }
  var id = emptyList.pop();
  users[id] = req.name;
  res.send({ success: true, wait: true, id: id });
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
