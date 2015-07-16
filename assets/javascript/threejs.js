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

var stats = initStats();

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
renderer.setSize(width, height);
renderer.shadowMapEnabled = true;
/*var sphereMaterial = 
	new THREE.MeshLambertMaterial(
	{
		color: 0xCC0000
	});
*/

document.body.appendChild(renderer.domElement);

var axes = new THREE.AxisHelper(20);
scene.add(axes);

//Plane - ground
var planeGeometry = new THREE.PlaneGeometry(60, 20);
var planeMaterial = new THREE.MeshLambertMaterial({color: 0xcccccc});
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.recieveShadow = true;

plane.rotation.x = -0.5 * Math.PI;
plane.position.x = 15;
plane.position.y = 0;
plane.position.z = 0;

scene.add(plane);

//Cube
var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
var cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.castShadow = true;

cube.position.x = -4;
cube.position.y = 3;
cube.position.z = 0;

scene.add(cube);

var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
var sphereMaterial = new THREE.MeshLambertMaterial({color: 0x7777ff});
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
//scene.add(pointLight);

var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    spotLight.castShadow = true;
    scene.add(spotLight);

renderer.render(scene, camera);


//Rendering function

var step = 0;

var controls = new function() {
	this.rotationSpeed = 0.02;
	this.bouncingSpeed = 0.03;
};

var gui = new dat.GUI();
gui.add(controls, 'rotationSpeed', 0, 0.5);
gui.add(controls, 'bouncingSpeed', 0, 0.5);

render();

function render() {
	stats.update();
	//Rotation.
	cube.rotation.x += controls.rotationSpeed;
	cube.rotation.y += controls.rotationSpeed;
	cube.rotation.z += controls.rotationSpeed;

	step += controls.bouncingSpeed;
	sphere.position.x = 20 + (10 * (Math.cos(step)));
	sphere.position.y = 2 + (10 * Math.abs(Math.sin(step)));

	requestAnimationFrame(render);
	renderer.render(scene, camera);
}

function initStats() {
	var stats = new Stats();

	stats.setMode(0);

	stats.domElement.style.position = 'absolute';
	stats.domElement.style.left = '0px';
	stats.domElement.style.top = '0px';

	document.body.appendChild(stats.domElement);


	return stats;
}

