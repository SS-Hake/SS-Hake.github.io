//Simple Snake game.
//Revised version of my other more complex attempt which was more involved
//and was in vanilla javascript.
//This version boasts jQuery and 1/3 of the lines of code.
$(document).ready(function() {

    //Declare and initialise canvas.
    var canvas = $("#canvas")[0];
    var ctx = canvas.getContext("2d");
    var height = $("#canvas").height();
    var width = $("#canvas").width();

    //Holds the snake cells as the square array did before.
	var snakeArray;

    //Direction, food and score container variables.
    var dir;
    var food;
    var score;

    //Cell height and width are the same so I combine them here for simplicity.
    var cellHW = 10;

    function init() {
        //Init function called once when game begins or restarts, sets all starting variables.

        //Degub printing.
        console.log("[+] Init...")

        //Start the snake moving to the right. Spawns on the left.
        dir = "right";

        //Initial creation of snake and food.
        constructSnake();
        makeFood();

        //Set the score to 0.
        score = 0;

        //Check if the loop is running, if not start it.
        if(typeof loop != "undefined") clearInterval(loop);

        //Set the drawing loop time.
        loop = setInterval(draw, 60);

    }  

    //Run the init function. to start the game.
    init();

    function constructSnake() {
        // Creates a snake 5 blocks long to begin.
        
        //Set the length to 5 and the snake array empty.
        var length = 5;
        snakeArray = [];

        //Count down to 0 from length.
        for(var i = length - 1; i >= 0; i--) {
            //Add a block to the array.
            //y = 0 is the top of screen.
            //x = 5-1 draws the snake horizontally.
            snakeArray.push({x:i, y:0});
        }
    }

    function makeFood() {
        //Use object notation to set the food variable to have two properties.
        //Set x and y to a random number between the bounds of the canvas screen.
        //Round the number to nearest int so the food is on a whole square.
        //E.G.: 3, 4 rather than 3.1, 3.9.
        food = { x: Math.round(Math.random() * (width - cellHW) / cellHW),
                 y: Math.round(Math.random() * (height - cellHW) / cellHW) };
    }

    function draw() {
        //Handle all the drawing to screen here.
        
        //Debug printing.
        console.log("[+] Drawing...")

        //Draw the canvas. White background, black border.
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, width, height);
        ctx.strokeStyle = "black";
        ctx.strokeRect(0, 0, width, height);

        //Grab the coords for head of the snake.
        var nx = snakeArray[0].x;
        var ny = snakeArray[0].y;

        //Check the direction the snake is headed and increment appropriately.
        if(dir == "right") nx++;
        else if(dir =="left") nx--;
        else if(dir == "up") ny--;
        else if(dir == "down") ny++;

        if(nx == -1 || nx == width/cellHW || ny == -1 || ny == height/cellHW || collisionCheck(nx, ny, snakeArray)) {
            //If the snake leaved bounds or hits itself restart.

            //Recall init function. Game restarts here.
            init();
            return;
        }

        if(nx == food.x && ny == food.y) {
            //If the head hits the same coords as the food particle.
            //Grow the tail by 1.
            var tail = { x: nx, y: ny };

            //Increment score.
            score++;

            //Create a new food.
            makeFood();
        } else {
            //Else TODO
            var tail = snakeArray.pop();
            tail.x = nx;
            tail.y = ny;
        }

        //TODO
        snakeArray.unshift(tail);

        for(var i = 0; i < snakeArray.length; i++) {
            //For all the snakes cells.
            //Draw the snakes cells one at a time.
            var cell = snakeArray[i];
            drawCell(cell.x, cell.y);
        }

        //Draw the food.
        drawCell(food.x, food.y);

        //Construct and draw the score.
        var scoreText = "Score: " + score;
        ctx.fillText(scoreText, 5, height - 5);
    }

    function drawCell(x, y) {
        //Refactored the drawing to be multiuse (as everything is made up from cells.)
        //Draw the cells at the passed coords.
        ctx.fillStyle = "green";
        ctx.fillRect(x * cellHW, y * cellHW, cellHW, cellHW);
        ctx.strokeStyle = "white";
        ctx.strokeRect(x * cellHW, y * cellHW, cellHW, cellHW)
    }

    function collisionCheck(x, y, array) {
        //Handle collision checking logic.
        
        for(var i = 0; i < array.length; i++) { 
            //For the length of the passed array.
            //If the current cell occupies the same cell as the checked object.
            //Collision is true.
            if(array[i].x == x && array[i].y == y) return true;
        }

        //Otherwise, no collision.
        return false;
    }

    $(document).keydown(function(event) {
        //Handle the control input.

        //Make sure the user doesn't scroll accidentally.
        event.preventDefault();

        //Grab which key was pressed. (as number)
        var keyPressed = event.which;

        //If the correlating number is pressed, move in that direction.
        //Second statement prevents doubling back.
        if(keyPressed == "37" && dir != "right") dir = "left";
        else if(keyPressed == "38" && dir != "down") dir = "up";
        else if(keyPressed == "39" && dir != "left") dir = "right";
        else if(keyPressed == "40" && dir != "up") dir = "down";
    })
});