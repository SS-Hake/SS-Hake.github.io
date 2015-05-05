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


    var PlaneL = function() {
        this.xCoord = 0;
        this.yCoord = 0;
        this.xRate = 0;
        this.yRate = 0;
    };

    PlaneL.prototype.genStartPos = function() {
        this.xCoord = 0;
        this.yCoord = (Math.random() * height / 2) + height / 6;
    }

    PlaneL.prototype.genRates = function() {
        this.xRate = (Math.random() * 2.5) + 1;
        this.yRate = (Math.random() * 0.5) + 0;
    }

    PlaneL.prototype.move = function() {
        this.xCoord += this.xRate;
        this.yCoord -= this.yRate;
    }

    PlaneL.prototype.draw = function(counter) {

        ctx.beginPath();
        ctx.fillStyle = "#ccc";
        /*ctx.arc(x, y, 2, 0, Math.PI * 2, true);*/
        ctx.rect(this.xCoord, this.yCoord, 5, 2);
        ctx.fill();
        ctx.closePath();

        if(counter % 40 == 0) {
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
        this.xCoord = 0;
        this.yCoord = 0;
        this.xRate = 0;
        this.yRate = 0;
    };

    Satellite.prototype.genStartPos = function() {
        this.xCoord = 1000;
        this.yCoord = (Math.random() * height / 4) + 0;
    }

    Satellite.prototype.genRates = function() {
        this.xRate = (Math.random() * 1) + 0.5;
        this.yRate = (Math.random() * 1.5) + -1;
    }

    Satellite.prototype.genVisRange = function() {

    }

    Satellite.prototype.move = function() {
        this.xCoord -= this.xRate;
        this.yCoord -= this.yRate;
    }

    Satellite.prototype.draw = function(counter) {

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

        for(var i = 0; i < quantity; i++) {
            xArray[i] = Math.floor(Math.random() * width) + 0;
            yArray[i] = Math.floor(Math.random() * upBound) + lowBound;
        }
    }

    //init;
    function init() {

        console.log("[+] Init...");

        generatePos(starTopPosX, starTopPosY, 0, height / 4, 25);
        generatePos(starAlphaPosX, starAlphaPosY, 0, height / 2, 25);
        generatePos(starBetaPosX, starBetaPosY, 0, height / 2, 25);
        generatePos(planetPosX, planetPosY, 0, height / 1.2, 8);

        generatePos(starMidPosX, starMidPosY, height / 2, height / 1.1, 20);

        PlaneLeft = new PlaneL();

        PlaneLeft.genStartPos();
        PlaneLeft.genRates();

        SatRight = new Satellite();

        SatRight.genStartPos();
        SatRight.genRates();

        ShootStar = new ShootingStar();

        ShootStar.genStartPos();
        ShootStar.genRates();
        console.log("Shoot start Coords: x: " + ShootStar.xCoord + " y: " +  ShootStar.yCoord);

        //console.log("yRate = " + PlaneLeft.yRate);
        //console.log("YCoord = " + PlaneLeft.yCoord);
        //PlaneLeft.print();
        //console.log("YCoord = " + PlaneLeft.yCoord);
    }

    init();

    function drawFromArray(xArray, yArray, funcName, counter) {

        for(var i = 0; i < xArray.length; i++) {
            funcName(xArray[i], yArray[i], counter);
        }
    }

    //Loop
    setInterval(function() {
    	counter += 1;

	    updateCanvas();

        drawFromArray(starTopPosX, starTopPosY, drawStarAlpha, counter);
        drawFromArray(starAlphaPosX, starAlphaPosY, drawStarAlpha, counter);
        drawFromArray(starBetaPosX, starBetaPosY, drawStarBeta, counter);
        drawFromArray(planetPosX, planetPosY, drawPlanet, counter);
        drawFromArray(starMidPosX, starMidPosY, drawStarAlpha, counter);

        PlaneLeft.move();
        PlaneLeft.draw(counter);

        SatRight.move();
        SatRight.draw();

        ShootStar.move();
        ShootStar.draw();


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

