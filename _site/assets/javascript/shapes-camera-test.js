$(document).ready(function() {

	//Initialise the stat tracking library.
	//var stats = initStats();
	//Initialise a new THREEjs scene.
	var scene = new THREE.Scene();

	//Initialise a new camera with the aspect ratio of the HTML element.
	//Add it to scene.
	var width = 600,
		height = 500;
	var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
	scene.add(camera);

	//Initialise a new renderer and set its size, as well as background color.
	var renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color( 0xEEEEEE, 1.0 ));
	renderer.setSize(width, height);
	renderer.shadowMapEnabled = true;

	//Create a white plane which will form the ground in the scene.
	var planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
	var planeMaterial = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
	var plane = new THREE.Mesh( planeGeometry, planeMaterial);
	plane.recieveShadow = true;

	plane.rotation.x = -0.5 * Math.PI;
	plane.position.x = 0;
	plane.position.y = 0;
	plane.position.z = 0;

	scene.add(plane);

	//position the camera.
	camera.position.x = -30;
	camera.position.y = 40;
	camera.position.z = 30;
	//Point the camera at the scene.
	camera.lookAt(scene.position);

	//Add an ambient light.
	var ambientLight = new THREE.AmbientLight( 0x0C0C0C );
	scene.add(ambientLight);

	var spotLight = new THREE.SpotLight(0xFFFFFF);
	spotLight.position.set(-40, 60, -10);
	spotLight.castShadow = true;
	scene.add(spotLight);

	//Add the output to the page.
	document.body.appendChild(renderer.domElement);

	var step = 0;

	var controls = new function() {
		this.rotationSpeed = 0.02;
		this.numberOfObjects = scene.children.length;

		this.removeCube = function() {
			var allChildren = scene.children;
			var lastObject = allChildren[allChildren.length - 1];

			if(lastObject instanceof THREE.Mesh) {
				scene.remote(lastObject);
				this.numberOfObjects = scene.children.length;
			}
		};

		this.addCube = function() {
			var cubeSize = Math.ceil((Math.random() * 3));
			var cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
			var cubeMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xFFFFFF});
			var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
			cube.castShadow = true;
			cube.name = "cube-" + scene.children.length;
		}
	}
});