var express = require('express'),
    app = express.createServer();   //Create web server

var io = require('socket.io').listen(app);

//Configure Socket.IO
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

//Listen for connections
io.sockets.on('connection', function (socket) {
	console.log('Connection Made', socket.id);

    socket.emit('ack', { message: 'You are connected.' });

    // todo: add listener for release messages (L2.2 b)
});





//Serve up static resources
//todo: add directory for serving static resources (L0.2 a)


//Start app
//todo: start the server listening for connections (L0.2 b)


console.log("Server started...");
