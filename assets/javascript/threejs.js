/*
Plane for ground

Cube - blue on the ground

Sphere - red on the ground

camera.
Debug axes? 

*/

var width = 600,
	height = 500;

var viewAngle = 45,
	aspect = width/height,
	near = 0.1,
	far = 10000;

var radius = 50,
	segments = 16,
	rings = 16;

var camera = new THREE.PerspectiveCamera(
	viewAngle,
	aspect,
	near,
	far
);

var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
var sphereMaterial = 
	new THREE.MeshLambertMaterial(
	{
		color: 0xCC0000
	});

renderer.setSize(width, height);
camera.position.z = 300;
scene.add(camera);
document.body.appendChild(renderer.domElement);

var axes = new THREE.AxisHelper(20);
scene.add(aces);

//Plane - ground
var planeGeometry = new THREE.PlaneGeometry(60, 20);
var planeMaterial = new THREE.MeshBasicMaterial({color: 0xcccccc});
var plane = new THREE.Mesh(planeGeometry, planeMaterial);

plane.rotation.x = -0.5 * Math.PI;
plane.rotation.x = 15;
plane.rotation.y = 0;
plane.rotation.z = 0;

scene.add(plane);

var sphere = new THREE.Mesh(
	new THREE.SphereGeometry(
		radius,
		segments,
		rings
	),
sphereMaterial);

sphere.scale.x = 1;
scene.add(sphere);

var pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 130;
scene.add(pointLight);

renderer.render(scene, camera);

