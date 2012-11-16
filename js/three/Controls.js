
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
    camera.position.z = 2000;
    
    // Camera controls
    setControls (camera);
    
    // Skybox
    var urlPrefix	= "../../assets/textures/OrangeCreamSky";
	var urls = [ urlPrefix + "/2.jpg", urlPrefix + "/4.jpg",
			urlPrefix + "/5.jpg", urlPrefix + "/6.jpg",
			urlPrefix + "/1.jpg", urlPrefix + "/3.jpg" ];
			
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
    var light = new THREE.PointLight( 0xffffff );
	light.position.set( -250, 250, -250 );
	scene.add(light);
    
    // Object
    var geometry = new THREE.SphereGeometry( 50, 50, 50 );
    var material = new THREE.MeshLambertMaterial();
    var mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

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