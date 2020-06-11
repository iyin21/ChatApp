var express= require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);
var usernames = {};

server.listen(process.env.port || 5000, function(){
	console.log("App running");
});

app.get("/", function(req, res){
	res.sendFile(__dirname + "/index.html");
});

io.sockets.on("connection", function(socket){
	socket.on("new user", function(userInput){
		socket.emit("user-message", userInput);
		usernames[socket.id] = userInput
		socket.broadcast.emit("connectUser", userInput);
	// 	// if(usernames.indexOf(data) != -1){
	// 	// 	callback(false);
	// 	// }else{
	// 	// 	callback(true);
	// 	// 	socket.username = data;
	// 	// 	usernames.push(socket.username);
	// 	// 	updateUsernames();
	// 	// }

	});
	//update usernames
	// function updateUsernames(){
	// 	io.sockets.emit("usernames", usernames);
	// }
	//send message	
	socket.on("send message", function(messageInput){
		//console.log(messageInput);
		socket.broadcast.emit("new message", {messageInput:messageInput, user:usernames[socket.id]});
	});
	//Disconnect
	socket.on("disconnect", function(){
		socket.broadcast.emit("disconnectUser", usernames[socket.id])
		delete usernames[socket.id]
		// if(!socket.username) return;
		// usernames.splice(usernames.indexOf(socket.username), 1);
		// updateUsernames();
	});
});