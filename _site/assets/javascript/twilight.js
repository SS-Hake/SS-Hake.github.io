$(document).ready(function () {
    //TODO:
    //Proper global variables window object.
    //Generate random rates for plane travel
    //Generate random start points for plane.
    //shooting star random start and end points.


    //Add colour functionality - Morning, besnine early morning phot
    //Transition through midday - white and deep blue
    //then evening, whatI have drarker blue purpoe and deep reds
	console.log("[+] Drawing canvas...");

    //Standard canvas setup.
	var canvas = $('#canvas')[0];
	var ctx = canvas.getContext('2d');
	var height = $('#canvas').height();
    var width = $('#canvas').width();
    //Grab the white canvas for reset on step.
    var canvasData = ctx.getImageData(0, 0, width, height);
    //Draw a white canvas and black bounding box.
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, width, height);

    var PlaneL = function() {
        //Initialize the plane on the left with initial properties.
        this.xCoord = 0;
        this.yCoord = 0;
        this.xRate = 0;
        this.yRate = 0;
    };

    PlaneL.prototype.genStartPos = function() {
        //Generates a starting position for the plane. 
        //Along the left at a random but clamped height.
        //Set the x coord to 0, it starts on the left.
        this.xCoord = 0;
        //Set the y coord to a random number between the middle and 5/6 of the height.
        this.yCoord = (Math.random() * height / 2) + height / 6;
    }

    PlaneL.prototype.genRates = function() {
        //Generate two random velocities and as such a random direction for the plane.
        //Clamped such that it will only ever be a shallow climb.
        this.xRate = (Math.random() * 2.5) + 1;
        this.yRate = (Math.random() * 0.5) + 0;
    }

    PlaneL.prototype.move = function() {
        //Add the rate of movement to the position to create movement.
        this.xCoord += this.xRate;
        this.yCoord -= this.yRate;
    }

    PlaneL.prototype.draw = function(counter) {
        //Draw the plane.
        ctx.beginPath();
        ctx.fillStyle = "#ccc";
        /*ctx.arc(x, y, 2, 0, Math.PI * 2, true);*/
        ctx.rect(this.xCoord, this.yCoord, 5, 2);
        ctx.fill();
        ctx.closePath();
        if(counter % 40 == 0) {
            //At set intervals draw a green and red box to imitate flashing navigation lights.
            //Green brighter as right hand side of plane is towards screen.
            console.log("[+] Green " + counter);
            ctx.beginPath();
            ctx.fillStyle = "#339933"; /*"#AB5C78";*/
            /*ctx.arc(x, y, 5, 0, Math.PI * 2, true);*/
            ctx.rect(this.xCoord-5, this.yCoord-5, 10, 10)
            ctx.fill();
            ctx.closePath();
        } else if (counter % 20 == 0) {
            console.log("[+] Red " + counter);
            ctx.beginPath();
            ctx.fillStyle = "#FF5050";
            /*ctx.arc(x-1, y-1, 4, 0, Math.PI * 2, true);*/
            ctx.rect(this.xCoord-2, this.yCoord-2, 4, 4)
            ctx.fill();
            ctx.closePath();
        }
    }
    //
    var Satellite = function() {
        //Initialise a satellite object - like the plane but smaller and no nav lights.
        this.xCoord = 0;
        this.yCoord = 0;
        this.xRate = 0;
        this.yRate = 0;
    };

    Satellite.prototype.genStartPos = function() {
        //Generate a start position, on the right of the screen at a random, clamped height near the top.
        this.xCoord = width;
        this.yCoord = (Math.random() * height / 4) + 0;
    }

    Satellite.prototype.genRates = function() {
        //Random like the plane, but could be shallow climb or decent.
        this.xRate = (Math.random() * 1) + 0.5;
        this.yRate = (Math.random() * 1.5) + -1;
    }

    Satellite.prototype.genVisRange = function() {
        //TODO: Add visibility to simulate iridium flares.
        //TODO: make it work on shooting stars too.
    }

    Satellite.prototype.move = function() {
        //Movement as with the plane.
        this.xCoord -= this.xRate;
        this.yCoord -= this.yRate;
    }

    Satellite.prototype.draw = function(counter) {
        //At set intervals draw different boxes to simulate shimmer through the atmosphere.
        if(counter % 2 == 0) {

            ctx.beginPath();
            ctx.fillStyle = "#ccc";
            ctx.rect(this.xCoord - 0.5, this.yCoord - 0.5, 1, 1);
            ctx.rect(this.xCoord, this.yCoord, 1, 1);
            ctx.fill();
            ctx.closePath();
        } else {

            ctx.beginPath();
            ctx.fillStyle = "#ccc";
            ctx.rect(this.xCoord - 0.5, this.yCoord, 1.4, 1);
            ctx.rect(this.xCoord, this.yCoord - 0.5, 1.4, 1);
            ctx.fill();
            ctx.closePath();
        }
    }

    var ShootingStar = function() {
        //Shooting star is a lot like the satellite but faster.
        this.xCoord = 0;
        this.yCoord = 0;
        this.xRate = 0;
        this.yRate = 0;
    }

    ShootingStar.prototype.genStartPos = function() {
        this.xCoord = width / 2;
        this.yCoord = 0;
    }

    ShootingStar.prototype.genRates = function() {
        this.xRate = 10
        this.yRate = 15;
    }

    ShootingStar.prototype.move = function() {
        this.xCoord += this.xRate;
        this.yCoord += this.yRate;
    }

    //TODO: Fix angle and box angle.
    ShootingStar.prototype.draw = function(counter) {

        if(/*counter % 2 == 0 &&*/ this.yCoord < height / 2) {
            //console.log("This.XCoord:" + this.xCoord);
            //TODO figure out the rotation to make it fly sideways.
            console.log("This.YCoord:" + this.yCoord);
            ctx.save();
            ctx.beginPath();
            ctx.translate(500, 0 + 5);
            ctx.rotate(45 * Math.PI / 180);
            ctx.rect(this.xCoord, this.yCoord, 1, 10);
            ctx.fill();
            ctx.fillStyle = "#ccc";
            ctx.closePath();
            ctx.restore();
        } else {

        }
    }

    var planeL;

    var x = 0;
    var y = 400;

    var counter = 0;
    //Generate all of the position arrays.
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

    function drawStarAlpha(x, y, counter) {
        //Draw the smallest stars near the top
        if(counter % 2 == 0) {
            //Counter interval makes them twinkle.
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
        //Draw larger twinkling stars to simulate planets.
        if(counter % 2 == 0) {

            ctx.beginPath();
            ctx.fillStyle = "#fff";
            ctx.rect(x - 0.5, y - 0.5, 2, 2);
            ctx.rect(x, y, 2, 2);
            ctx.fill();
            ctx.closePath();
        } else {
            ctx.beginPath();
            ctx.fillStyle = "#fff";
            ctx.rect(x - 0.5, y, 2, 2);
            ctx.rect(x, y - 0.5, 2, 2);
            ctx.fill();
            ctx.closePath();
        }
    }

    function generatePos(xArray, yArray, lowBound, upBound, quantity) {
        //Generate the starting position for the background stars and planets.
        //Takes params becuase the stars and planets are generated at different quadrants 
        //to simulate the higher frequency of stars away from the horizon.
        for(var i = 0; i < quantity; i++) {
            xArray[i] = Math.floor(Math.random() * width) + 0;
            yArray[i] = Math.floor(Math.random() * upBound) + lowBound;
        }
    }

    //init;
    function init() {

        console.log("[+] Init...");
        //Generate all of the background positions.
        generatePos(starTopPosX, starTopPosY, 0, height / 4, 25);
        generatePos(starAlphaPosX, starAlphaPosY, 0, height / 2, 25);
        generatePos(starBetaPosX, starBetaPosY, 0, height / 2, 25);
        generatePos(planetPosX, planetPosY, 0, height / 1.2, 8);

        generatePos(starMidPosX, starMidPosY, height / 2, height / 1.1, 20);
        //Initialize all of the moving objects.
        //TODO: concatenate these.
        PlaneLeft = new PlaneL();

        PlaneLeft.genStartPos();
        PlaneLeft.genRates();

        SatRight = new Satellite();

        SatRight.genStartPos();
        SatRight.genRates();

        ShootStar = new ShootingStar();

        //ShootStar.genStartPos();
        //ShootStar.genRates();
        //console.log("Shoot start Coords: x: " + ShootStar.xCoord + " y: " +  ShootStar.yCoord);

        //console.log("yRate = " + PlaneLeft.yRate);
        //console.log("YCoord = " + PlaneLeft.yCoord);
        //PlaneLeft.print();
        //console.log("YCoord = " + PlaneLeft.yCoord);
    }

    init();

    function drawFromArray(xArray, yArray, funcName, counter) {
        //Iterate through the star arrays for drawing purposes.
        for(var i = 0; i < xArray.length; i++) {   
            funcName(xArray[i], yArray[i], counter);
        }
    }

    //Loop
    setInterval(function() {
    	counter += 1;
        //Redraw white for new step.
	    updateCanvas();
        //Iterate through all of the stars.
        drawFromArray(starTopPosX, starTopPosY, drawStarAlpha, counter);
        drawFromArray(starAlphaPosX, starAlphaPosY, drawStarAlpha, counter);
        drawFromArray(starBetaPosX, starBetaPosY, drawStarBeta, counter);
        drawFromArray(planetPosX, planetPosY, drawPlanet, counter);
        drawFromArray(starMidPosX, starMidPosY, drawStarAlpha, counter);
        //Move and draw the moving objects.
        PlaneLeft.move();
        PlaneLeft.draw(counter);

        SatRight.move();
        SatRight.draw();

        //ShootStar.move();
        //ShootStar.draw();

        //Clamp the moving obejcts and redraw when they leave screen./
	    if(PlaneLeft.xCoord > ((Math.random() * (width * 4)) + 1000) || PlaneLeft.yCoord < -200) { 
            console.log(PlaneLeft.xCoord);
            PlaneLeft.genStartPos();
            PlaneLeft.genRates();
            counter = 0;
        };

        if(SatRight.xCoord < -((Math.random() * (width * 2)) + 1000) || SatRight.yCoord < -200) {
            console.log(SatRight.xCoord);
            SatRight.genStartPos();
            SatRight.genRates();
        }
    }, 60);

});

//0xKB6F3lnc4h
