
var camera, scene, renderer;
var model;

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
    

	// Model import others
	importModelCollada();

}


function animate() {
    requestAnimationFrame( animate );
    controls.update();
    render();
}


function render () {
    renderer.render(scene, camera);
}


function setControls (camera){
    controls = new THREE.TrackballControls( camera ); // Creates the controls
    controls.addEventListener( 'change', render );    // Adds a listener for them to work
    controls.maxDistance = 50000;
}

function importModelCollada(){
	var loader = new THREE.ColladaLoader();
	loader.options.convertUpAxis = true;
	loader.load( '../../assets/models/duck/duck.dae',function colladaReady( collada ) {
	
	model = collada.scene;
	
	model.scale.set(5, 5, 5);
	model.updateMatrix();
	scene.add(model);
	camera.lookAt(model.position);
	});
}
