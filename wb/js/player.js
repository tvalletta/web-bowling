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

    playr.btn.classList.remove('hidden');

    playr.btn.addEventListener(grabEvent, ballGrab);
};

/**
 * This is a callback function that gets attached to an event triggered when we our pressing the bowling ball
 * @param e
 */
var ballGrab = function(e) {
    e.preventDefault();
    e.stopPropagation();

    //Make ball spin
     playr.btn.classList.add('grab');

    //Toggle touch listeners
    playr.btn.removeEventListener(grabEvent, ballGrab);
    playr.btn.addEventListener(releaseEvent, ballRelease);

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
var ballRelease = function(e) {
    //Remove class for touch
    playr.btn.classList.remove('grab');

    //Animate the throw
    playr.btn.classList.add('animate-ball');
    playr.floor.classList.add('animate-floor');
    playr.floor.classList.add('throw');


    //Return ball after animation
    setTimeout(function() {
        //Remove the transition classes so that it doesn't animate the return of the ball
        playr.btn.classList.remove('animate-ball');
        playr.floor.classList.remove('animate-floor');
        playr.floor.classList.remove('throw');
    }, 1300);


    //Toggle listeners
    playr.btn.removeEventListener(releaseEvent, ballRelease);
    playr.btn.addEventListener(grabEvent, ballGrab);


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