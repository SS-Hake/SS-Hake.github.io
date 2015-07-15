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

