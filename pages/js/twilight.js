$(document).ready(function () {


	console.log("[+] Drawing canvas...");

	var canvas = $('#canvas')[0];
	var ctx = canvas.getContext('2d');

	var height = $('#canvas').height();
    var width = $('#canvas').width();

    var canvasData = ctx.getImageData(0, 0, width, height);

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, width, height);

    var x = 0;
    var y = 400;

    var counter = 0;

    function drawPixel(x, y, r, g, b, a) {

    	var index = (x + y * width) * 4;

    	canvasData.data[index + 0] = r;
    	canvasData.data[index + 1] = g;
    	canvasData.data[index + 2] = b;
    	canvasData.data[index + 3] = a;
    }

    function updateCanvas() {
    	ctx.putImageData(canvasData, 0, 0);
    }

    function drawPlane(x, y, counter) {

    	ctx.beginPath();
		ctx.fillStyle = "#ccc";
		/*ctx.arc(x, y, 2, 0, Math.PI * 2, true);*/
		ctx.rect(x, y, 5, 2);
		ctx.fill();
		ctx.closePath();

    	if(counter % 20 == 0) {

    		console.log("[+] Red" + counter)
    		ctx.beginPath();
			ctx.fillStyle = "#FF5050"; /*"#AB5C78";*/
			/*ctx.arc(x, y, 5, 0, Math.PI * 2, true);*/
			ctx.rect(x-5, y-5, 10, 10)
			ctx.fill();
			ctx.closePath();
    	} else if (counter % 15 == 0) {

    		console.log("[+] Green" + counter)
	    	ctx.beginPath();
			ctx.fillStyle = "#339933";
			/*ctx.arc(x-1, y-1, 4, 0, Math.PI * 2, true);*/
			ctx.rect(x-2, y-2, 4, 4)
			ctx.fill();
			ctx.closePath();
		}

    }

    function drawPlanes(startX, startY, rateX, rateY, counter) {

    }

    function drawStar(x, y, counter) {

    	ctx.beginPath();
		ctx.fillStyle = "#ccc";
		ctx.rect(x, y, 5, 2);
		ctx.fill();
		ctx.closePath();

    }

    setInterval(function() {

    	x += 2;
    	y -= 0.2;
    	counter += 1;

    	ctx.fillStyle = "white";
	    ctx.fillRect(0, 0, width, height);
	    ctx.strokeStyle = "black";
	    ctx.strokeRect(0, 0, width, height);

    	/*for(var i = 1; i < 5; i++) {
    		console.log("[+] Drawing pixels...")
	    	drawPixel(i+1, 5, 255, 0, 0, 255);
	    }

	    for(var i = 0; i < 4; i++) {
	    	console.log("[+] Drawing pixels 2...")
	    	drawPixel(i, 5, 255, 0, 255, 255);
	    }
*/
	    updateCanvas();

	    drawPlane(x, y, counter);

	    if (x > width || y > height) { x = 0; y = 400; counter = 0;};

	    /* If counter is greater than 10000 reset it.
			x and y value resets can be handles in methods.
			move x and y from draw into methods.
	    */
    }, 60);

});


//Bounds y 0 and 0.5

//drawplanes(ratex, ratey, counter)

//x += ratex
//y += ratey

//start between 0 and 500 y
//0 or 1000 x


//stars
/*
 // Initialise an empty canvas and place it on the page
      var canvas = document.createElement("canvas");
      var context = canvas.getContext("2d");
      canvas.width = 800;
      canvas.height = 500;
      document.body.appendChild(canvas);

      // Inital starting position
      var posX = 20,
          posY = 100;

      context.fillStyle = "black";
      context.fillRect(0,0,canvas.width, canvas.height);

      // Draw shapes on the canvas using an interval of 30ms
      setInterval(function() {
        // Erase canvas
        context.fillStyle = "black";
        context.fillRect(0,0,canvas.width, canvas.height);
        
        posX += 1;
        posY += 0.25;

        // Draw a circle particle on the canvas
        context.beginPath();
        context.fillStyle = "white";
        // After setting the fill style, draw an arc on the canvas
        context.arc(posX, posY, 10, 0, Math.PI*2, true); 
        context.closePath();
        context.fill();

      }, 30);
      

    };*/