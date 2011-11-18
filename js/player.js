var playr = {};

var setReady = function(data, clientId) {
	console.log('ready');

	playr.main = document.getElementById('main');
	playr.status = document.getElementById('status');
	playr.btn = document.getElementById('button');
	playr.orient = null;
	
	updateStatus('Go!');

    playr.btn.addEventListener('touchstart', ballGrab);
};

var updateStatus = function(text) {
	if (playr.status.hasChildNodes()) {
		while (playr.status.childNodes.length >= 1) {
			playr.status.removeChild(playr.status.firstChild);
		}
	}
	var n = document.createTextNode("Status: " + text);
	playr.status.appendChild(n);
};


// Touch and Release Handlers -------------------------------------------------
var ballGrab = function(e) {
	e.preventDefault();
	e.stopPropagation();
	playr.orient = [];
	
	playr.btn.removeEventListener('touchstart', ballGrab);
	playr.btn.addEventListener('touchend', ballRelease);
	window.addEventListener('devicemotion', record);
	return false;
};

var ballRelease = function(e) {
	playr.btn.addEventListener('touchstart', ballGrab);
	playr.btn.removeEventListener('touchend', ballRelease);
	window.removeEventListener('devicemotion', record);
	trimSwing();
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

// Logging --------------------------------------------------------------------
var output = function() {
	var table = document.createElement('table');
	for (var i = 0; i < playr.orient.length; i++) {
		var row = document.createElement('tr');
		table.appendChild(row);
		for (var ii in playr.orient[i]) {
			var col = document.createElement('td');
			var txt = document.createTextNode(playr.orient[i][ii]);
			col.appendChild(txt);
			row.appendChild(col);			
		}
	}
	playr.main.appendChild(table);
};

var outputText = function(text) {
	console.log('outputText');
	console.log(text);
	var div = document.createElement('div');
	var txt = document.createTextNode(text);
	div.appendChild(txt);
	playr.main.appendChild(div);
};

// Calculate Swing ------------------------------------------------------------
var trimSwing = function() {
	for (var i = (playr.orient.length - 1); i >= 0 ; i--) {
		if (playr.orient[i].ra < 0) {
			playr.orient = playr.orient.slice(i + 1);
			return;
		} 
	}
};

// Calculate power and acceleration -------------------------------------------
var GravitySensorAlpha = function() {
	this.values = [];
	this.power = 0;
	this.accel = 0;
	
	this.calc = function() {
		var ave = [],
			I = this.values.length
			i = I,
			dir = 0,
			total = 0;
		
		while (--i) {
			if (!dir) {
				dir = (this.values[i] < 0)? -1 : 1;
			}
			var x = (this.values[i] - (10 * dir)) * 10;
			var x2 = ((this.values[i-1] || 0) - (10 * dir)) * 10;
			this.power = (dir < 0)? Math.min(x, this.power) : Math.max(x, this.power);
			if (I - i < 4 && x2) {
				ave.push(x - x2);  
			}
		}
		
		var total = 0;
		for (i = 0; i < ave.length; i++) {
			total += ave[i];
		}
		accel = total/ave.length;
	};
	
	this.result = function() {
		return {
			power: this.power,
			accel: this.accel
		}
	};
}

var RotationSensorAlpha = function() {
	this.values = [];
	this.power = 0;
	this.accel = 0;
	
	this.calc = function() {
		var ave = [],
			I = this.values.length
			i = I,
			total = 0;
		
		while (--i) {
			var x = this.values[i] * .1;
			var x2 = (this.values[i-1] || 0) * .1;
			this.power = (this.values[i] < 0)? Math.min(x, this.power) : Math.max(x, this.power);
			if (I - i < 4 && x2) {
				ave.push(x - x2);  
			}
		}
		
		var total = 0;
		for (i = 0; i < ave.length; i++) {
			total += ave[i];
		}
		accel = total/ave.length;
	};
	
	this.result = function() {
		return {
			power: this.power,
			accel: this.accel
		}
	};
}

var calcSwing = function() {
	var samples = playr.orient.length;
	
	var ax = new GravitySensorAlpha(),
		ay = new GravitySensorAlpha(),
		az = new GravitySensorAlpha(),
		ra = new RotationSensorAlpha(),
		rb = new RotationSensorAlpha(),
		rg = new RotationSensorAlpha();
	
	for (var i = 0; i < samples; i++) {
		ax.values.push(playr.orient[i].ax);
		ay.values.push(playr.orient[i].ay);
		az.values.push(playr.orient[i].az);
		ra.values.push(playr.orient[i].ra);
		rb.values.push(playr.orient[i].rb);
		rg.values.push(playr.orient[i].rg);
	}

	ax.calc();
	ay.calc();
	az.calc();
	ra.calc();
	rb.calc();
	rg.calc();
	
	return {
		ax: ax.result(),
		ay: ay.result(),
		az: az.result(),
		ra: ra.result(),
		rb: rb.result(),
		rg: rg.result()
	};
};