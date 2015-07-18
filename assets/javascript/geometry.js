$(document).ready(function() {

	var stats = initStats();

	var scene = new THREE.Scene();
	var width = 600;
	var height = 500;
	//Init camera
	var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);

	var webGLRenderer = new THREE.WebGLRenderer();
	webGLRenderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
	webGLRenderer.setSize(width, height);
	webGLRenderer.shadowMapEnabled = true;

	var circle = createMesh(new THREE.CircleGeometry(4, 10, 0.3 * Math.PI * 2, 0.3 * Math.PI * 2));
	scene.add(circle);

	camera.position.x = -10;
	camera.position.x = 30;
	camera.position.x = 40;
	camera.lookAt(new THREE.Vector3( 10, 0, 0 ));

	var spotLight = new THREE.SpotLight(0xFFFFFF);
	spotLight.position.set(-40, 60, -10);
	scene.add(spotLight);

	$('#output').append(webGLRenderer.domElement);

	var step = 0;

	var controls = new function() {
		console.log(circle.children[0].geometry);
		this.radius = 4;

		this.thetaStart = 0.3 * Math.PI * 2;
		this.thetaLength = 0.3 * Math.PI * 2;
		this.segments = 10;

		this.redraw = function() {
			scene.remove(circle);
			circle = createMesh(new THREE.CircleGeometry(controls.radius, controls.segments, controls.thetaStart, controls.thetaLength));
			scene.add(circle);
		};
	};

	var gui = new dat.GUI();
	gui.add(controls, 'radius', 0, 40).onChange(controls.redraw);
	gui.add(controls, 'segments', 0, 40).onChange(controls.redraw);
	gui.add(controls, 'thetaStart', 0, 2 * Math.PI + 10).onChange(controls.redraw);
	gui.add(controls, 'thetaLength', 0, 2 * Math.PI).onChange(controls.redraw);
	render();

	function createMesh(geometry) {
		var meshMaterial = new THREE.MeshNormalMaterial();
		meshMaterial.side = THREE.DoubleSide;
		var wireFrameMat = new THREE.MeshBasicMaterial();
		wireFrameMat.wireframe = true;

		var mesh = THREE.SceneUtils.createMultiMaterialObject(geometry, [meshMaterial, wireFrameMat]);

		return mesh;
	}

	function render() {
		stats.begin();
		circle.rotation.y = step += 0.01;

		requestAnimationFrame(render);
		webGLRenderer.render(scene, camera);
	}

	function initStats() {
		var stats = new Stats();
		stats.setMode(0);

		$('#stats').append(stats.domElement);

		return stats;
	}
});
