var playr = {};

var setReady = function() {
    playr.floor = document.getElementById('floor');
    playr.btn = document.getElementById('ball');
    playr.orient = null;

    //Show Ball
    playr.btn.classList.remove('hidden');

    //Attach Listener
    playr.btn.addEventListener('touchstart', ballGrab);
    playr.btn.addEventListener('mousedown', ballGrab);
};

// Touch and Release Handlers -------------------------------------------------
var ballGrab = function(e) {
    e.preventDefault();
    e.stopPropagation();

    //Make ball spin
    playr.btn.classList.add('grab');

    playr.orient = [];

    //Toggle touch listeners
    toggleListeners(ballRelease, ballGrab, true);

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
    toggleListeners(ballGrab, ballRelease, false);

    //Send data to display through the websocket
    socket.emit('release', calcSwing());
};

var toggleListeners = function(addFn, removeFn, attachDeviceListener){
    playr.btn.removeEventListener('touchstart', removeFn);
    playr.btn.removeEventListener('mousedown', removeFn);
    playr.btn.addEventListener('touchend', addFn);
    playr.btn.addEventListener('mouseup', addFn);

    if(attachDeviceListener){
        window.addEventListener('devicemotion', record);
    }
    else{
        window.removeEventListener('devicemotion', record);
    }
};

// Sensor Recording -----------------------------------------------------------
var record = function(e) {
    var acl = e.accelerationIncludingGravity,
        rot = e.rotationRate;

    playr.orient.push({
        ax: acl.x,
        ay: acl.y,
        az: acl.z,
        ra: rot.alpha,
        rb: rot.beta,
        rg: rot.gamma
    });
};