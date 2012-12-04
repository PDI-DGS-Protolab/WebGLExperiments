
var camera, scene, renderer;
var model;
var lookAtModel = false;

init();
animate();

function init() {

	// Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );


    // Scene
    scene = new THREE.Scene();

	// Camera
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 200000 );
    camera.position.y = 30;
    camera.position.z = -100;

    // Skybox
    var urlPrefix	= "../assets/textures";
	var urls = [ urlPrefix + "/skybox1.jpg", urlPrefix + "/skybox3.jpg",
			urlPrefix + "/skybox5.jpg", urlPrefix + "/skybox4.jpg",
			urlPrefix + "/skybox2.jpg", urlPrefix + "/skybox6.jpg" ];

	var textureCube	= THREE.ImageUtils.loadTextureCube( urls );

	var shader	= THREE.ShaderUtils.lib["cube"];
	shader.uniforms["tCube"].value = textureCube;
	var material = new THREE.ShaderMaterial({
		fragmentShader	: shader.fragmentShader,
		vertexShader	: shader.vertexShader,
		uniforms	: shader.uniforms,
		side: THREE.BackSide
	});

	skyboxMesh	= new THREE.Mesh( new THREE.CubeGeometry( 100000, 100000, 100000, 1, 1, 1, null, true ), material );

	scene.add( skyboxMesh );

    // Light
    var light = new THREE.DirectionalLight( 0xffffff );
	light.position.set( -250, 250, -250 );
	scene.add(light);


    // Camera controls
    setCameraControls( camera );

	// Camera follow
    lookAtModel = true;

	// Camera chase

    // Model import (JSON)
	importModelJSON();

}


function animate() {
	requestAnimationFrame( animate );
    controls.update();

    if (lookAtModel && model) {
        camera.lookAt(model.position);
    }

    render();

}


function render () {
    renderer.render(scene, camera);
}


function setCameraControls ( camera ){
    controls = new THREE.TrackballControls( camera ); // Creates the controls
    controls.addEventListener( 'change', render );    // Adds a listener for them to work
    controls.maxDistance = 50000;
}


function importModelJSON () {
	var loader = new THREE.JSONLoader();

	var tex = THREE.ImageUtils.loadTexture("../assets/textures/Wolf_Diffuse_256x256.jpg", null, function () {
        var mat = new THREE.MeshBasicMaterial({ map: tex, morphTargets: true });
        loader.load("../assets/models/Wolf.js", function (geo) {
            model = new THREE.Mesh(geo, mat);
            scene.add(model);
        });
	});
}

function onWindowResize() {

    var width  = window.innerWidth;
    var height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize( width, height );

}

window.addEventListener( 'resize', onWindowResize, false);
