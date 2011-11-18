var io = require('socket.io'),
    express = require('express');

var app = express.createServer(),
    io = io.listen(app);

app.listen(3008);

var displays = [],
	players = [];

io.sockets.on('connection', function (socket) {
    var clientId = socket.id;

    socket.emit('ack', { message: 'You are connected.' });
	
	socket.on('identify', function(type, callback) {
		console.log('Identify type: ' + type);
		if (type === "D") {
			console.log("Display Added.")
			displays.push(socket);
		}
		else if (type === "P") {
			console.log("Player Added.")
			players.push(socket);
		}
		else {
			if (callback) callback('false');
		}
		
		if (callback) callback('true');
	});
	
    socket.on('release', function (data) {
        for (var i = 0, cnt = displays.length; i < cnt; i++) {
			console.log('Sent to Display: ' + displays[i].id);
			displays[i].emit('release', data);
		}
    });
});