$(document).ready(function(){
	
	var canvas = $("#canvas")[0],
		ctx = canvas.getContext("2d"),
		height = $("#canvas").height(),
		width = $("#canvas").width();

	var partCount = 200,
		partSpeed = -3,
		partAngSpeed = 1,
		partRayBehaviour = 1,
		partCircleBehaviour = 0.01,

		connCount = 10,
		connLife = 1000,
		connAddedLife = 10,
		connSplits = 5,
		connJitter = 100,
		connSpanMultiplier = 100,

		repaintAlpha = 0.01,
		tickSpeed = 1,

		cx = width / 2,
		cy = height / 2,

		tick = 0,
		first = true,
		particles = [];

	function init() {
		if(first) {
			first = false;
			loop();
			for(var i = 0; i < Math.min(partCount, 10); i++) {
				particles.push(new Particle);
			}
		} else {
			particles.map(function(particle) {
				particle.reset();
			});
		}
	}

	function loop() {
		window.requestAnimationFrame(loop);

		
		draw();
		tick += tickSpeed;
		if(particles.length < partCount && Math.random() < 0.1) {
			particles.push(new Particle);
		}

		particles.map(function(particle) {
			particle.step();
		});
	}

	function draw() {
		ctx.globalCompositeOperation = 'source-over';
		ctx.fillStyle = 'rgba(10, 100, 200, alp)'.replace('alp', repaintAlpha);
		ctx.fillRect(0, 0, width, height);

		particles.map(function(particle) {
			particle.draw();
		});
	}

	function Particle() {
		this.connections = [];
		for(var i = 0; i < connCount; i++) {
			this.connections.push({});
		}

		this.reset();
	}

	Particle.prototype.reset = function() {
		if(Math.random() < 0.5) {
			this.x = Math.random() * width;
			this.y = Math.random() < 0.5 ? 0 : height;
		} else {
			this.x = Math.random() < 0.5 ? 0 : width;
			this.y = Math.random() * height;
		}

		var dx = this.x - cx,
			dy = this.y - cy;

		this.rad = Math.atan(dy / dx);
		if(dx < 0) this.rad += Math.PI;

		this.cos = Math.cos(this.rad);
		this.sin = Math.sin(this.rad);

		this.len = Math.sqrt(dx * dx + dy * dy);

		this.behaviour = 'ray';

		for(var i = 0; i < this.connections.length; i++) {
			this.resetConnection(i);
			this.hasDied = false;
		}
	}

	Particle.prototype.step = function() {
		if(this.behaviour === 'ray') {
			this.len += partSpeed;
			if(this.len < 0) {
				this.hasDied = true;
			}

			if(Math.random() < partCircleBehaviour) {
				this.behaviour = 'circle';
			}
		} else {
			if(Math.random() < partRayBehaviour) {
				this.behaviour = 'ray';
			}
		}

		this.x = cx + this.cos * this.len;
		this.y = cy + this.sin * this.len;

		for(var i = 0; i < this.connections.length; i++) {
			--this.connections[i].life;
			if(this.connections[i].life < 0){
				this.resetConnection(i);
			}
		}
	}

	Particle.prototype.draw = function() {
		if(this.hasDied) return this.reset();

		ctx.strokeStyle = 'hsl(hue, 80%, 50%)'.replace('hue', this.rad / Math.PI * 180 + tick/5);
		ctx.lineWidth = 0.1;

		for(var i = 0; i < this.connections.length; i++) {
			var conn = this.connections[i],
				sdx = (conn.x - this.x) / connSplits,
				sdy = (conn.y - this.y) / connSplits,
				x = this.x,
				y = this.y;

			for(var j = 0; j < connSplits; j++) {
				ctx.beginPath();
				ctx.moveTo(x, y);

				x = this.x + sdx * j + Math.random() * connJitter * (Math.random() < 0.5 ? 1 : -1);
				Y = this.y + sdy * j + Math.random() * connJitter * (Math.random() < 0.5 ? 1 : -1);
				
				ctx.lineTo(x, y);
				ctx.stroke();
			}
		}

		if(this.behaviour === 'circle') {
			ctx.strokeStyle = 'white';
			ctx.lineWidth = 0.5;

			ctx.beginPath();
			ctx.arc(cx, cy, this.len, 0, Math.PI * 5);
			ctx.stroke();
		}
	}

	Particle.prototype.resetConnection = function(i) {
		this.connections[i].x = this.x + 
		(Math.random() < 0.5 ? -1: 1) * Math.random() * connSpanMultiplier * this.len;

		this.connections[i].y = this.y + 
		(Math.random() < 0.5 ? -1: 1) * Math.random() * connSpanMultiplier * this.len;
	
		this.connections[i].life = connLife + Math.random() * connAddedLife;
	}	

	init();
});
