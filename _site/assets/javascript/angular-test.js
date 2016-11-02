//$(document).ready(function() {

	///var app = angular.module('gemStore', []);

	var app = angular.module('app', [], function($interpolateProvider) {
	  $interpolateProvider.startSymbol('[[');
	  $interpolateProvider.endSymbol(']]');
	});

	app.controller('directoryController', function() {

		var dirList = this;

		dirList.list1 = [
			{name: 'Sam', age:'23'},
			{name: 'Courtney', age:'23'},
			{name: 'John', age: '32'}, 
			{name: 'Jenny', age: '25'}
		];

		dirList.addPerson = function() {
			dirList.list1.push({name: dirList.name, age: dirList.age});
			dirList.name = '';
			dirList.age = null;
		};
	});

//});