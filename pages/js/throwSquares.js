//Disabling selectable elements code. - Not mine - Taken from stack overflow.
(function($){
    $.fn.disableSelection = function() {
        return this
                 .attr('unselectable', 'on')
                 .css('user-select', 'none')
                 .on('selectstart', false);
    };
})(jQuery);

$(document).ready(function() {

	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");

	ctx.fillStyle="skyblue";
	ctx.strokeStyle="lightgray";
	ctx.lineWidth=3;

	var squares = [];
	var mouse = {x: 0, y: 0};

	var height = window.innerHeight;
	var width = window.innerWidth;

	canvas.height = height;
	canvas.width = width;

	//Call the stack overflow code.
	$('body').disableSelection();

	run();

	$("#canvas").on('click', function(event) {
		var xCoord = event.pageX - canvas.offsetLeft;
		var yCoord = event.pageY - canvas.offsetTop;

		createSquare(xCoord, yCoord);
	});

	$('#canvas').on('mousemove', function(event) {
		mouse.x = event.pageX - canvas.offsetLeft;
		mouse.y = event.pageY - canvas.offsetTop;
	});

	function square(startX, startY, endX, endY) {
		this.startX = startX;
		this.startY = startY;

		this.endX = endX;
		this.endY = endY;

		this.move = function() {

			//Clamp X axis.
			if(this.startX > width) {
				this.startX = width - 10;
				this.endX = -this.endX;
			} else if(this.startX < 10) {
				this.startX = 10;
				this.endX = -this.endX;
			}
/*			DEBUG
			console.log("Clamp");
			console.log(width);
			console.log(height);*/

			if(this.startY > height -10) {
				this.startY = height - 10;
				this.endY = -this.endY;
			} else if(this.startY < 10) {
				this.startY = 10;
				this.endY = -this.endY;
			}

			this.startX += this.endX;
			this.startY += this.endY;

			ctx.beginPath();
			ctx.rect(this.startX, this.startY, 10, 10);
			ctx.fill();
			ctx.stroke();
/*			
			DEBUG
			console.log("Pos");
			console.log(this.startX);
			console.log(this.startY);*/

		}
	}

	function createSquare(x, y) {
		squares.push(new square(x, y, Math.random() * 5, Math.random() * 5));
	}

	//Functions to be used in assignments.
	function run() {
		window.setInterval(clock, 30);
	}

	function clock() {
		ctx.clearRect(0, 0, width, height);
		console.log("re-draw");
		for(var i = 0; i < squares.length; i++) {
			squares[i].move();
		}
	}

	run();


});