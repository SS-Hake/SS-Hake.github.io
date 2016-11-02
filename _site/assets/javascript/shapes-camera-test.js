$(document).ready(function() {

	//Initialise the stat tracking library.
	var stats = initStats();
	//Initialise a new THREEjs scene.
	var scene = new THREE.Scene();
	//Add some eerie fog.
	scene.fog = new THREE.Fog( 0xFFFFFF, 0.015, 100 );
	//Override all object materials to be non-shiny.
	scene.overrideMaterial = new THREE.MeshLambertMaterial({color: 0xFFFFFF});

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
	var planeGeometry = new THREE.PlaneBufferGeometry(60, 40, 1, 1);
	var planeMaterial = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
	var plane = new THREE.Mesh( planeGeometry, planeMaterial);
	//Set it to show the shadows from the cubes, rotate it to be "flat" in scene and position at origin.
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
	$('#output').append(renderer.domElement);

	var step = 0;

	var controls = new function() {
		this.rotationSpeed = 0.02;
		this.numberOfObjects = scene.children.length;

		this.removeCube = function() {
			var allChildren = scene.children;
			var lastObject = allChildren[allChildren.length - 1];

			if(lastObject instanceof THREE.Mesh) {
				scene.remove(lastObject);
				this.numberOfObjects = scene.children.length;
			}
		};

		this.addCube = function() {
			//Cube initialised 
			var cubeSize = Math.ceil((Math.random() * 3));
			var cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
			var cubeMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xFFFFFF});
			var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
			cube.castShadow = true;
			cube.name = "cube-" + scene.children.length;

			//Cube positioned
			//random value clamped within plane width
			cube.position.x = -30 + Math.round((Math.random() * planeGeometry.parameters.width));
			//Random height up to 5 in y
			cube.position.y = Math.round((Math.random() * 5));
			//Random value clamped within length of the plane.
			cube.position.z = -20 + Math.round((Math.random() * planeGeometry.parameters.height));

			scene.add(cube);
			//Update object count.
			this.numberOfObjects = scene.children.length;
		}

		this.outputObjects = function() {
			console.log(scene.children);
		}

	}

	var gui = new dat.GUI();
	//Add controls and list their respective values.
	gui.add(controls, 'rotationSpeed', 0, 0.5);
	gui.add(controls, 'addCube');
	gui.add(controls, 'removeCube');
	gui.add(controls, 'outputObjects');
	gui.add(controls, 'numberOfObjects').listen();

	render();

	function render() {

		//stats.update();
		stats.begin();
		scene.traverse(function(e) {
			if(e instanceof THREE.Mesh && e != plane) {
				e.rotation.x += controls.rotationSpeed;
				e.rotation.y += controls.rotationSpeed;
				e.rotation.z += controls.rotationSpeed;
			}
		});

		requestAnimationFrame(render);
		renderer.render(scene, camera);
		stats.end();
	}

	function initStats() {
		var stats = new Stats();

		stats.setMode(0);

		$('#stats').append(stats.domElement);

		return stats;
	}
});