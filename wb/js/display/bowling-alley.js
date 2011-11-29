function BowlingAlley(canvas) {
    var b2Color = Box2D.Common.b2Color,
        b2Math = Box2D.Common.Math.b2Math,
        b2Vec2 = Box2D.Common.Math.b2Vec2,
        b2AABB = Box2D.Collision.b2AABB,
        b2BodyDef = Box2D.Dynamics.b2BodyDef,
        b2Body = Box2D.Dynamics.b2Body,
        b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
        b2Fixture = Box2D.Dynamics.b2Fixture,
        b2World = Box2D.Dynamics.b2World,
        b2Shape = Box2D.Collision.Shapes.b2Shape,
        b2MassData = Box2D.Collision.Shapes.b2MassData,
        b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
        b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
        b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
        b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef;

    // Variables for "frames per second", "minimum frames per second", and "scale"
    var fps = 30,
        fpsMin = 10,
        scale = 30;

    // Box2D world
    var world = new b2World(
        new b2Vec2(0, 0), // gravity
        true                        // allow sleep
    );

    // Default fixture definition
    var fixDef = new b2FixtureDef;
    fixDef.density = 2.0;           // density of default bodies
    fixDef.friction = 0.5;          // friction of default bodies surfaces
    fixDef.restitution = 0.2;       // rebound of default bodies collision

    // Dynamic Body
    var bodyDef = new b2BodyDef;
    bodyDef.type = b2Body.b2_dynamicBody;
    // bodyDef.type = b2Body.b2_kinematicBody;
    // bodyDef.type = b2Body.b2_staticBody;

    // Canvas element
    var canvas = document.getElementById('alley');

    // Create shapes
    createPins(world, fixDef, bodyDef);
    debugDraw(canvas, world, scale);


    // Main loop
    new MainLoop(fps, fpsMin, world);

    this.ball = function(data) {
        console.log("Ball: " + data);

        // Variables for x velocity, y velocity, and spin
        // todo: Create variables for x velocity, y velocity, and spin (L3.4 a)

        // The bowling ball
        // todo: Create a bowling ball (L3.4 b)

        // Angular and linear velocity
        // todo: Create the ball with angular and linear velocity (L3.4 c)
    }
}