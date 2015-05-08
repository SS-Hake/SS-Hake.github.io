$(document).ready(function () {

	//Array holding the css animations.
	var animations = ['shake',
						'hop',
						'spin',
						'grow',
						'hooray'];

	//Function to get a random integer between two passed values.
	function getRandomNum(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	//Cycle through the animations randomly and assign them to items from 
	//the wrapper class for the boxes I want to animate.
	$('.box').on('click', function () {
		//Set this instance to the clicked box.
		var boxs = this;
		//Grab a random animation and assign it to "anim". 
		var anim = animations[getRandomNum(0, 4)];

		//Add the animation to the selected box.
		$(boxs).addClass(anim);

		//Remove the animation after a full cycle.
		setTimeout(function () {
			$(boxs).removeClass(anim);
		}, 2100);
	});
});