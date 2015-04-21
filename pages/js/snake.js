$(document).ready(function() {

    //Declare and initislise canvas.
    var canvas = $("#canvas")[0];
    var ctx = canvas.getContext("2d");
    var height = $("#canvas").height();
    var width = $("#canvas").width();

    //Holds the snake cells as the square array did before.
	var snakeArray;

    var dir;

    var food;

    var score;
    //Cell height and width are the same so I combine them here for simplicity.
    var cellHW = 10;

    function init() {

        console.log("[+] Init...")
        dir = "right";
        constructSnake();
        makeFood();

        score = 0;

        if(typeof loop != "undefined") clearInterval(loop);

        loop = setInterval(draw, 60);

    }
    init();

    function constructSnake() {
        
        var length = 5;
        snakeArray = [];

        //Count down to 0 from length.
        for(var i = length - 1; i >= 0; i--) {
            snakeArray.push({x:i, y:0});
        }
    }

    function makeFood() {
        food = { x: Math.round(Math.random() * (width - cellHW) / cellHW),
                 y: Math.round(Math.random() * (height - cellHW) / cellHW) };
    }

    function draw() {

        console.log("[+] Drawing...")
        //Draw the canvas.
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, width, height);
        ctx.strokeStyle = "black";
        ctx.strokeRect(0, 0, width, height);

        //Might need to refactor this.
        var nx = snakeArray[0].x;
        var ny = snakeArray[0].y;

        if(dir == "right") nx++;
        else if(dir =="left") nx--;
        else if(dir == "up") ny--;
        else if(dir == "down") ny++;

        if(nx == -1 || nx == width/cellHW || ny == -1 || ny == height/cellHW || collisionCheck(nx, ny, snakeArray)) {

            //Game restarts here.
            init();
            return;
        }

        if(nx == food.x && ny == food.y) {
            var tail = { x: nx, y: ny };
            score++;
            makeFood();
        } else {

            var tail = snakeArray.pop();
            tail.x = nx;
            tail.y = ny;
        }

        snakeArray.unshift(tail);

        for(var i = 0; i < snakeArray.length; i++) {
            var cell = snakeArray[i];

            drawCell(cell.x, cell.y);
        }

        drawCell(food.x, food.y);

        var scoreText = "Score: " + score;
        ctx.fillText(scoreText, 5, height - 5);
    }

    function drawCell(x, y) {

        //Draw the cells
        ctx.fillStyle = "green";
        ctx.fillRect(x * cellHW, y * cellHW, cellHW, cellHW);
        ctx.strokeStyle = "white";
        ctx.strokeRect(x * cellHW, y * cellHW, cellHW, cellHW)
    }

    function collisionCheck(x, y, array) {

        for(var i = 0; i < array.length; i++) { 

            if(array[i].x == x && array[i].y == y) return true;
        }
        return false;
    }

    $(document).keydown(function(event) {

        event.preventDefault();
        var keyPressed = event.which;

        //Handle keyboard control input.
        //Second statement prevents doubling back.
        if(keyPressed == "37" && dir != "right") dir = "left";
        else if(keyPressed == "38" && dir != "down") dir = "up";
        else if(keyPressed == "39" && dir != "left") dir = "right";
        else if(keyPressed == "40" && dir != "up") dir = "down";
    })

    function update() {

    }

});

/*
$(document).ready(function() {

    var width, height, largeHeader, canvas, ctx, points, target, animateHeader = true;

    // Main
    initHeader();
    initAnimation();
    addListeners();

    function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;
        target = {x: width/2, y: height/2};

        largeHeader = document.getElementById('body');

        canvas = document.getElementById('demo-canvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        // create points
        points = [];
        for(var x = 0; x < width; x = x + width/20) {
            for(var y = 0; y < height; y = y + height/20) {
                var px = x + Math.random()*width/20;
                var py = y + Math.random()*height/20;
                var p = {x: px, originX: px, y: py, originY: py };
                points.push(p);
            }
        }

        // for each point find the 5 closest points
        for(var i = 0; i < points.length; i++) {
            var closest = [];
            var p1 = points[i];
            for(var j = 0; j < points.length; j++) {
                var p2 = points[j]
                if(!(p1 == p2)) {
                    var placed = false;
                    for(var k = 0; k < 5; k++) {
                        if(!placed) {
                            if(closest[k] == undefined) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }

                    for(var k = 0; k < 5; k++) {
                        if(!placed) {
                            if(getDistance(p1, p2) < getDistance(p1, closest[k])) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }
                }
            }
            p1.closest = closest;
        }

        // assign a circle to each point
        for(var i in points) {
            var c = new Circle(points[i], 2+Math.random()*2, 'rgba(255,255,255,0.3)');
            points[i].circle = c;
        }
    }

    // Event handling
    function addListeners() {
        if(!('ontouchstart' in window)) {
            window.addEventListener('mousemove', mouseMove);
        }
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
    }

    function mouseMove(e) {
        var posx = posy = 0;
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        }
        else if (e.clientX || e.clientY)    {
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        target.x = posx;
        target.y = posy;
    }

    function scrollCheck() {
        if(document.body.scrollTop > height) animateHeader = false;
        else animateHeader = true;
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        largeHeader.style.height = height+'px';
        canvas.width = width;
        canvas.height = height;
    }

    // animation
    function initAnimation() {
        animate();
        for(var i in points) {
            shiftPoint(points[i]);
        }
    }

    function animate() {
        if(animateHeader) {
            ctx.clearRect(0,0,width,height);
            for(var i in points) {
                // detect points in range
                if(Math.abs(getDistance(target, points[i])) < 4000) {
                    points[i].active = 0.3;
                    points[i].circle.active = 0.6;
                } else if(Math.abs(getDistance(target, points[i])) < 20000) {
                    points[i].active = 0.1;
                    points[i].circle.active = 0.3;
                } else if(Math.abs(getDistance(target, points[i])) < 40000) {
                    points[i].active = 0.02;
                    points[i].circle.active = 0.1;
                } else {
                    points[i].active = 0;
                    points[i].circle.active = 0;
                }

                drawLines(points[i]);
                points[i].circle.draw();
            }
        }
        requestAnimationFrame(animate);
    }

    function shiftPoint(p) {
        TweenLite.to(p, 1+1*Math.random(), {x:p.originX-50+Math.random()*100,
            y: p.originY-50+Math.random()*100, ease:Circ.easeInOut,
            onComplete: function() {
                shiftPoint(p);
            }});
    }

    // Canvas manipulation
    function drawLines(p) {
        if(!p.active) return;
        for(var i in p.closest) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.closest[i].x, p.closest[i].y);
            ctx.strokeStyle = 'rgba(156,217,249,'+ p.active+')';
            ctx.stroke();
        }
    }

    function Circle(pos,rad,color) {
        var _this = this;

        // constructor
        (function() {
            _this.pos = pos || null;
            _this.radius = rad || null;
            _this.color = color || null;
        })();

        this.draw = function() {
            if(!_this.active) return;
            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba(156,217,249,'+ _this.active+')';
            ctx.fill();
        };
    }

    // Util
    function getDistance(p1, p2) {
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }
    
});*/