$(document).ready(function() {

	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");

	var width = canvas.width;
	var height = canvas.height;

	var size = 8,
		speed = 10,
		boxes = [],
		totBoxes = 150;

	function init() {

		for(var i = 0; i < totBoxes; i++) {

			boxes.push({
				x: Math.random() * width,
				y: Math.random() * height,
				xVel: (Math.random() * 2) + 1,//Math.random() * 1.5 - 1,
				yVel: (Math.random() * 2) + 1,//Math.random() * 1.5 - 1,
				color: '#' + (Math.random() * 0xeeeeee + 0x000000 | 0).toString(16)
			});
		}
		setInterval(update, 40);
	}

	function calcDist(vel1, vel2) {

		var x = Math.abs(vel1.x - vel2.x);
		var y = Math.abs(vel1.y - vel2.y);

		return Math.sqrt(x * x + y * y);
	}


	function checkCollision(i) {

		var currentBox = boxes[i];

		//Clamp x axis
		if(currentBox.x > width) {
			currentBox.x = 0;
		} else if(currentBox.x < 0) {
			currentBox.x = width;
		}

		if(currentBox.y > height) {
			currentBox.y = 0;
		} else if(currentBox.y < 0) {
			currentBox.y = height;
		}
	}

	function addForce(i, d) {

		var currentBox = boxes[i];

		currentBox.xVel += d.x;
		currentBox.yVel += d.y;

		sizeChange = calcDist({
			x: 0,
			y: 0
		}, {
			x: currentBox.xVel,
			y: currentBox.yVel
		});

		currentBox.xVel = currentBox.xVel / sizeChange;
		currentBox.yVel = currentBox.yVel / sizeChange;
	}

	function behaviour(box) {

		var currentBox = boxes[box];

		pCenter = { 
			x: 0,
			y: 0
		};
		
		groupCenter = { 
			x: 0,
			y: 0
		};

		pVel = { 
			x: 0,
			y: 0
		};

		// = groupCenter = pVel = */

		var counter = 0;

		for(var i = 0; i < boxes.length; i++) {
			var loopBox = boxes[i];
			if(i != box) {
				var dist = calcDist(currentBox, loopBox);

				if(dist > 0 && dist < 100) {
					counter++;

					//Handle group interaction.
					pCenter.x += loopBox.x;
					pCenter.y += loopBox.y;

					//Align velocity.
					pVel.x += loopBox.xVel;
					pVel.y += loopBox.yVel;

					if(calcDist(loopBox, currentBox) < 25) {
						groupCenter.x -= (loopBox.x - currentBox.x);
						groupCenter.y -= (loopBox.y - currentBox.y);
					}
				}
			}
		}

		if(counter > 0) {
			pCenter.x = pCenter.x / counter;
			pCenter.y = pCenter.y / counter;

			pCenter.x = (pCenter.x - currentBox.x) / 100;
			pCenter.y = (pCenter.y - currentBox.y) / 100;

			pVel.x = pVel.x / counter;
			pVel.y = pVel.y / counter;

			groupCenter.x /= counter;
			groupCenter.y /= counter;
		}

		addForce(box, pCenter);
		addForce(box, pVel);
		addForce(box, groupCenter);
	}	

	function update() {
		clear();

		for(var i = 0; i < boxes.length; i++) {

			var currentBox = boxes[i];
			ctx.beginPath();
			ctx.fillStyle = currentBox.color;

			ctx.lineWidth = 2;
			ctx.moveTo(currentBox.x, currentBox.y);
			/*  Changing the order of this made it less jumpy.
			currentBox.x += currentBox.xVel * speed;
			currentBox.y += currentBox.yVel * speed;*/

			behaviour(i);

			ctx.arc(currentBox.x, currentBox.y, 5, 0, Math.PI * 2);
			/*ctx.lineTo(currentBox.x, currentBox.y);*/
			ctx.fill();
			currentBox.x += currentBox.xVel * speed;
			currentBox.y += currentBox.yVel * speed;

			checkCollision(i);
		}
	}

	function clear(){

		ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
		ctx.beginPath();
		ctx.rect(0, 0, width, height);
		ctx.stroke();
		ctx.fill();
	}

	init();
});

