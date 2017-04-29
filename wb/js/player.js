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
var setReady = () => {
    //Keep references to the dom elements
    playr.floor = document.getElementById('floor');
    playr.btn = document.getElementById('ball');
    playr.orient = null;

    //todo: unhide the bowling ball (L1.2 b)

    //todo: attach grab listener (L1.2 c)
};

/**
 * This is a callback function that gets attached to an event triggered when we our pressing the bowling ball
 * @param e
 */
var ballGrab = e => {
    e.preventDefault();
    e.stopPropagation();

    //Make ball spin
    //todo: add class to make ball spin (L1.2 d)

    //Toggle touch listeners
    //todo: toggle grab/release events (L1.2 d)

    //Reset our data
    playr.orient = [];

    //Record orientation events, if supported
    //todo: check for deviceorientation support, add listener (L1.3 a)

    return false;
};


/**
 * This is a callback function that gets attached to an event triggered when we stop pressing the bowling ball
 * @param e
 */
var ballRelease = e => {
    //Remove class for touch
    //todo: remove class that makes ball spin (L1.2 e)

    //Animate the throw
    //todo: animate the throw by adding the right css classes (L1.2 e)


    //Return ball after animation
    //todo: return ball after the animation and remove the animation classes (L1.2 e)


    //Toggle listeners
    //todo: toggle grab/release events (L1.2 e)


    //Stop recording orientation events
    //todo:  stop recording orientation events (L1.3)


    //Calculate Swing
    //todo:  call calculate swing (L1.3 b)

    //Send data
    //todo:  send swing data to socket (L2.2 a)
};

/**
 * This is a callback function that executes when device orientation events occur.  It captures data from the sensors
 * and stores them in an array that we will use later to calculate the swing.
 * @param e
 */
var record = e => {
    var acl = e.accelerationIncludingGravity;
    var rot = e.rotationRate;

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