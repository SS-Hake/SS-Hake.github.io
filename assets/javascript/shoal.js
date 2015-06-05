$(document).ready(function() {
	//Declare and initialise canvas.
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var width = canvas.width;
	var height = canvas.height;

	//General variables for later use. size in px, speed, empty array for boxes and upper limit
	//for amount of boxes.
	var size = 8,
		speed = 10,
		boxes = [],
		totBoxes = 150;

	function init() {
		//Init function, fills box array with boxes at random position,
		//random speed & direction, and random color. (I set to eeeeee, 
		//because I dont want white boxes at ffffff or near.)
		for(var i = 0; i < totBoxes; i++) {
			boxes.push({
				x: Math.random() * width,
				y: Math.random() * height,
				xVel: (Math.random() * 2) + 1,//Math.random() * 1.5 - 1,
				yVel: (Math.random() * 2) + 1,//Math.random() * 1.5 - 1,
				color: '#' + (Math.random() * 0xeeeeee + 0x000000 | 0).toString(16)
			});
		}
		//run update ever 40ms.
		setInterval(update, 40);
	}

	function calcDist(vel1, vel2) {
		//returns the distance between two boxes using pythag.
		var x = Math.abs(vel1.x - vel2.x);
		var y = Math.abs(vel1.y - vel2.y);

		return Math.sqrt(x * x + y * y);
	}


	function checkCollision(i) {
		//If the boxes hit the walls, change vel accordingly to simulate bounce.
		var currentBox = boxes[i];

		//Clamp x axis
		if(currentBox.x > width) {
			currentBox.x = 0;
		} else if(currentBox.x < 0) {
			currentBox.x = width;
		}
		//Clamp Y axis.
		if(currentBox.y > height) {
			currentBox.y = 0;
		} else if(currentBox.y < 0) {
			currentBox.y = height;
		}
	}

	function addForce(i, d) {
		//d influences box velocity, box velocity affected by position of box in screen.
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
		//Update box attributes
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
		//Update box vel based on box proximity to others.
		addForce(box, pCenter);
		addForce(box, pVel);
		addForce(box, groupCenter);
	}	

	function update() {
		//Update function runs every step.
		//Draw a rectangle every step to erase old image.
		clear();

		for(var i = 0; i < boxes.length; i++) {
			//Draw all of the boxes at their current position.
			var currentBox = boxes[i];
			ctx.beginPath();
			ctx.fillStyle = currentBox.color;
			ctx.lineWidth = 2;
			ctx.moveTo(currentBox.x, currentBox.y);
			/*  Changing the order of this made it less jumpy.
			currentBox.x += currentBox.xVel * speed;
			currentBox.y += currentBox.yVel * speed;*/
			//update box attributes for next step.
			behaviour(i);
			//As of completion I have changed this to circles because it looks better. :)
			ctx.arc(currentBox.x, currentBox.y, 5, 0, Math.PI * 2);
			/*ctx.lineTo(currentBox.x, currentBox.y);*/ //Enable this for circle tails showing orientation.
			ctx.fill();
			//Move the boxes for next time
			currentBox.x += currentBox.xVel * speed;
			currentBox.y += currentBox.yVel * speed;
			//Check for bouncing.
			checkCollision(i);
		}
	}

	function clear(){
		//Draws a filled white rectangle the size of the canvas.
		ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
		ctx.beginPath();
		ctx.rect(0, 0, width, height);
		ctx.stroke();
		ctx.fill();
	}

	init();
});

