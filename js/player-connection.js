var socket,
<<<<<<< HEAD
//	server = 'http://localhost:3008';
	server = 'http://10.109.38.135:3008';
=======
	server = 'http://10.109.37.189:3008';
>>>>>>> Workshop outline folders

var connect = function(callback) {
//	console.log("Attempting to connect to " + server);
	socket = io.connect(server);
	socket.on('ack', function() {
//		console.log("Sending identification");
		socket.emit('identify', 'P', function(data) {
//			console.log('Recieved confirmation');
			if (data && callback) callback();
		});
	});
};
