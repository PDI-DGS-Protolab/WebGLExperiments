
var camera, scene, renderer;

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
    camera.position.z = 2000;
    
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
    render();
}


function render () {
    renderer.render(scene, camera);
}