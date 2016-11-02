/*Small script which draws circles in such a way that make them appear as drips running down the screen.

BUG: everynow and then, they change colour halfway down?

*/

$(document).ready(function() {


    //Grab the canvas element, set context, and set the width and height to the size of the canvas.
    var canvas = $("#canvas")[0];
    var ctx = canvas.getContext("2d");
    var width = canvas.width;
    var height = canvas.height;

    //Array to store the drips as javascript objects.
    var drips = [];
    //calculate the number of drips there will be at any one time.
    var numDrips = width/50;
    //Initial value of width for the first object. 
    var dripWidth = 15;

    function drawDrips(x, y, dripWidth, colour) {
        //Draw function.
        //Begin path and draw a full circle (denoted by the PI * 2, 2 radians).
        ctx.beginPath();
        ctx.arc(x, y, dripWidth, 100, Math.PI * 2, true);
        //Close path and fill with the passed colour.
        ctx.closePath();
        ctx.fillStyle = colour;
        ctx.fill();
    }

    function update() {
        //Update function, updates the screen as called by the interval function.
        //No need to clear the screen as the 
        //For all of the drip objects in the array.
        for(var i = 0; i < drips.length; i++) {
            //Move the y coordinate down by the velocity. (Simple movement on the y axis, x does not change)
            drips[i].y = drips[i].y + drips[i].v;
            //If the drip is more than 60 off of the screen at the bottom.
            if(drips[i].y > height + 60) {
                //Remove 1 objects from index i.
                drips.splice(i, 1);
                //Add a new drip.
                addDrip();
            }
            //Draw all the drips as the for loop runs.
            drawDrips(drips[i].x, drips[i].y, drips[i].w, drips[i].colour);
        }
    }

    function addDrip() {
        //Function which fills the array with new drip objects as needed.
        for(var i = 0; i < 70; i++) {
            //For up to 70 times
            dripWidth = Math.random() * dripWidth + 10;
            //Start it somewhere random along the width of the canvas. y will be jut offscreen at the top.
            x = Math.random() * width;
            //Validity boolean - if it turns false the values to be set in the object are not valid.
            var valid = true;

            for(var j = 0; j < drips.length; j++) {
                //If any drips might overlap, the validity is false, doesnt get added.
                if((x + dripWidth > drips[j].x) && (x - dripWidth < drips[j].x + drips[j].w)) {
                    valid = false;
                    break;
                } else if ((x - dripWidth < drips[j].x) && (x + dripWidth > drips[j].x - drips[j].w)) {
                    valid = false;
                    break;
                }
            }

            if(valid == true) {
                //If the values are valid - chuck another drip on the array!
                //The width is set to dripWidth.
                //The x to the x value.
                //y to just off the top of the canvas.
                //velocity to something between 1 and 2. (can't be too fast or we start to see the gaps between circles)
                //Colour to a random number which we convert to a string. (but with a 16 passed which forces it into hexadecimal)
                drips.push({
                    w: dripWidth,
                    x: x,
                    y: -60,
                    v: (Math.random() * 1) + 2,
                    colour: '#' + (Math.random() * 0xeeeeee + 0x000000 | 0).toString(16)
                });
                return;
            }
        }
    }

    function init() {
        //Init function - until the array is full, add a new drip.
        for(var i = 0; i < numDrips; i++) {
            addDrip();
        }
        //Differs from Twilight in that I have a named function; update. No longer anonymous.
        setInterval(update, 40);
    }

    //Run!
    init();
});

