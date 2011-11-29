function createPins(world, fixDef, bodyDef) {
    var b2Vec2 = Box2D.Common.Math.b2Vec2,
        b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
        b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;

    var xCoord = [2, 5.1, 8.2, 11.3, 3.55, 6.65, 9.75, 5.1, 8.2, 6.65],
        yCoord = [2.5, 2.5, 2.5, 2.5, 5, 5, 5, 7.5, 7.5, 10];

    // Pins
    for (var i = 0; i < 10; i++) {
        var radius = 0.8;

        fixDef.density = 2.0;
        fixDef.friction = 0.9;
        fixDef.restitution = 0.6;
        fixDef.shape = new b2CircleShape(radius);

        bodyDef.position.x = xCoord[i];
        bodyDef.position.y = yCoord[i];
        bodyDef.angle = Math.PI;            // Direction of the round Pin (?)
        bodyDef.linearDamping = 0.3;        // Slows Movement
        bodyDef.angularDamping = 0.3;       // Slows Spin

        world.CreateBody(bodyDef).CreateFixture(fixDef);
    }
}