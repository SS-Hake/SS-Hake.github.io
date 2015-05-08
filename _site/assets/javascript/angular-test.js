//$(document).ready(function() {

	///var app = angular.module('gemStore', []);

	var app = angular.module('app', [], function($interpolateProvider) {
	  $interpolateProvider.startSymbol('[[');
	  $interpolateProvider.endSymbol(']]');
	});

	function MyCtrl($scope) {
	  $scope.name = 'Clark Kent';
	}

//});