//Disabling selectable elements code. - Not mine - Taken from stack overflow.
(function($){
    $.fn.disableSelection = function() {
        return this
                 .attr('unselectable', 'on')
                 .css('user-select', 'none')
                 .on('selectstart', false);
    };
})(jQuery);

//Simple canvas app which spawns a moving square when the user clicks.
//When document is ready start the app.
$(document).ready(function() {

	//Create canvas and context.
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");

	//Variables to hold the square stack and mouse coords.
	var squares = [];
	var mouse = {x: 0, y: 0};

	//Set to the size of window on load.
	var height = canvas.height; 
	var width = canvas.width;

	//Call the stack overflow code.
	$('body').disableSelection();

	//Run the game logic.
	run();

	//Bind a function to the click event which creates a square at the mouse coords within canvas.
	$("#canvas").on('click', function(event) {
		
		//Grab the mouse coords, accounting for the canvas not being the whole webpage.
		var xCoord = event.pageX - canvas.offsetLeft;
		var yCoord = event.pageY - canvas.offsetTop;

		//Pass the coords.
		createSquare(xCoord, yCoord);
	});

	//Handle the collision logic and drawing for square.
	function square(startX, startY, endX, endY) {
		this.startX = startX;
		this.startY = startY;

		this.endX = endX;
		this.endY = endY;

		this.move = function() {

			//Clamp X axis.
			if(this.startX > width - 10) {
				this.startX = width - 10;
				this.endX = -this.endX;
			} else if(this.startX < 10) {
				this.startX = 10;
				this.endX = -this.endX;
			}

			/*DEBUG
			console.log("Clamp");
			console.log(width);
			console.log(height);*/

			//Clamp Y axis.
			if(this.startY > height - 10) {
				this.startY = height - 10;
				this.endY = -this.endY;
			} else if(this.startY < 10) {
				this.startY = 10;
				this.endY = -this.endY;
			}

			//Jitter bugs
			/*var dir = Math.random();
			if(dir <= 0.25) {
				this.startX -= this.endX;
				this.startY -= this.endY;
			} else if(dir >= 0.25 && dir < 0.5) {
				this.startX -= this.endX;
				this.startY += this.endY;
			} else if(dir >= 0.5 && dir < 0.75) {
				this.startX += this.endX;
				this.startY += this.endY;
			} else {
				this.startX += this.endX;
				this.startY -= this.endY; 
			}*/

			//Send the cube off with the velocity X: endX Y: endY.
			this.startX += this.endX;
			this.startY += this.endY;

			//Draw the square at the provided coords.
			//Make them green.
			ctx.fillStyle = "green";
			ctx.beginPath();
			ctx.rect(this.startX, this.startY, 10, 10);
			ctx.fill();
			ctx.stroke();
			
			/*DEBUG
			console.log("Pos");
			console.log(this.startX);
			console.log(this.startY);*/

		}
	}

	//Creates a new square at coords X, Y and pushes it to the stack.
	function createSquare(x, y) {
		squares.push(new square(x, y, Math.random() * 3, Math.random() * 3));
	}

	//Run method.
	function run() {
		window.setInterval(clock, 30);
	}

	//Re-draws the squares every step - blanks off the whole canvas and draws the pushed squares
	//one after the other.
	function clock() {
		ctx.clearRect(0, 0, width, height);
		console.log("re-draw");
		for(var i = 0; i < squares.length; i++) {
			squares[i].move();
		}
	}

});