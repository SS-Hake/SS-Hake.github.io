$(document).ready(function () {


    //TODO:
    //Proper global variables window object.
    //Generate random rates for plane travel
    //Generate random start points for plane.
    //shooting star random start and end points.
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

    var xRate = 2;
    var yRate = 0.2;

    var counter = 0;

    var starTopPosX = [];
    var starTopPosY = [];
    var starAlphaPosX = [];
    var starAlphaPosY = [];
    var starBetaPosX = [];
    var starBetaPosY = [];
    var starMidPosX = [];
    var starMidPosY = [];
    var planetPosX = [];
    var planetPosY = [];

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

    	if(counter % 40 == 0) {

            //Green brighter as right hand side of plane is towards screen.

    		console.log("[+] Green" + counter);
    		ctx.beginPath();
			ctx.fillStyle = "#339933"; /*"#AB5C78";*/
			/*ctx.arc(x, y, 5, 0, Math.PI * 2, true);*/
			ctx.rect(x-5, y-5, 10, 10)
			ctx.fill();
			ctx.closePath();
    	} else if (counter % 20 == 0) {

            console.log("[+] Red" + counter);
	    	ctx.beginPath();
			ctx.fillStyle = "#FF5050";
			/*ctx.arc(x-1, y-1, 4, 0, Math.PI * 2, true);*/
			ctx.rect(x-2, y-2, 4, 4)
			ctx.fill();
			ctx.closePath();
		}

    }

    function drawPlanes(startX, startY, rateX, rateY, counter) {

    }

    function drawStarAlpha(x, y, counter) {

        if(counter % 2 == 0) {

            ctx.beginPath();
            ctx.fillStyle = "#ccc";
            ctx.rect(x - 0.5, y - 0.5, 1, 1);
            ctx.rect(x, y, 1, 1);
            ctx.fill();
            ctx.closePath();
        } else {

        	ctx.beginPath();
    		ctx.fillStyle = "#ccc";
    		ctx.rect(x - 0.5, y, 1.4, 1);
            ctx.rect(x, y - 0.5, 1.4, 1);
    		ctx.fill();
    		ctx.closePath();
        }

    }

    function drawStarBeta(x, y, counter) {

        if(counter % 4 == 0) {

            ctx.beginPath();
            ctx.fillStyle = "#ccc";
            ctx.rect(x - 0.5, y - 0.5, 1, 1);
            ctx.rect(x, y, 1, 1);
            ctx.fill();
            ctx.closePath();
        } else {

            ctx.beginPath();
            ctx.fillStyle = "#ccc";
            ctx.rect(x - 0.5, y, 1.4, 1);
            ctx.rect(x, y - 0.5, 1.4, 1);
            ctx.fill();
            ctx.closePath();
        }
    }    

    function drawPlanet(x, y, counter) {

        if(counter % 2 == 0) {

            ctx.beginPath();
            ctx.fillStyle = "#fff";
            ctx.rect(x - 0.5, y - 1, 2, 2);
            ctx.rect(x, y, 2, 2);
            ctx.fill();
            ctx.closePath();
        } else {
            console.log("[+] Drawing beta...");
            ctx.beginPath();
            ctx.fillStyle = "#fff";
            ctx.rect(x - 0.5, y, 2, 2);
            ctx.rect(x, y - 0.5, 2, 2);
            ctx.fill();
            ctx.closePath();
            
        }

    }

    function generateRates() {
        xRate = Math.floor(Math.random() * 2.5) + 1;
        yRate = Math.floor(Math.random() * 1)  + 0;
    }

    function generatePos(xArray, yArray, lowBound, upBound, quantity) {

        for(var i = 0; i < quantity; i++) {
            xArray[i] = Math.floor(Math.random() * width) + 0;
            yArray[i] = Math.floor(Math.random() * upBound) + lowBound;
        }
    }

    function init() {

        console.log("[+] Init...");

        generatePos(starTopPosX, starTopPosY, 0, height / 4, 25);
        generatePos(starAlphaPosX, starAlphaPosY, 0, height / 2, 25);
        generatePos(starBetaPosX, starBetaPosY, 0, height / 2, 25);

        generatePos(planetPosX, planetPosY, 0, height / 1.2, 8);

        generatePos(starMidPosX, starMidPosY, height / 2, height / 1.1, 20);
        console.log(starAlphaPosY[2]);

    }

    init();

    function drawFromArray(xArray, yArray, funcName, counter) {

        for(var i = 0; i < xArray.length; i++) {
            funcName(xArray[i], yArray[i], counter);
        }
    }

    setInterval(function() {

    	x += xRate;
    	y -= yRate;
    	counter += 1;

    	/*ctx.fillStyle = "white";
	    ctx.fillRect(0, 0, width, height);
	    ctx.strokeStyle = "black";
	    ctx.strokeRect(0, 0, width, height);*/

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

        /*for(var i = 0; i < starAlphaPosX.length; i++) {
            drawStarAlpha(starAlphaPosX[i], starAlphaPosY[i], counter);
        }
        for(var i = 0; i < starAlphaPosX.length; i++) {
            drawStarBeta(starBetaPosX[i], starBetaPosY[i], counter);
        }
        for(var i = 0; i < planetPosX.length; i++) {
            drawPlanet(planetPosX[i], planetPosY[i], counter);
        }*/

        drawFromArray(starTopPosX, starTopPosY, drawStarAlpha, counter);
        drawFromArray(starAlphaPosX, starAlphaPosY, drawStarAlpha, counter);
        drawFromArray(starBetaPosX, starBetaPosY, drawStarBeta, counter);
        drawFromArray(planetPosX, planetPosY, drawPlanet, counter);
        drawFromArray(starMidPosX, starMidPosY, drawStarAlpha, counter);


        /*drawStar(200, 200, counter);
        drawStar(250, 500, counter);
        drawStar(100, 400, counter);
        drawStar(200, 600, counter);
        drawStar(150, 300, counter);
    */
        //drawPlanet(400, 400, counter);

        //generateStars(0, 500, 5, counter);

	    if (x > width || y > height) { x = 0; y = 400; counter = 0; generateRates();};

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