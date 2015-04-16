/* Converts the current time in ints into a hex string which is used as a 
	base for the background colour.  Might make another one later which 
	incorporates the hex letters into the conversion.

	TODO: Make a version that uses toString(16) (converts to hex).
*/
$(document).ready(function () {

	function displayTime() {
		//Set the content conainter to change over 8 seconds.
		$("#content").css({"transition": "all 0.5s", "-webkit-transition": "all 0.5s"});

		//Initialise the date object and set variables to the hour, min and second.
		var dateObj = new Date();
		var hr = dateObj.getHours();
		var min = dateObj.getMinutes();
		var sec = dateObj.getSeconds();

		//A spacer for the time
		var spacer = " : ";

		//Declare a value to store the hex colour later.
		var hexColour;

		//Add a 0 to the number if it is one digit long. This keeps time time as 6 figures.
		if(hr < 10) hr = "0" + hr;
		if(min < 10) min = "0" + min;
		if(sec < 10) sec = "0" + sec;

		//Javascript will automatically cast an int to string when using the +.
		//But I cast manually to make sure.
		hr.toString();
		min.toString();
		sec.toString();

		//Assemble the hex colour value.
		hexColour = "#" + hr + min + sec;

		//print the time with spacer and hex value to the appropriate divs.
		$("#time").html(hr + spacer + min + spacer + sec);
		$("#hexVal").html(hexColour);

		//hand the colour value to the content div so the whole square changes colour.
		$("#content").css("background-color", hexColour);

	}

	//While loops would not work for this because JS single threaded.
	//This runs indefinitely, but leaves enough time to let other code run in the gap.
	//(No other code to run here, but its good practice.)
	window.setInterval(displayTime, 500);

});