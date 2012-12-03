
var camera, scene, renderer;
var clock = new THREE.Clock();
var rotSpeed = 0.015;
var model;
var lookAtModel = false;

var current = 0;
var modal = $('#modal');
var headline = modal.find('.headline');
var details  = modal.find('.details');

var headlinesA = [ 'Point Lights', 'Directional Light', 'Spot Light', 'Ambient Light' ];
var detailsA = [ 'with diffuse and specular modifiers', '', '', '' ];

var currentLights = [];

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
    camera.position.z = -500;
    camera.position.y = 200;

    // Skybox
    var urlPrefix   = "../assets/textures";
    var urls = [ urlPrefix + "/skybox1.jpg", urlPrefix + "/skybox3.jpg",
            urlPrefix + "/skybox5.jpg", urlPrefix + "/skybox4.jpg",
            urlPrefix + "/skybox2.jpg", urlPrefix + "/skybox6.jpg" ];

    var textureCube = THREE.ImageUtils.loadTextureCube( urls );

    var shader  = THREE.ShaderUtils.lib["cube"];
    shader.uniforms["tCube"].value = textureCube;
    var material = new THREE.ShaderMaterial({
        fragmentShader  : shader.fragmentShader,
        vertexShader    : shader.vertexShader,
        uniforms    : shader.uniforms,
        side: THREE.BackSide
    });

    skyboxMesh  = new THREE.Mesh( new THREE.CubeGeometry( 100000, 100000, 100000, 1, 1, 1, null, true ), material );

    scene.add( skyboxMesh );


    // Light
    modal.show();

    headline.text( headlinesA[current] );
    details.text( detailsA[current] );


    pointLights();

    // Camera controls
    setCameraControls( camera );

    // Camera follow
    lookAtModel = true;

    // Camera chase

    // Model import others
    importModelCollada();

    setLightControls();
}

function swapLight ( event ) {

    var lights = [ pointLights, directionalLights, spotLights, ambientLights ];

    if ( event.keyCode === 13 ) {

        for (var i = 0; i < currentLights.length; i++) {
            scene.remove(currentLights[i]);
        }

        current = (current + 1) % lights.length;

        lights[ current ]();

        headline.text( headlinesA[current] );
        details.text( detailsA[current] );
    }
}

function animate() {
	var time = Date.now() * 0.0005;
	var delta = clock.getDelta();

	requestAnimationFrame( animate );
    controls.update();

    if (lookAtModel && model) {
        camera.lookAt(model.position);
        model.rotation.y += rotSpeed;
    }

    if ( current === 0 ) {
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


function pointLights (){

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

    currentLights = [ light1, light2, light3, light4, l1, l2, l3, l4 ];
}

function directionalLights() {
    var directionalLight = new THREE.DirectionalLight( 0xffffff );
    directionalLight.position.set( 0, -70, 100 ).normalize();
    scene.add( directionalLight );
    directionalLight.color.setHSV( 0.1, 0.725, 0.9 );
    currentLights = [ directionalLight ];
}

function spotLights() {
    var spotLight = new THREE.SpotLight( 0xffaa00 );
    scene.add( spotLight );
    currentLights = [ spotLight ];
}

function ambientLights() {
    var ambientLight = new THREE.AmbientLight( 0xffffff );
    ambientLight.color.setHSV( 0.1, 0.5, 0.3 );
    scene.add( ambientLight );
    currentLights = [ ambientLight ];
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

function setLightControls() {
    window.parent.addEventListener('keypress', swapLight, false);
}
