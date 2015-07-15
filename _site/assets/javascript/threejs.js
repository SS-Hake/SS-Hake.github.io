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

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
	viewAngle,
	aspect,
	near,
	far
);

camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 30;
camera.lookAt(scene.position);

var renderer = new THREE.WebGLRenderer();
/*var sphereMaterial = 
	new THREE.MeshLambertMaterial(
	{
		color: 0xCC0000
	});
*/
renderer.setSize(width, height);

document.body.appendChild(renderer.domElement);

var axes = new THREE.AxisHelper(20);
scene.add(axes);

//Plane - ground
var planeGeometry = new THREE.PlaneGeometry(60, 20);
var planeMaterial = new THREE.MeshBasicMaterial({color: 0xcccccc});
var plane = new THREE.Mesh(planeGeometry, planeMaterial);

plane.rotation.x = -0.5 * Math.PI;
plane.position.x = 15;
plane.position.y = 0;
plane.position.z = 0;

scene.add(plane);

//Cube
var cubeGeometry = new THREE.CubeGeometry(4, 4, 4);
var cubeMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

cube.position.x = -4;
cube.position.y = 3;
cube.position.z = 0;

scene.add(cube);

var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
var sphereMaterial = new THREE.MeshBasicMaterial({color: 0x7777ff, wireframe: true});
var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

sphere.position.x = 20;
sphere.position.y = 4;
sphere.position.z = 2;

scene.add(sphere);

//scene.add(sphere);
/*var sphere = new THREE.Mesh(
	new THREE.SphereGeometry(
		radius,
		segments,
		rings
	),
sphereMaterial);

sphere.scale.x = 1;*/

var pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 130;
scene.add(pointLight);

renderer.render(scene, camera);

