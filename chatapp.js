const express = require("express");
const app = express();
const http = require("http").Server(app);
// const path=require('path');
const port = process.env.PORT || 8000;
const io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/chatapp.html");
});

http.listen(port, function () {
  console.log("started");
});

io.on("connection", (socket) => {
  console.log("user connected.." + socket.id);

  socket.on("message", (data) => {
    socket.broadcast.emit("message", data);
  });
});
