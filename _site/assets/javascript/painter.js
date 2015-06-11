//Disabling selectable elements code. - Not mine - Taken from stack overflow.
//I do this in jquery and not css because css is not standardised.
(function($){
    $.fn.disableSelection = function() {
        return this
                 .attr('unselectable', 'on')
                 .css('user-select', 'none')
                 .on('selectstart', false);
    };
})(jQuery);

$(document).ready(function() {

	//Usual canvas set up.
    var canvas = $("#canvas")[0],
    	ctx = canvas.getContext("2d"),
    	width = canvas.width,
    	height = canvas.height;

    var minRadius = 1,
    	maxRadius = 50,
    	startRadius = 8,
    	increment = 2,
    	radiusSpan = $('.radius'),
    	radiusPlus = $('.radius-plus'),
    	radiusMinus = $('.radius-minus');
    	colorCircles = $('.color');

    var radius = 10;
    var drawing = false;
    ctx.lineWidth = radius * 2; 
    radiusSpan.text(radius);

    //Call the stack overflow code.
	$('body').disableSelection();
	function draw(event) {
		if(drawing) {
			//Grab the mouse coords, accounting for the canvas not being the whole webpage.
			var xCoord = event.pageX - canvas.offsetLeft;
			var yCoord = event.pageY - canvas.offsetTop;

			ctx.lineTo(xCoord, yCoord);
			ctx.stroke();
			ctx.beginPath();
			ctx.arc(xCoord, yCoord, radius, 0, Math.PI * 2);
			ctx.fill();
			ctx.beginPath();
			ctx.moveTo(xCoord, yCoord);
		}
	}

	//Interaction ------------------------------------------------------------------------
	//Canvas drawing interaction.
    $("#canvas").on('mousemove', function(event) {
    	draw(event);
    });

	$('#canvas').on('mousedown', function(event) {
		//Drawing is true, so we can draw a line while mouse of down.
		drawing = true;
		//Draw just one dot if clicked
		draw(event);

	});

	$('#canvas').on('mouseup', function() {
		//Stop drawing a line.
		drawing = false;
		//clear the path.
		ctx.beginPath();
	});

	//DOM radius settings.
	var setRadius = function(newRadius) {
		if(newRadius < minRadius) {
			newRadius = minRadius;
		} else if (newRadius > maxRadius) {
			newRadius = maxRadius;
		} 
			
		radius = newRadius;
		ctx.lineWidth = radius * 2;
		radiusSpan.text(radius);
	}

	radiusMinus.on('click', function() {
		setRadius(radius - increment);
	});

	radiusPlus.on('click', function() {
		setRadius(radius + increment);
	});

	for(var i = 0, n = colorCircles.length; i < n; i++) {
		var currentCircle = colorCircles[i];

		currentCircle.addEventListener('click', setCurrentColor(event));
		/*currentCircle.on('click', function(event) {
			setCurrentColor(event);
		});*/
	}

	/*var currentCircle = colorCircles*/

	function setCurrentColor(event) {
		console.log(event);
		var circle = event.target;

		setColor(getComputedStyle(circle).backgroundColor);

		circle.className += 'active';
	}

	function setColor(color) {
		ctx.fillStyle = color;
		ctx.strokeStyle = color;
		console.log(color);
		var active = $('.active')[0];
		if(active) {
			active.className = 'color';
		}
	}
});