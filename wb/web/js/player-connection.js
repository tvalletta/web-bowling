var socket,
	server = 'http://10.111.160.87:3008';  //Be sure to use your servers ip address and port


var connect = function(callback) {
	console.log("Attempting to connect to " + server);

    //Connect to server
	socket = io.connect(server);

    //Listen for ack from server that we have connected
	socket.on('ack', function() {
	    console.log('You have connected');

	    //Execute the callback, which should be our setReady function
	    if(callback) {
	        callback();     //This should unhide our bowling ball
	    }
	});
};