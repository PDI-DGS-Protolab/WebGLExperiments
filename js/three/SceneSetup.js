
var camera, scene, renderer;

init();
animate();

function init() {
	
	canvas = $('canvas').get(0);
	
    renderer = new THREE.WebGLRenderer({ antialias: true, canvas : canvas });
    renderer.setSize( canvas.width, canvas.height );
        
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height, 0.1, 10000 );
    camera.position.z = 200;
    
    var urlPrefix	= "../../assets/textures/OrangeCreamSky";
	var urls = [ urlPrefix + "/1.jpg", urlPrefix + "/2.jpg",
			urlPrefix + "/5.jpg", urlPrefix + "/6.jpg",
			urlPrefix + "/3.jpg", urlPrefix + "/4.jpg" ];
			
	var textureCube	= THREE.ImageUtils.loadTextureCube( urls );

	var shader	= THREE.ShaderUtils.lib["cube"];
	shader.uniforms["tCube"].value = textureCube;
	var material = new THREE.ShaderMaterial({
		fragmentShader	: shader.fragmentShader,
		vertexShader	: shader.vertexShader,
		uniforms	: shader.uniforms,
		side: THREE.BackSide
	});

	skyboxMesh	= new THREE.Mesh( new THREE.CubeGeometry( 1000, 1000, 1000 ), material );

	scene.add( skyboxMesh );
	
    
    var light = new THREE.PointLight( 0xffffff );
	light.position.set( 250, 250, 250 );
	scene.add(light);
    
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