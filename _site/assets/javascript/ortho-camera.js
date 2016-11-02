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

	renderer.setClearColor = new THREE.Color( 0xFFFFFF );
	renderer.setSize(width, height);
	renderer.shadowMapEnabled = true;

	var planeGeometry = new THREE.PlaneBufferGeometry( 60, 40, 1, 1 );
	var planeMaterial = new THREE.MeshLambertMaterial( 0xFFFFFF );
	var plane = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.receiveShadow = true;

	//position the plane, set angle.
	plane.rotation.x = -0.5 * Math.PI;
	plane.position.x = 0;
	plane.position.y = 0;
	plane.position.z = 0;
	//Add it to the scene.
	scene.add(plane);
	
	var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);

	for(var j = 0; j < (planeGeometry.parameters.height / 5); j++) {
		for(var i = 0; i < planeGeometry.parameters.width / 5; i++) {
			var rnd = Math.random() * 0.75 + 0.25;
			var cubeMaterial = new THREE.MeshLambertMaterial();
			cubeMaterial.color = new THREE.Color(rnd, 0, 0);
			var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

            cube.position.x = -((planeGeometry.parameters.width) / 2) + 2 + (i * 5);
            cube.position.y = 2;
			cube.position.z = -((planeGeometry.parameters.height) / 2) + 2 + (j * 5);

			scene.add(cube);
		}
	}


	//Position and add the camera to scene.
	camera.position.x = -30;
	camera.position.y = 40;
	camera.position.z = 30;
	camera.lookAt(scene.position);
	//Add some ambient lighting.
	var ambientLight = new THREE.AmbientLight(0x0c0c0c);
	scene.add(ambientLight);
	//Add a splotlight.
	var spotLight = new THREE.SpotLight(0xFFFFFF);
	spotLight.position.set(-40, 60, -10);
	spotLight.castShadow = true;
	scene.add(spotLight);
	//add the output to the page.
	$('#output').append(renderer.domElement);

	var step = 0;

	var controls = new function() {
		this.rotationSpeed = 0.02;
		this.numberOfObjects = scene.children.length;

		this.removeCube = function() {
			//Function finds the most recently added cube and removes it.
			var allChildren = scene.children;
			var lastObject = allChildren[allChildren.length - 1];
			if(lastObject instanceof THREE.Mesh) {
				scene.remove(lastObject);
				this.numberOfObjects = scene.children.length;
			}
		};

		this.addCube = function() {
			//Function initialises a new cube of random colour and size,
			//then positions it randomly within the bounds of the plane.

			var cubeSize = Math.ceil((Math.random() * 3));
			var cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
			var cubeMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xFFFFFF});
			var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
			cube.castShadow = true;
			cube.name = "cube-" + scene.children.length;

			cube.position.x = -30 + Math.round((Math.random() * planeGeometry.parameters.width));
			cube.position.y = Math.round((Math.random() * 5));
			cube.position.z = -20 + Math.round((Math.random() * planeGeometry.parameters.height));

			scene.add(cube);
			this.numberOfObjects = scene.children.length;
		};

		this.perspective = "Perspective";
		this.switchCamera = function() {
			if(camera instanceof THREE.PerspectiveCamera) {
				camera = new THREE.OrthographicCamera( width / -16, width / 16, height / 16, height / -16, -200, 500 );
				camera.position.x = 120;
				camera.position.y = 60;
				camera.position.z = 180;
				camera.lookAt(scene.position);
				this.perspective = "Orthographic";
			} else {
				camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
				camera.position.x = 120;
				camera.position.y = 60;
				camera.position.z = 180;
				camera.lookAt(scene.position);
				this.perspective = "Perspective";
			}
		}

		this.outputObjects = function() {
			console.log(scene.children);
		}
	};

	var gui = new dat.GUI();
	gui.add(controls, 'rotationSpeed', 0, 0.5);
	gui.add(controls, 'addCube');
	gui.add(controls, 'removeCube');
	gui.add(controls, 'outputObjects');
	gui.add(controls, 'switchCamera');
	gui.add(controls, 'perspective').listen();
	gui.add(controls, 'numberOfObjects').listen();

	render();
	function render() {
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