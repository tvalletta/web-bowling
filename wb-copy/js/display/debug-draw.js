function debugDraw(canvas, world, scale) {
	var ctx 			= canvas.getContext("2d"),
		b2DebugDraw 	= Box2D.Dynamics.b2DebugDraw;
	
	var debugDraw = new b2DebugDraw();
	debugDraw.SetSprite(ctx);
	debugDraw.SetDrawScale(scale);
	debugDraw.SetFillAlpha(0.3);
	debugDraw.SetLineThickness(1.0);
	debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
	
	world.SetDebugDraw(debugDraw);
	world.DrawDebugData();
}