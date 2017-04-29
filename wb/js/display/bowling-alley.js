function BowlingAlley(canvas) {
    var b2Color         = Box2D.Common.b2Color;
    var b2Math          = Box2D.Common.Math.b2Math;
    var b2Vec2          = Box2D.Common.Math.b2Vec2;
    var b2AABB          = Box2D.Collision.b2AABB;
    var b2BodyDef       = Box2D.Dynamics.b2BodyDef;
    var b2Body          = Box2D.Dynamics.b2Body;
    var b2FixtureDef    = Box2D.Dynamics.b2FixtureDef;
    var b2Fixture       = Box2D.Dynamics.b2Fixture;
    var b2World         = Box2D.Dynamics.b2World;
    var b2Shape         = Box2D.Collision.Shapes.b2Shape;
    var b2MassData      = Box2D.Collision.Shapes.b2MassData;
    var b2PolygonShape  = Box2D.Collision.Shapes.b2PolygonShape;
    var b2CircleShape   = Box2D.Collision.Shapes.b2CircleShape;
    var b2DebugDraw     = Box2D.Dynamics.b2DebugDraw;
    var b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef;

    // Variables for "frames per second", "minimum frames per second", and "scale"
    // todo: Create fps, fpsMin, and scale variables for Box2Djs (L3.1 b)

    // Box2D world
    // todo: Create a new Box2D world (L3.1 c)

    // Default fixture definition
    // todo: Define a fixture definition (L3.1 d)

    // Dynamic Body
    // todo: Define a dynamic body (L3.1 e)

    // Canvas element
    // todo: Create a variable for the canvas element (L3.2 a)

    // Create shapes
    // todo: Create and draw random shapes (L3.2 b)
    // todo: Replace the random shapes call with createPins  (L3.2 d)

    // Main loop
    // todo: create the game's main loop (L3.3 b)

    this.ball = data => {
		console.log("Ball: " + data);
		
		// Variables for x velocity, y velocity, and spin
		// todo: Create variables for x velocity, y velocity, and spin (L3.4 a)

		// The bowling ball
		// todo: Create a bowling ball (L3.4 b)

		// Angular and linear velocity
		// todo: Create the ball with angular and linear velocity (L3.4 c)
	}
}