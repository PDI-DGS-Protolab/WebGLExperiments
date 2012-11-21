
var camera, scene, renderer;

init();
animate();

function init() {
	
	// Canvas
	canvas = $('canvas').get(0);
	
	// Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, canvas : canvas });
    renderer.setSize( canvas.width, canvas.height );
    
    // Scene
    scene = new THREE.Scene();
	
	// Camera
    camera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 0.1, 200000 );
    camera.position.z = -2000;
    
    // Skybox
    var urlPrefix	= "../../assets/textures";
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
    setControls (camera);
    
    // Model import (JSON)
	importModelJSON();     

}

function animate() {
    requestAnimationFrame( animate );
    controls.update();
    render();
}


function render () {
    renderer.render(scene, camera);
}


function setControls ( camera ) {
    controls = new THREE.TrackballControls( camera ); // Creates the controls
    controls.addEventListener( 'change', render );    // Adds a listener for them to work
    controls.maxDistance = 50000;
}

function importModelJSON () {
	var model;
	var loader = new THREE.JSONLoader();	
	
	var tex = THREE.ImageUtils.loadTexture('../../assets/textures/Wolf_Diffuse_256x256.jpg', null, function () {
        var mat = new THREE.MeshBasicMaterial({ map: tex, morphTargets: true });
        loader.load('../../assets/models/Wolf.js', function (geo) {
        	model = new THREE.Mesh(geo, mat);
            model.scale.set(20, 20, 20);
            scene.add(model);
    	});
	});
	return model;
}
