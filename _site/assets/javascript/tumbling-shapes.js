var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(1000, 1000);
document.body.appendChild(renderer.domElement);
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({color: 0x0066ff});
var cube = new THREE.Mesh(geometry, material);

var secondGeometry = new THREE.BoxGeometry(1, 1, 1);  
var secondMaterial = new THREE.MeshBasicMaterial({color: 0x00cc00});
var secondCube = new THREE.Mesh(secondGeometry, secondMaterial);
scene.add(cube);
scene.add(secondCube);
camera.position.z = 5;

function render() {
	requestAnimationFrame(render);
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.02;

	secondCube.rotation.x = Math.PI * 45 / 180;
	renderer.render(scene, camera);
}
render();                                       