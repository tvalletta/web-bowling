var grabEvent = "mousedown";
var releaseEvent = "mouseup";

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
};