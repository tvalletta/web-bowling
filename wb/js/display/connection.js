var socket;  //Be sure to use your servers ip address, and the port your server is listening on
var server = 'http://127.0.0.1:3008';

var connect = callback => {
	console.log("Attempting to connect to " + server);

    //Connect to server
	socket = io.connect(server);

    //Listen for ack from server that we have connected
	socket.on('ack', () => {
	    console.log('You have connected');

	    //Execute the callback
	    if(callback) {
	        callback();
	    }
	});
	
    //todo:  Add listener for ball messages (L3.5 a)
};