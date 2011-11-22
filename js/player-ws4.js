//var grabEvent = "mousedown";
var grabEvent = "touchstart";
//var releaseEvent = "mouseup";
var releaseEvent = "touchend";

var playr = {};

var setReady = function() {
    playr.floor = document.getElementById('floor');
    playr.btn = document.getElementById('ball');
    playr.orient = null;

    //Show Ball
    playr.btn.classList.remove('hidden');

    //Attach Listener
    playr.btn.addEventListener(grabEvent, ballGrab);
};

// Touch and Release Handlers -------------------------------------------------
var ballGrab = function(e) {
    e.preventDefault();
    e.stopPropagation();

    //Make ball spin
    playr.btn.classList.add('grab');

    //Toggle touch listeners
    playr.btn.removeEventListener(grabEvent, ballGrab);
    playr.btn.addEventListener(releaseEvent, ballRelease);

    //Record orientation events, if supported
    if(window.DeviceOrientationEvent){
        window.addEventListener('devicemotion', record);
    }

    return false;
};

var ballRelease = function(e) {
    //Remove class for touch
    playr.btn.classList.remove('grab');

    //Animate the throw
    playr.btn.classList.add('animate-ball');
    playr.floor.classList.add('animate-floor');
    playr.floor.classList.add('throw');

    //Return ball after animation
    setTimeout(function() {
        playr.btn.classList.remove('animate-ball');
        playr.floor.classList.remove('animate-floor');
        playr.floor.classList.remove('throw');
    }, 1300);

    //Toggle listeners
    playr.btn.removeEventListener(releaseEvent, ballRelease);
    playr.btn.addEventListener(grabEvent, ballGrab);

    //Stop recording orientation events
    if(window.DeviceOrientationEvent){
        window.removeEventListener('devicemotion', record);
    }

    //Calculate Swing
    var swing = calcSwing();
    console.log(swing);
};


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

    console.log(item);
    playr.orient.push(item);
};

//http://www.html5rocks.com/en/tutorials/device/orientation/