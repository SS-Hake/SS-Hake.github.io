$(document).ready(function () {

	console.log("This is first.")
	var i;
	var units = '';

	/* Old Code: Too many appends!
	for(i = 0; i < 5001; i++) {
		$("#week_container").append('<div class="week">' + i + '</div>');
	}*/
	

	for(i = 1; i < 5001; i++) {
		units += '<div class="week">' + i + '</div>';
	}	
	$('#week_container').append(units);

	

	console.log("Hello");
	
});