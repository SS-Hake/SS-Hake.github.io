$(document).ready(function () {

	var colours = [[100, 100, 100], [100, 100, 100]]l
	var originalColour = [];


	var currentColour = 0;
	var nextColour = 0;

	//Set the starting colours.
	$('#first .color').val('#ccc');
	$('#second .color').val('#d45f44');

	$('#first').css('backgroundColor', '#d4228d');
	$('#second').css('backgroundColor', '#d42888');

	$('.color').on('change', function() {

		var container = this.parentNode.id;

		//Grab the HSV colour values.
		h = this.color.hsv[0] * 60;
		s = this.color.hsv[1];
		v = this.color.hsv[2];

	});

});