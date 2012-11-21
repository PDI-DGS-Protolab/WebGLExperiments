
var camera, scene, renderer;
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
    setCameraControls( camera );
    
    // Model controls
    setModelControls();
    
	// Camera follow
 	lookAtModel = true;
 
	// Camera chase
    
    // Model import (JSON)
	importModelJSON();     

}

function animate() {
	requestAnimationFrame( animate );
    controls.update();
    
    if (m) {
    	model.translateZ(speed);
    }
    if (r) {
    	model.rotation.y += rotSpeed;
    }
    
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

function importModelJSON () {
	var loader = new THREE.JSONLoader();	
	
	var tex = THREE.ImageUtils.loadTexture('../../assets/textures/Wolf_Diffuse_256x256.jpg', null, function () {
        var mat = new THREE.MeshBasicMaterial({ map: tex, morphTargets: true });
        loader.load('../../assets/models/Wolf.js', function (geo) {
        	model = new THREE.Mesh(geo, mat);
            scene.add(model);
    	});
	});
}
