
var camera, scene, renderer, controls;

init();
animate();

function init() {
	
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize( window.innerWidth -15, window.innerHeight -21 );
    
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 500;

    $('body').append( renderer.domElement );

    setControls (camera);

}

function animate() {
    requestAnimationFrame( animate );
    controls.update();
}


function render () {
    renderer.render(scene, camera);
}


function setControls (camera){
    controls = new THREE.TrackballControls( camera ); // Creates the controls
    controls.addEventListener( 'change', render );    // Adds a listener for them to work
}