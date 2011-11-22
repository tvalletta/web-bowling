var playr = {};

var setReady = function() {
    playr.floor = document.getElementById('floor');
    playr.btn = document.getElementById('ball');
    playr.orient = null;

    //Show Ball
    playr.btn.classList.remove('hidden');

    //Attach Listener
    playr.btn.addEventListener('touchstart', ballGrab);
};

// Touch and Release Handlers -------------------------------------------------
var ballGrab = function(e) {
    e.preventDefault();
    e.stopPropagation();

    //Make ball spin
    playr.btn.classList.add('grab');

    playr.orient = [];

    //Toggle touch listeners
    playr.btn.removeEventListener('touchstart', ballGrab);
    playr.btn.addEventListener('touchend', ballRelease);

    //Start recording motion events
    window.addEventListener('devicemotion', record);

    return false;
};

var ballRelease = function(e) {
    //Animate the throw
    playr.btn.classList.remove('grab');

    playr.btn.classList.add('animate-ball');
    playr.floor.classList.add('animate-floor');
    playr.floor.classList.add('throw');

    //Return ball after animation
    setTimeout(function() {
        playr.btn.classList.remove('animate-ball');
        playr.floor.classList.remove('animate-floor');
        playr.floor.classList.remove('throw');
    }, 1300);

    //Toggle touch listeners
    playr.btn.addEventListener('touchstart', ballGrab);
    playr.btn.removeEventListener('touchend', ballRelease);

    //Stop recording motion events
    window.removeEventListener('devicemotion', record);
//    trimSwing();

    //Send data to display through the websocket
    socket.emit('release', calcSwing());
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

// Calculate Swing ------------------------------------------------------------
var trimSwing = function() {
    for (var i = (playr.orient.length - 1); i >= 0; i--) {
        if (playr.orient[i].ra < 0) {
            playr.orient = playr.orient.slice(i + 1);
            return;
        }
    }
};
