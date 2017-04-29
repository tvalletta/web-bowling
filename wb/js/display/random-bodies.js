function createRandomBodies(objCnt, canvas, world, fixDef, bodyDef) {
    var b2Vec2 			= Box2D.Common.Math.b2Vec2;
    var b2PolygonShape 	= Box2D.Collision.Shapes.b2PolygonShape;
    var b2CircleShape 	= Box2D.Collision.Shapes.b2CircleShape;

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
}