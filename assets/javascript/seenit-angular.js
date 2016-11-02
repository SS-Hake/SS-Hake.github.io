
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

app.controller('mainController', ['posts', function(posts) {
	
	var mainCtrl = this;

	mainCtrl.posts = posts.posts;

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
}]);
/*Injecting the Service*/