var express = require('express');
var app= express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var io = require('socket.io')(server);
//var io = require('socket.io').listen(app.listen(port));
var port=3700;
server.listen(port);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.on('chatevent', function (data) {
    console.log(data);
    io.emit('chatevent',data);
  });
});