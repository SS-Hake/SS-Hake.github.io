
var app = angular.module('app', [], function($interpolateProvider) {
	$interpolateProvider.startSymbol('[[');
	$interpolateProvider.endSymbol(']]');
});


app.factory('posts', [function() {
	var o = {
		posts: []
	};
	return o;
}]);
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
		//Don't let users push with no title.
		if(!mainCtrl.title || mainCtrl.title === '') { return }
		//Push the new post to the array and reset the 
		mainCtrl.posts.push({
			title: mainCtrl.title, 
			link: mainCtrl.link,
			upvotes: 0
		});
		mainCtrl.title = null;
		mainCtrl.link = null;
	};

	mainCtrl.incrementUpvotes = function(post) {
		post.upvotes += 1;
	};
});
/*Injecting the Service*/