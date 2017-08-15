var fs = require('fs');
var express = require('express');
var https = require('https');

var app = express();

var sslOption = {
		key: fs.readFileSync('./ssl/stg-node.nativecamp.net.nopass.key'),
		cert: fs.readFileSync('./ssl/stg-node.nativecamp.net.crt'),
		ca: fs.readFileSync('./ssl/stg-node.nativecamp.net.ca.crt')
	};
var port = 3000;
var socketConfig = {
	'origins': "",
	'pingTimeout': 40000,
	'pingInterval': 10000,
};

var server = https.createServer(sslOption, app);

var io = require("socket.io").listen(server, socketConfig);

// server is up
server.listen(port, "0.0.0.0", function() {
	console.log("listening to port: " + port);
});

// socket io listener
io.on('connection', function(socket) {
	socket.on('chat', function(data) {
		console.log(data);

		// store userdata on socket
		socket.userData = data.userData;

		// validation
		var emitDest = (typeof data !== 'undefined' && typeof data.emit_dest !== 'undefined') ? data.emit_dest : null;

		switch (emitDest) {
			case "inform_user_connected":
			case "send_random_chat":
				io.emit('chat', data);
			break;
			default: break;
		}
	});

	socket.on('disconnect', function() {
		console.log(socket.userData);
		io.emit('chat', {
			emit_dest: 'chat_disconnect',
			userData: socket.userData
		});
	});
});

// express example
app.get('/', function(req, res) {
	console.log(req.query);
	res.send(req.query);
});