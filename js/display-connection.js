var socket,
	//server = 'http://10.109.37.189:3008';
	server = 'http://10.109.113.55:3008';

var connect = function(callback) {
	console.log("Attempting to connect to " + server);
	socket = io.connect(server);
	socket.on('ack', function() {
		console.log("Sending identification");
		socket.emit('identify', 'D', function(data) {
			console.log("Recieved confirmation");
			if (data && callback) callback();
		});
	});
	socket.on('release', function(data) {
		release(data);
	});
};
