var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

app.get('/', function(req, res){
  res.sendFile( path.join(__dirname,'/public','/index.html') );
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('chat message from client', function(data){
    console.log('message: ' + JSON.stringify( data ) );
    socket.broadcast.emit( "chat message from server", data );
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});