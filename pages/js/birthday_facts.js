$(document).ready( function () {
	$('form').on('submit', function (event) {
		event.preventDefault();

		console.log("[+] Running... \n");

		//Define the 12 months.
		var months = [
		'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 
		'Aug', 'Sep', 'Oct', 'Nov', 'Dec' 
		];

		//Variables to be set by the bDay form.
		var year
		var month
		var day
		var birthday

		//Handle a lack of birthdate entered.
		if ($('#bday').val() == 0) {

			//Display a message saying no birthdate entered.
			$('.party').text("Please enter a birthdate!");
		
		} else {
			
			//Grab the date data.
			var birthday = $('#bday').val();

			//If the 
			if (birthday.indexOf("/") >= 0) {
				
				//Split the data when you find a slash.
				bDaySplit = birthday.split('/');  //Array of Month, Day, Year.

				//Assign the date variables.
				var year = bDaySplit[2];
				var month = (bDaySplit[0])-1;
				var day = bDaySplit[1];

			} else {
				
				//Split when you find a dash.
				bDaySplit = birthday.split('-');  //Array of Year, Month, Day.

				//Assign the date variables.
				var year = bDaySplit[0];
				var month = (bDaySplit[1])-1
				var day = bDaySplit[2];
			}

			console.log("[+] Grabbed birthday data... \n");

			//Split the time data when colon is found, same as the date above.
			var birthTime = $('#btime').val().split(':');

			//Assign the time data to variables.
			var hour = birthTime[0];
			var min = birthTime[1];

			//Assign the date data to variables.
			var bDay = new Date(year, month, day);
			//If statement setting btime to the day if there's no time set.
			var bTime = ((birthTime == 0) ? bDay : new Date(year, month, day, hour, min));
			var today = new Date();
			var todayStr = today.toDateString();

			var age = today.getFullYear() - year;

			if(today.getMonth() < month || (today.getMonth() == month && today.getDate() < day)) {
				age--;
			}

			//Age of the person in days then minutes.
			//Made by converting the difference between now and birthday data
			//and converting with math.
			var ageDays = Math.floor((today - bDay) / (24 * 60 * 60 * 1000));
			var ageMins = Math.floor((today - bTime) / (60 * 1000));

			//Calc the different milestones.
			//Ten and twent k days.
			var tenThouDay = (new Date(bDay.getTime() + 86400000 * 10000));
			var twenThouDay = (new Date(bDay.getTime() + 86400000 * 20000));

			//Five hundred k days.
			var fiveHunHour = (new Date(bDay.getTime() + 1800000000000));

			//Million, ten million, fifty million mins.
			var millMin = (new Date(bDay.getTime() + 60000000000));
			var tenMillMin = (new Date(bDay.getTime() + 60000000000 * 10));
			var fiftMillMin = (new Date(bDay.getTime() + 3000000000000));

			//Billion seconds.
			var billSec = (new Date(bDay.getTime() + 1000000000000));

			console.log("[+] Calculated facts... \n");

			//If the date data is equal to today's date, display a message.
			if(today.getMonth() == bDay.getMonth() && today.getDate() == bDay.getDate()) {
				
				//Display the message in party div.
				$('.party').text("Your birthday is today! HAPPY BIRTHDAY!");
			
			//If the data entered is valid, display the message pointing to facts.
			} else if (todayStr == (tenThouDay.toDateString() || twenThouDay.toDateString() == fiveHunHour.toDateString() || millMin.toDateString() || tenMillMin() || fiftMillMin())) {

				//Display the message.
				$('.party').text("View your life stats and facts below!");
			} else {

				//Display the message.	
				$('.party').text("View your life stats and facts below!");
			}

			//Link the data to the lists in the html page.
			//TODO: List these with angular.

			console.log("[+] Printing facts to screen... \n");

			//Print the month and day of birth.
			$("#birthday").text("Your birthday is " + months[month] + ' ' + day);

			//Print the age in years, months and days.
			$("#age_years").text("You are " + age + " years old.");
			$("#age_months").text("You are " + ageDays + " days old.");
			$("#age_days").text("You are " + ageMins + " minutes old.");

			//Display the calculated facts.
			$("#ten_k").text("Your 10,000th day is " + tenThouDay.toDateString());
			$("#twenty_k").text("Your 20,000th day is " + twenThouDay.toDateString());
			$("#fivehun_k").text("Your 500,000th hour will be on " + fiveHunHour.toDateString());
			$("#one_mill_mins").text("Your 1,000,000th minute is on " + millMin.toDateString());
			$("#ten_mill_mins").text("Your 10,000,000th minute is on " + tenMillMin.toDateString());
			$("#fiftMillMin").text("Yout 50,000,000th minute was on " + fiftMillMin.toDateString());
			$("#one_bill_secs").text("Your 1,000,000,000th second is on " + billSec.toDateString());

		}
	});
});

