var express = require('express'),
    app = express.createServer();
var io = require('socket.io').listen(app);

var port = 3008;

app.use(express.static(__dirname + "/.."));

io.configure('development', function(){
	io.enable('browser client etag');
	io.set('log level', 1);

	io.set('transports', [
		  'websocket'
		, 'flashsocket'
		, 'htmlfile'
		, 'xhr-polling'
		, 'jsonp-polling'
	]);
});

io.sockets.on('connection', function (socket) {
	console.log('Connection Made', socket.id);
    socket.emit('ack', { message: 'You are connected.' });
		
    socket.on('release', function (data) {
		console.log('release', data);
		socket.broadcast.emit('release', data);
    });
});

app.listen(port);

console.log("App started listening on port " + port);
