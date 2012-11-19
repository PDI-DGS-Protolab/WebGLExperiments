
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
    
        
    // Camera controls
    setControls (camera);
    
    // Model import
    var loader = new THREE.JSONLoader();
	 // loader.load( "../../assets/models/Wolf.js", onGeometry );
 // }
// 
// function onGeometry (geom) {
	// var mat = new THREE.TextureLoader();
	// mat.load('../../assets/textures/Wolf_Diffuse_256x256.jpg');
	// material = new THREE.MeshBasicMaterial( { color: 0xffffff, map: new THREE.Texture(), morphTargets: true } );
	// image = '../../assets/textures/Wolf_Diffuse_256x256.jpg';
	// mat.map.image = image;
	// wolf = new THREE.Mesh( geom, mat );
	// wolf.scale.set(20, 20, 20);
	// wolf.position.set(0, -500, 0);
	// // wolf.geometry.dynamic  = true;
	// wolf.overdraw = true;
	// scene.add(wolf);
// 	

	
	// tex = THREE.ImageUtils.loadTexture('../../assets/textures/Wolf_Diffuse_256x256.jpg', null, function () {
            // mat = new THREE.MeshBasicMaterial({ map: tex, morphTargets: true });
            // loader.load('../../assets/models/Wolf.js', function (geo) {
                // wolf = new THREE.Mesh(geo, mat);
                // wolf.scale.set(20, 20, 20);
				// wolf.position.set(0, -500, 0);
                // // etc, etc
                // scene.add(wolf);
            // });
        // });
         
			loader.createModel( JSON.parse('../../assets/models/Wolf.js'), function( geometry ) {

						mat = new THREE.MeshBasicMaterial( { color: 0xffffff, map: new THREE.Texture(), morphTargets: true } );

						mesh = new THREE.MorphAnimMesh( geometry, mat );
						mesh.rotation.y = -Math.PI/2;
						mesh.scale.set(5,5,5);
						mesh.duration = 1000*(md.info.frames/10);

						scene.add( mesh );
					} );
				var image = document.createElement( 'img' );
				mat.map.image = image;

				image.onload = function () {
					mat.map.needsUpdate = true;
				};

				image.src = '../../assets/textures/Wolf_Diffuse_256x256.jpg';
                
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