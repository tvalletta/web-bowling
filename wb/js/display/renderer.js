function Renderer(ctx, scale) { 
	var b2Math			= Box2D.Common.Math.b2Math,
		b2Shape			= Box2D.Collision.Shapes.b2Shape,
		b2PolygonShape 	= Box2D.Collision.Shapes.b2PolygonShape,
		b2CircleShape 	= Box2D.Collision.Shapes.b2CircleShape;

	this.render = function(world) {
		ctx.clearRect(0,0,400,1000);
		var fillMeta = {
			color: {
				r: 255, 
				g: 255, 
				b: 255
			},
			alpha: 1
		}
		var strokeMeta = {
			color: {
				r: 0, 
				g: 0, 
				b: 0
			},
			alpha: 0.9
		}
		var ballFillMeta = {
			color: {
				r: 11, 
				g: 90, 
				b: 163
			},
			alpha: 1
		}
		var ballStrokeMeta = {
			color: {
				r: 12, 
				g: 49, 
				b: 131
			},
			alpha: 0.9
		}
		for (var b = world.m_bodyList; b; b = b.m_next) {
			for (var f = b.GetFixtureList(); f; f = f.m_next) {
				ctx.lineWidth = 3;
				if (f.m_density > 2) {
					this.drawShape(f.GetShape(), b.m_xf, ballStrokeMeta, ballFillMeta);
				}
				else {
					this.drawShape(f.GetShape(), b.m_xf, strokeMeta, fillMeta);
				}
			}
		}
	}

	this.drawShape = function(shape, xf, strokeMeta, fillMeta) {
		switch (shape.m_type) {
		case b2Shape.e_circleShape:
			{
				var circle = ((shape instanceof b2CircleShape ? shape : null));
				var center = b2Math.MulX(xf, circle.m_p);
				var radius = circle.m_radius;
				var axis = xf.R.col1;
				this.drawSolidCircle(center, radius, axis, strokeMeta, fillMeta);
			}
			break;
		case b2Shape.e_polygonShape:
			{
				var i = 0;
				var poly = ((shape instanceof b2PolygonShape ? shape : null));
				var vertexCount = parseInt(poly.GetVertexCount());
				var localVertices = poly.GetVertices();
				var vertices = new Vector(vertexCount);
	            for (i = 0; i < vertexCount; ++i) {
					vertices[i] = b2Math.MulX(xf, localVertices[i]);
				}
				this.drawSolidPolygon(vertices, vertexCount, strokeMeta, fillMeta);
			}
			break;
		case b2Shape.e_edgeShape:
			{
				console.log("trying to draw a segment!");
//				var edge = (shape instanceof b2EdgeShape ? shape : null);
//				this.m_debugDraw.DrawSegment(b2Math.MulX(xf, edge.GetVertex1()), b2Math.MulX(xf, edge.GetVertex2()), color);
			}
			break;
		}
	}

	this.drawSolidCircle = function(center, radius, axis, strokeMeta, fillMeta) {
		if(!radius) return;
		var s = ctx,
			cx = center.x * scale,
			cy = center.y * scale;
		s.moveTo(0, 0);
		s.beginPath();
		s.strokeStyle = this.toRGBA(strokeMeta.color, strokeMeta.alpha);
		s.fillStyle = this.toRGBA(fillMeta.color, fillMeta.alpha);
		s.arc(cx, cy, radius * scale, 0, Math.PI*2, true);
		//s.moveTo(cx, cy);
		//s.lineTo((center.x + axis.x * radius) * scale, (center.y + axis.y * radius) * scale);
		s.closePath();
		s.fill();
		s.stroke();
	};

	this.drawSolidPolygon = function(vertices, vertexCount, strokeMeta, fillMeta) {
		if(!vertexCount) return;
		var s = ctx;
		s.beginPath();
		s.strokeStyle = this.toRGBA(strokeMeta.color, strokeMeta.alpha);
		s.fillStyle = this.toRGBA(fillMeta.color, fillMeta.alpha);
		s.moveTo(vertices[0].x * scale, vertices[0].y * scale);
		for (var i = 1; i < vertexCount; i++) {
		   s.lineTo(vertices[i].x * scale, vertices[i].y * scale);
		}
		s.lineTo(vertices[0].x * scale, vertices[0].y * scale);
		s.closePath();
		s.fill();
		s.stroke();
	};
	
	this.toRGBA = function(color, alpha) {
		return "rgba(" + color.r + "," + color.g + "," + color.b + "," + alpha + ")";
	};	
};
