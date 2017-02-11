var express=require('express')
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var chatHistory =[];
var chunk =5;

app.get('/', function(req, res){
  res.sendFile( path.join(__dirname,'/public','/index.html') );
});

app.use( express.static('public') );

io.on('connection', function(socket){
  console.log('a user connected');
  if(chatHistory.length > chunk){
  	var slicedArray = fruits.slice(chatHistory.length-chunk, chatHistory.length);
  	for(var i=0;i<slicedArray.length;i++){
  		socket.emit( "chat message from server", slicedArray[i] );
  	}
  }else{
	for(var i=0;i<chatHistory.length;i++){
  		socket.emit( "chat message from server", chatHistory[i] );
  	}
  }
  socket.on('chat message from client', function(data){
    console.log('message: ' + JSON.stringify( data ) );
    chatHistory.push(data);
    socket.broadcast.emit( "chat message from server", data );
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});