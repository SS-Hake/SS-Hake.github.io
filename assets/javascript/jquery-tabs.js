/*
Simple script which handles the actions of tabs; displaying the correct panels with the correct
information at the approproate time.  Utilising scaling properly, to select the nearest, correct panels
rather than searching the entire DOM for the correct element.

Also my first time using html tags other than ids and classes to identify elements.  In this case 'rel's.

This script shows the panel associated with the individual tab .

Event, Click            Current panel hidden						Next panel shown.
Click a tab -> remove old tab and panel's activeness -> show the new tab and panel as active by assigning them activeness.

*/

$(document).ready(function () {

	//When the list element is clicked.
	$('.tab-panels .tabs li').on('click', function() {

		//Create a var with the parent element, to save search time.
		//Dollar sign to represent the fact that the var holds a jQuery selector.
		var panel = $(this).closest('.tab-panels');

		//Find the current active tab element and remove the active class before we continue.
		panel.find('.tabs li.active').removeClass('active');

		//Add the active class to the current clicked tab.
		$(this).addClass('active');

		//Assign the rel (i.e "panel4") to a new variable to be used to find the next panel later.
		var nextPanel = $(this).attr('rel');

		//Find the current active panel and slide it up, hiding it before we show our new active panel with a callback.
		panel.find('.panel.active').slideUp('slow', showNext);

		//Function to be run as the current panel is hidden.
		function showNext() {

			//Remove the active class from the now hidden panel.
			$(this).removeClass('active');

			//Use the nextPanel variable to find the new panel as an ID.
			$('#' + nextPanel).slideDown('slow', function() {
				//As it slides down, assign it as the new active panel.
				$(this).addClass('active');
			});
		}

	});
});