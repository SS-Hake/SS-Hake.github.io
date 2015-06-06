
$(document).ready(function () {

  //Declare and initialise canvas.
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var height = canvas.height;
	var width = canvas.width;

	var time = 0,
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

	function colors(time, i, j) {
		red = Math.floor((Math.sin(time) * j * i) % 255);
		green = Math.floor((Math.sin(time * 0.5) * j * i) % 255);
		blue = Math.floor((Math.sin(time * 0.25) * j * i) % 255);
	}

	function circlePosition(time, i, j, m, n) {
		x = width / 2 + j * m * Math.cos(time + j / i);
		y = height / 2 + j * n * Math.sin(time + i / j);
	}

	function update() {
		m = width * 0.5 / s;
		n = height * 0.5 / t;

		ctx.fillStyle = "rgba(255, 255, 255, 0.9)";

		for(var i = 0; i < s; i++) {
			for(var j = 0; j < t; j++) {

				ctx.beginPath();
				var c = i * j * cStep;

				colors(time, i, j);

				circlePosition(time, i, j, m, n);
				
				ctx.fillStyle = "rgb(" + red + "," + green + "," + blue + ")";
				ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
				ctx.fillRect(0,0, 5, 5);
				ctx.fill();
			}
		}
		time += 0.02;
		requestAnimationFrame(update);
		console.log("looped");
	}

	requestAnimationFrame(update);

});