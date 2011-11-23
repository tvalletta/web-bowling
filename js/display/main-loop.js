function MainLoop(fps, fpsMin, world, renderer) {
	var ptick = +new Date;
	var dtick = 0;
	var fpsseen = 0;
	var fpscalc = 0;
	
	// Logic: do the computation
	function update() {
		var tick = +new Date;
		world.Step(
			1.0 / fps,		// time step
			10,				// velocity iterations
			10				// position iterations
		);
		fpscalc += 1;
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
			fpsseen += 1;
			dtick = tick;
			if (renderer) renderer.render(world, ctx);
			else world.DrawDebugData();
		}
		world.ClearForces();
		window.setTimeout(update, delay ? Math.max(0, 1000 / fps + ptick - +new Date) : 0);
	};
	
	var sampletime = +new Date;
	setInterval(function() {
		var now = +new Date;
		var delta = now - sampletime;
		sampletime = now;
		var fps1 = Math.round(fpsseen / delta * 1000);
		var fps2 = Math.round(fpscalc / delta * 1000);
		fpscalc = 0;
		fpsseen = 0;
	}, 1300);

	update();
}