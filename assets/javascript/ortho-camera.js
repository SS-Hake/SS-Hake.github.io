$(document).ready(function() {

	var stats = initStats();

	var scene = new THREE.Scene();
	var width = 600;
	var height = 500;
	var camera = new THREE.PerspectiveCamera( 45, width/height, 0.1, 1000 );
	camera.position.x = 120;
	camera.position.y = 60;
	camera.position.z = 180;

	var renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color( 0xFFFFFF );
	renderer.setSize(width, height);



});