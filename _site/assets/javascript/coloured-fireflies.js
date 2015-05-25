$(document).ready(function() {

	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");

	var width = canvas.width;
	var height = canvas.height;

	var startLines = 4,
		startWidth = 10,
		velocity = 5,
		minDistance = 10,
		maxDistance = 25,
		maxLines = 100;

	var lines = [],
		frame = 0,
		timer = 0;

	var directions = [
			//velocity in x and y axis.
			[ 0, 1 ],
   			[ 1, 0 ],
    		[ 0, -1 ],
   			[ -1, 0 ],

   			[ .3, .3 ],
   			[ .3, -.3 ],
   			[ -.3, .3 ],
   			[ -.3, -.3]
		];

	var starterLine = {
		x: width / 2,
		y: height / 2,
		xVel: 0,
		yVel: 0,
		width: startWidth
	};

	function init() {

		for(var i = 0; i < startLines; i++) {
			lines.push(new Line(starterLine));
			console.log("pushed");
		}

		ctx.fillStyle = '#ccc';
		ctx.fillRect(0, 0, width, height);
		console.log("drawing box");
		ctx.lineCap = 'round';
	}

	function getColour(x) {
		return 'hsl(hue, 100%, 50%)'.replace('hue', x / width * 360 + frame);
	}

	function animate() {
		window.requestAnimationFrame(animate);

		frame++;

		ctx.shadowBlur = 0;
		ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
		ctx.fillRect(0, 0, width, height);
		ctx.shadowBlur = 0.5;

		for(var i = 0; i < lines.length; i++) {
			
			if(lines[i].step()) {
				lines.splice(i, 1);
				--i;
			}
		}

		timer++;

		if(lines.length < maxLines && timer > 10 && Math.random() < .5) {
			timer = 0;

			lines.push(new Line(starterLine));
			ctx.fillStyle = ctx.shadowColor = getColour(starterLine.x);
			ctx.beginPath();

			ctx.arc(starterLine.x, starterLine.y, startWidth, 0, Math.PI * 2);
			ctx.fill();
		}
	}

	function Line(parentObj) {
		console.log("this Line");
		this.x = parentObj.x | 0;
		this.y = parentObj.y | 0;
		this.width = parentObj.width * 0.9;

		while((this.xVel === -parent.xVel && this.yVel === -parent.yVel) || (this.xVel === parent.xVel && this.yVel === parent.yVel)) {
			var direction = directions[ (Math.random() * directions.length ) | 0];
			this.xVel = direction[0];
			this.yVel = direction[1];
		}

		console.log(velocity);
		console.log(this.yVel)
		this.xVel *= velocity;
		this.yVel *= velocity;

		this.distance = (Math.random() * (maxDistance - minDistance) + minDistance);
	}

	Line.prototype.step = function() {
		var del = false;

		var lastX = this.x;
		var lastY = this.y;

		this.x += this.xVel;
		this.y += this.yVel;

		--this.distance;

		if(this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
			del = true;
		}

		if(this.distance <= 0 && this.width > 1) {
			this.distance = Math.random() * (maxDistance - minDistance) + minDistance;

			if(lines.length < maxLines) {
				lines.push(new Line(this));
			}
			if(lines.length < maxLines && Math.random() < 0.5) {
				lines.push(new Line(this));
			}

			if(Math.random() < 0.2) {
				del = true;
			}
		}

		ctx.strokeStyle = ctx.shadowColor = getColour(this.x);
		ctx.beginPath();
		ctx.lineWidth = this.width;
		ctx.moveTo(this.x, this.y);
		ctx.lineTo(lastX, lastY);
		ctx.stroke();

		if(del) return true;
	}

	init();
	animate();
});