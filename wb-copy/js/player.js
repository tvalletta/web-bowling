var grabEvent = "mousedown";
//var grabEvent = "touchstart";
var releaseEvent = "mouseup";
//var releaseEvent = "touchend";


//Namespace object to hold our data
var playr = {};

/**
 * This function will be called once we establish a connection with the websocket server.  It stores references
 * to dom elements and the recorded device motion data
 */
var setReady = function() {
    //Keep references to the dom elements
    playr.floor = document.getElementById('floor');
    playr.btn = document.getElementById('ball');
    playr.orient = null;

    //todo: unhide the bowling ball

    //todo: attach grab listener
};

/**
 * This is a callback function that gets attached to an event triggered when we our pressing the bowling ball
 * @param e
 */
var ballGrab = function(e) {
    e.preventDefault();
    e.stopPropagation();

    //Make ball spin
    //todo: add class to make ball spin

    //Toggle touch listeners
    //todo: toggle grab/release events

    //Reset our data
    playr.orient = [];

    //Record orientation events, if supported

    //todo: check for deviceorientation support, add listener

    return false;
};


/**
 * This is a callback function that gets attached to an event triggered when we stop pressing the bowling ball
 * @param e
 */
var ballRelease = function(e) {
    //Remove class for touch
    //todo: remove class that makes ball spin

    //Animate the throw
    //todo: animate the throw by adding the right css classes


    //Return ball after animation
    //todo: return ball after the animation and remove the animation classes


    //Toggle listeners
    //todo: toggle grab/release events


    //Stop recording orientation events
    //todo:  stop recording orientation events


    //Calculate Swing
    //todo:  call calculate swing

    //Send data
    //todo:  send swing data to socket
};

/**
 * This is a callback function that executes when device orientation events occur.  It captures data from the sensors
 * and stores them in an array that we will use later to calculate the swing.
 * @param e
 */
var record = function(e) {
    var acl = e.accelerationIncludingGravity,
        rot = e.rotationRate;

    var item = {
        ax: acl.x,
        ay: acl.y,
        az: acl.z,
        ra: rot.alpha,
        rb: rot.beta,
        rg: rot.gamma
    };

    //Store item in array
    playr.orient.push(item);
};