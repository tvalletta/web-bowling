function BowlingAlley(canvas) {
	var b2Color			= Box2D.Common.b2Color,
		b2Math			= Box2D.Common.Math.b2Math,
		b2Vec2 			= Box2D.Common.Math.b2Vec2,
		b2AABB 			= Box2D.Collision.b2AABB,
		b2BodyDef 		= Box2D.Dynamics.b2BodyDef,
		b2Body 			= Box2D.Dynamics.b2Body,
		b2FixtureDef 	= Box2D.Dynamics.b2FixtureDef,
		b2Fixture 		= Box2D.Dynamics.b2Fixture,
		b2World 		= Box2D.Dynamics.b2World,
		b2Shape			= Box2D.Collision.Shapes.b2Shape,
		b2MassData 		= Box2D.Collision.Shapes.b2MassData,
		b2PolygonShape 	= Box2D.Collision.Shapes.b2PolygonShape,
		b2CircleShape 	= Box2D.Collision.Shapes.b2CircleShape,
		b2DebugDraw 	= Box2D.Dynamics.b2DebugDraw,
		b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef,
	
		fps 			= 30,
		fpsMin 			= 10,
		scale 			= 30;
	
	/* --- Setup World --- ------------------------------------------------- */
	var world = new b2World(
		new b2Vec2(0, 0),			// gravity
		true						// allow sleep
	);

	var fixDef = new b2FixtureDef;
	fixDef.density = 2.0;			// density of default bodies
	fixDef.friction = 0.5;			// friction of default bodies surfaces
	fixDef.restitution = 0.2;		// rebound of default bodies collision

	var bodyDef = new b2BodyDef;
	// Dynamic bodies move and behave dynamically
	bodyDef.type = b2Body.b2_dynamicBody;

	// Kinematic Bodies behaves as if they have infinite mass
	// bodyDef.type = b2Body.b2_kinematicBody;

	// Static Bodies do not move and behave as if they have infinite mass
	// bodyDef.type = b2Body.b2_staticBody;

	
	/* --- Create Objects --- ---------------------------------------------- */
	var canvas = document.getElementById('alley');
	//createRandomBodies(20, canvas, world, fixDef, bodyDef);
	createPins(world, fixDef, bodyDef);
	debugDraw(canvas, world, scale);
	
	/* --- Create Main Loop --- -------------------------------------------- */
	var ctx = canvas.getContext("2d");
	var renderer = new Renderer(ctx, scale);
	new MainLoop(fps, fpsMin, world, renderer);
	
	/* --- Listen for Bowling Balls --- ------------------------------------ */
	this.ball = function(data) {
		var velocX = data.rg.power * .1;
		var velocY = (data.ay.power + -data.az.power + data.ra.power) * -0.0333;
		var spin = data.rb.power;

		// create qBall
		var radius = 1.2;

		fixDef.density = 12.0;
		fixDef.friction = 0.9;
		fixDef.restitution = 1 - radius;
		fixDef.shape = new Box2D.Collision.Shapes.b2CircleShape(radius);

		bodyDef.linearDamping = 0.0;
		bodyDef.angularDamping = 0.01;
		bodyDef.position.x = canvas.width / scale / 2;
		bodyDef.position.y = canvas.height / scale - 1;
		bodyDef.angle = Math.random() * Math.PI * 2;

		var qBallBody = world.CreateBody(bodyDef);
		qBallBody.SetAngularVelocity(spin);
		qBallBody.SetLinearVelocity(new Box2D.Common.Math.b2Vec2(velocX, velocY));
		qBallBody.CreateFixture(fixDef);
	}
}