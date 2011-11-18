var disp = {};

function initDisplay() {
	var fps = 30;
	var fpsMin = 10;
	var objCnt = 20;
	var idleSec = 10;
	var scale = disp.scale = 30;
	
	var canvas = document.getElementById('canvas');
	
	var b2Vec2 = Box2D.Common.Math.b2Vec2,
		b2AABB = Box2D.Collision.b2AABB,
		b2BodyDef = Box2D.Dynamics.b2BodyDef,
		b2Body = Box2D.Dynamics.b2Body,
		b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
		b2Fixture = Box2D.Dynamics.b2Fixture,
		b2World = Box2D.Dynamics.b2World,
		b2MassData = Box2D.Collision.Shapes.b2MassData,
		b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
		b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
		b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
		b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef;
		
	var world = disp.world = new b2World(
		new b2Vec2(0, 0),		// gravity
		true					// allow sleep
	);
	
	var fixDef = disp.fixDef = new b2FixtureDef;
	fixDef.density = 2.0;
	fixDef.friction = 0.5;
	fixDef.restitution = 0.2;
	
	var bodyDef = disp.bodyDef = new b2BodyDef;
	
	// create ground
	// bodyDef.type = b2Body.b2_staticBody;
	// bodyDef.position.x = canvas.width / scale / 2;
	// bodyDef.position.y = canvas.height / scale - 2;
	// bodyDef.linearDamping = 0;
	// bodyDef.angularDamping = 0.1;
	// fixDef.shape = new b2PolygonShape;
	// fixDef.shape.SetAsBox(canvas.width / scale / 2 * 0.8, 1);
	// world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	// create qBall
	// bodyDef.type = b2Body.b2_dynamicBody;
	// var radius = .6;
	// fixDef.density = 5.0;
	// fixDef.friction = 0.9;
	// fixDef.restitution = 1 - radius;
	// fixDef.shape = new b2CircleShape(radius);
	// bodyDef.position.x = canvas.width / scale / 2;
	// bodyDef.position.y = canvas.height / scale - 1;
	// bodyDef.angle = Math.random() * Math.PI * 2;
	// var qBallBody = world.CreateBody(bodyDef);
	// qBallBody.SetAngularVelocity(8);
	// qBallBody.SetLinearVelocity(new b2Vec2(0, -8));
	// qBallBody.CreateFixture(fixDef);
	
	// create objects
	bodyDef.type = b2Body.b2_dynamicBody;
	for (var i = 0; i < objCnt; i++) {
	    if (Math.random() > 0.3) {
			fixDef.shape = new b2PolygonShape;
			if (Math.random() > 0.3) {
				fixDef.density = 2.0;
				fixDef.friction = 0.5;
				fixDef.restitution = 0.1;
				fixDef.shape.SetAsBox(
					Math.random() + 0.1, // half width
					Math.random() + 0.1  // half height
				);
			} else {
				var radius = Math.random() + 0.3;
				fixDef.density = 5.0;
				fixDef.friction = 0.1;
				fixDef.restitution = 0.1;
				fixDef.shape.SetAsArray([
					new b2Vec2(0.866 * radius, 0.5 * radius),
					new b2Vec2(-0.866 * radius, 0.5 * radius),
					new b2Vec2(0, -1 * radius),
				]);
			}
		} else {
			var radius = Math.random() * 0.4 + 0.1;
			fixDef.density = 1.0;
			fixDef.friction = 0.9;
			fixDef.restitution = 1 - radius; // 0.82;
			fixDef.shape = new b2CircleShape(radius);
		}
		var randx = 0;
		for (var j = 0; j < 5; j++) {
			randx += canvas.width / 30 / 5 * Math.random();
		}
		bodyDef.position.x = randx;
		bodyDef.position.y = Math.random() * 10;
		bodyDef.angle = Math.random() * Math.PI * 2;
		bodyDef.linearDamping = 0.9;
		bodyDef.angularDamping = 0.9;
		world.CreateBody(bodyDef).CreateFixture(fixDef);
	}
	
	// setup debug draw
	var debugDraw = new b2DebugDraw();
	debugDraw.SetSprite(canvas.getContext("2d"));
	debugDraw.SetDrawScale(scale);
	debugDraw.SetFillAlpha(0.3);
	debugDraw.SetLineThickness(1.0);
	debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
	world.SetDebugDraw(debugDraw);
	
	var ptick = +new Date;
	var dtick = 0;
	var fpsseen = 0;
	var fpscalc = 0;
	
	// Logic: do the computation
	function update() {
		var tick = +new Date;
		// if (isMouseDown && !mouseJoint) {
		// 	mouseBody = getBodyAtMouse();
		// 	if (mouseBody) {
		// 		var md = new b2MouseJointDef();
		// 		md.bodyA = world.GetGroundBody();
		// 		md.bodyB = mouseBody;
		// 		md.target.Set(mouseX, mouseY);
		// 		md.collideConnected = true;
		// 		md.maxForce = 300.0 * mouseBody.GetMass();
		// 		mouseJoint = world.CreateJoint(md);
		// 		mouseBody.SetAwake(true);
		// 	}
		// }
		// if (mouseJoint) {
		// 	if (isMouseDown) {
		// 		mouseJoint.SetTarget(new b2Vec2(mouseX, mouseY));
		// 		av = mouseBody.GetAngularVelocity();
		// 		// Partially counteract the selected item from turning
		// 		mouseBody.SetAngularVelocity(
		// 			Math.min(3, Math.max(-Math.abs(av), (Math.abs(av) - 1))) * (av < 0 ? -1 : 1));
		// 	} else {
		// 			world.DestroyJoint(mouseJoint);
		// 			mouseJoint = null;
		// 	}
		// }
		world.Step(
			1.0 / fps,
			10,       //velocity iterations
			10        //position iterations
		);
		fpscalc += 1;
		ptick += 1000 / fps;
		var draw = false;
		var delay = false;
		if (tick < ptick) {
			// If physics is ahead of realtime, then draw and delay.
			draw = true;
			delay = true;
		} else if (tick < ptick + 1000 / fps) {
			// If physics is a little behind realtime, draw but do not delay.
			draw = true;
		} else if (tick < dtick + 1000 / fpsMin) {
			// If physics is way behind realtime, draw anyway and let fps drop.
			draw = true;
			if (ptick < dtick) ptick = dtick;
		}
		// If physics is more than one fps tick behind but not a full
		// minfps tick behind, then drawing is skipped to try to catch up.
		if (draw) {
			fpsseen += 1;
			dtick = tick;
			world.DrawDebugData();
		}
		world.ClearForces();
		window.setTimeout(update, delay ? Math.max(0, 1000 / fps + ptick - new Date().getTime()) : 0);
	};
	var sampletime = new Date().getTime();
	setInterval(function() {
		var now = new Date().getTime();
		//if (now - lastmove > idleSec * 1000) window.location.reload();
		var delta = now - sampletime;
		sampletime = now;
		var fps1 = Math.round(fpsseen / delta * 1000);
		var fps2 = Math.round(fpscalc / delta * 1000);
		//console.log(fps1 + '/' + fps2 + ' fps');
		fpscalc = 0;
		fpsseen = 0;
	}, 1300);

	update();
};

function release(data) {
	console.log(data);
	
	var velocX = data.rg.power * .1;
	var velocY = (data.ay.power + -data.az.power + data.ra.power) * -0.0333;
	var spin = data.rb.power;
	
	// create qBall
	disp.bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
	var radius = .6;
	disp.fixDef.density = 5.0;
	disp.fixDef.friction = 0.9;
	disp.fixDef.restitution = 1 - radius;
	disp.fixDef.shape = new Box2D.Collision.Shapes.b2CircleShape(radius);
	disp.bodyDef.linearDamping = 0.0;
	disp.bodyDef.angularDamping = 0.01;
	disp.bodyDef.position.x = canvas.width / disp.scale / 2;
	disp.bodyDef.position.y = canvas.height / disp.scale - 1;
	disp.bodyDef.angle = Math.random() * Math.PI * 2;
	var qBallBody = disp.world.CreateBody(disp.bodyDef);
	qBallBody.SetAngularVelocity(spin);
	qBallBody.SetLinearVelocity(new Box2D.Common.Math.b2Vec2(velocX, velocY));
	qBallBody.CreateFixture(disp.fixDef);
}