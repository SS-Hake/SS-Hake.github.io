/*Simple angular store app listing data from array variables in the js.

Directives are html tags which can trigger angular logic within the page.

Modules are the housing for the components of the Angular app.

Controllers are the app logic / behaviour.

Expressions link data values from the js to the page.



Pipes in directives can format data to date, time, currency etc.
	Or limit, order or transform logic and data.

*/
	/*var gem = { 
		name: 'Azurite', 
		price: 3.55,
		description: '...',   -- Deprecated gem info.
		canPurchase: true,
		soldOut: false
		};*/


(function() {

	var app = angular.module('gemStore', [], function($interpolateProvider) {
	  $interpolateProvider.startSymbol('[[');
	  $interpolateProvider.endSymbol(']]');
	});

	app.controller('StoreController', function() {
		this.products = gems;
	});

  app.controller('TabController', function() {
    this.tab = 1;
    
    this.setTab = function(selected) {
      this.tab = selected;
     };
    
    this.isSet = function(tabVal) {
      return this.tab === tabVal;
    };
  });
  
	var gems = [{
      name: 'Azurite',
      description: "Some gems have hidden qualities beyond their luster, beyond their shine... Azurite is one of those gems.",
      shine: 8,
      price: 110.50,
      rarity: 7,
      color: '#CCC',
      faces: 14,
      images: [
        "../assets/img/client-1.jpg",
        "../assets/img/logo1.png"
      ],
      reviews: [{
        stars: 5,
        body: "I love this gem!",
        author: "joe@example.org",
        createdOn: 1397490980837
      }, {
        stars: 1,
        body: "This gem sucks.",
        author: "tim@example.org",
        createdOn: 1397490980837
      }]
    }, {
      name: 'Bloodstone',
      description: "Origin of the Bloodstone is unknown, hence its low value. It has a very high shine and 12 sides, however.",
      shine: 9,
      price: 22.90,
      rarity: 6,
      color: '#EEE',
      faces: 12,
      images: [
        "../assets/img/client-2.jpg",
        "../assets/img/logo2.png"
      ],
      reviews: [{
        stars: 3,
        body: "I think this gem was just OK, could honestly use more shine, IMO.",
        author: "JimmyDean@example.org",
        createdOn: 1397490980837
      }, {
        stars: 4,
        body: "Any gem with 12 faces is for me!",
        author: "gemsRock@example.org",
        createdOn: 1397490980837
      }]
    }, {
      name: 'Zircon',
      description: "Zircon is our most coveted and sought after gem. You will pay much to be the proud owner of this gorgeous and high shine gem.",
      shine: 70,
      price: 1100,
      rarity: 2,
      color: '#000',
      faces: 6,
      images: [
        "../assets/img/client-3.jpg",
        "../assets/img/logo3.png"
      ],
      reviews: [{
        stars: 1,
        body: "This gem is WAY too expensive for its rarity value.",
        author: "turtleguyy@example.org",
        createdOn: 1397490980837
      }, {
        stars: 1,
        body: "BBW: High Shine != High Quality.",
        author: "LouisW407@example.org",
        createdOn: 1397490980837
      }, {
        stars: 1,
        body: "Don't waste your rubles!",
        author: "nat@example.org",
        createdOn: 1397490980837
      }]
    }];
	

})();

/*function MyCtrl($scope) {
  $scope.name = 'Clark Kent';
}*/