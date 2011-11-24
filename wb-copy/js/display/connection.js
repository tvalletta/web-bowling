var socket,
	server = 'http://127.0.0.1:3008';  //Be sure to use your servers ip address, and the port your server is listening on

var connect = function(callback) {
	console.log("Attempting to connect to " + server);

    //Connect to server
	socket = io.connect(server);

    //Listen for ack from server that we have connected
	socket.on('ack', function() {
	    console.log('You have connected');

	    //Execute the callback
	    if(callback) {
	        callback();
	    }
	});
	
	socket.on('ball', function(data) {
		bowlingAlley.ball(data);
	});
};