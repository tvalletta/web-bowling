function MainLoop(fps, fpsMin, world, renderer) {
	var ptick = +new Date;
	var dtick = 0;
	
	function update() {
		var tick = +new Date;
		world.Step(
			1.0 / fps,		// time step
			10,				// velocity iterations
			10				// position iterations
		);
		ptick += 1000 / fps;
		var draw = false;
		var delay = false;
		if (tick < ptick) {
			draw = true;
			delay = true;
		} else if (tick < ptick + 1000 / fps) {
			draw = true;
		} else if (tick < dtick + 1000 / fpsMin) {
			draw = true;
			if (ptick < dtick) ptick = dtick;
		}
		if (draw) {
			dtick = tick;
			if (renderer) renderer.render(world, ctx);
			else world.DrawDebugData();
		}
		world.ClearForces();
		window.setTimeout(update, delay ? Math.max(0, 1000 / fps + ptick - +new Date) : 0);
	};

	update();
}