
var app = angular.module('app', [], function($interpolateProvider) {
	$interpolateProvider.startSymbol('[[');
	$interpolateProvider.endSymbol(']]');
});

app.controller('mainController', function() {

	var mainCtrl = this;

	mainCtrl.posts = [
		{title: 'post1', upvotes: 1},
		{title: 'post2', upvotes: 5},
		{title: 'post3', upvotes: 23},
		{title: 'post4', upvotes: 4},
		{title: 'post5', upvotes: 9},
	];

	mainCtrl.addPost = function() {
		mainCtrl.posts.push({title: 'A new post', upvotes: 0});
		console.log("Pressed.");
	};
});
