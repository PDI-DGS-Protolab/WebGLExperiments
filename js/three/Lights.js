
var camera, scene, renderer;
var clock = new THREE.Clock();
var speed = 5;
var rotSpeed = 0.05;
var m,r;
var model;
var lookAtModel = false;

var config = {
	SPEED : 5,
	ROTSPEED : 0.05
}

var keyCodes = {
      LEFT_ARROW: 37,
      UP_ARROW: 38,
      RIGHT_ARROW: 39,
      DOWN_ARROW: 40,
      KEY_A: 65,
      KEY_D: 68,
      KEY_S: 83,
      KEY_W: 87,
     }

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
    camera.position.z = -500;
    camera.position.y = 200;
    
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
    addLights();
    
    // Camera controls
    setCameraControls( camera );
    
    // Model controls
    setModelControls();
    
	// Camera follow
 	lookAtModel = true;
 
	// Camera chase

	// Model import others
	importModelCollada();

}


function animate() {
	var time = Date.now() * 0.0005;
	var delta = clock.getDelta();
	
	requestAnimationFrame( animate );
    controls.update();
    
    if (m) {
    	model.translateX(-speed);
    }
    if (r) {
    	model.rotation.y += rotSpeed;
    }
    
    if (lookAtModel && model) {
    	camera.lookAt(model.position);
    }

	light1.position.x = Math.sin( time * 0.7 ) * 200;
	light1.position.y = Math.cos( time * 0.5 ) * 250;
	light1.position.z = Math.cos( time * 0.3 ) * 200;

	light2.position.x = Math.cos( time * 0.3 ) * 200;
	light2.position.y = Math.sin( time * 0.5 ) * 250;
	light2.position.z = Math.sin( time * 0.7 ) * 200;

	light3.position.x = Math.sin( time * 0.7 ) * 200;
	light3.position.y = Math.cos( time * 0.3 ) * 250;
	light3.position.z = Math.sin( time * 0.5 ) * 200;

	light4.position.x = Math.sin( time * 0.3 ) * 200;
	light4.position.y = Math.cos( time * 0.7 ) * 250;
	light4.position.z = Math.sin( time * 0.5 ) * 200;
	
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


function addLights (){
	var light = new THREE.AmbientLight( 0xffffff );
	scene.add( light );

	light1 = new THREE.PointLight( 0xff0040, 1 );
	scene.add( light1 );

	light2 = new THREE.PointLight( 0x0040ff, 1 );
	scene.add( light2 );

	light3 = new THREE.PointLight( 0x80ff80, 1 );
	scene.add( light3 );

	light4 = new THREE.PointLight( 0xffaa00, 1 );
	scene.add( light4 );

	var sphere = new THREE.SphereGeometry( 5, 16, 8 );

	var l1 = new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xff0040 } ) );
	l1.position = light1.position;
	scene.add( l1 );

	var l2 = new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x0040ff } ) );
	l2.position = light2.position;
	scene.add( l2 );

	var l3 = new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x80ff80 } ) );
	l3.position = light3.position;
	scene.add( l3 );

	var l4 = new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xffaa00 } ) );
	l4.position = light4.position;
	scene.add( l4 );
}


function move( event ) {
	
	if ( (event.keyCode == keyCodes.UP_ARROW || event.keyCode == keyCodes.KEY_W) && !m ) {
		speed = -config.SPEED;
		m = true;
	}
	
	if ( (event.keyCode == keyCodes.DOWN_ARROW || event.keyCode == keyCodes.KEY_S) && !m ) {
		speed = config.SPEED;
		m = true;
	}
	
	if ( (event.keyCode == keyCodes.RIGHT_ARROW || event.keyCode == keyCodes.KEY_D) && !r ) {
		rotSpeed = -config.ROTSPEED;
		r = true;
	}
	
	if ( (event.keyCode == keyCodes.LEFT_ARROW || event.keyCode == keyCodes.KEY_A) && !r ) {
		rotSpeed = config.ROTSPEED;
		r = true;
	}
}


function stop( event ) {
	
	if ( (event.keyCode == keyCodes.UP_ARROW || event.keyCode == keyCodes.KEY_W) && m ) {
		m = false;
	}
	
	if ( (event.keyCode == keyCodes.DOWN_ARROW || event.keyCode == keyCodes.KEY_S) && m ) {
		m = false;
	}
	
	if ( (event.keyCode == keyCodes.RIGHT_ARROW || event.keyCode == keyCodes.KEY_D) && r ) {
		r = false;
	}
	
	if ( (event.keyCode == keyCodes.LEFT_ARROW || event.keyCode == keyCodes.KEY_A) && r ) {
		r = false;
	}
}


function setModelControls() {
	$(window).on('keydown', move);
	$(window).on('keyup', stop);
}

function importModelCollada(){
	var loader = new THREE.ColladaLoader();
	loader.load( '../../assets/models/duck/duck.dae',function colladaReady( collada ) {
		model = collada.scene;
		model.updateMatrix();
		scene.add(model);
		camera.lookAt(model.position);
	});
}
