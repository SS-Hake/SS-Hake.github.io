$(document).ready(function () {

  //Declare and initialise canvas.
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var height = canvas.height;
	var width = canvas.width;
	//Declare and initialise some variables.
	var counter = 0,
		m,
		n,
		s = 15,
		t = s,
		radius = 2,
		baseR = 2;

	var cStep = 255 / s * t;

	var red,
		green,
		blue;

	var x,
		y;

	function colors(counter, i, j) {
		//Generate new colour each step based on counter's value.
		//Colour values will undulate with a sin-ish wave graph.
		red = Math.floor((Math.sin(counter) * j * i) % 255);
		green = Math.floor((Math.sin(counter * 0.5) * j * i) % 255);
		blue = Math.floor((Math.sin(counter * 0.25) * j * i) % 255);
	}

	function circlePosition(counter, i, j, m, n) {
		//Generates new x and y values (position) every step, changes with each new
		//counter value.
		x = width / 2 + j * m * Math.cos(counter + j / i);
		y = height / 2 + j * n * Math.sin(counter + i / j);
	}

	function update() {
		m = width * 0.5 / s;
		n = height * 0.5 / t;
		//This was for drawing a background each step to give smooth
		//animation, but I thought it looked cooler without it in the end.
		//ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
		//ctx.fillRect(0, 0, width, height);
		//Loop through the orbs.
		//Two loops for circular motion.
		for(var i = 0; i < s; i++) {
			for(var j = 0; j < t; j++) {

				ctx.beginPath();
				var c = i * j * cStep;
				//Set the colours' next step.
				colors(counter, i, j);
				//Set the circles' next step.
				circlePosition(counter, i, j, m, n);
				//Assign the new colours.
				ctx.fillStyle = "rgb(" + red + "," + green + "," + blue + ")";
				//Draw the circle at the next step.
				ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
				ctx.fill();
			}
		}
		//Increment counter for next loop.
		counter += 0.02;
		//Loop again.
		requestAnimationFrame(update);
	}
	requestAnimationFrame(update);
});