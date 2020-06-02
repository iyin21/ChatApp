var express= require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);

server.listen(process.env.port || 5000, function(){
	console.log("App running");
});

app.get("/", function(req, res){
	res.sendFile(__dirname + "/index.html");
});

io.sockets.on("connection", function(socket){
	//send message
	socket.on("send message", function(data){
		io.sockets.emit("new message",{msg:data});
	});
});