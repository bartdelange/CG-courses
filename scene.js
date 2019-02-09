// Create scene

var scene = new THREE.Scene();

// Create camera
var camera = new THREE.PerspectiveCamera(
    75, // fov — Camera frustum vertical field of view.
    window.innerWidth/window.innerHeight, // aspect — Camera frustum aspect ratio.
    0.1, // near — Camera frustum near plane.
    5000); // far — Camera frustum far plane.

// Create renderer
var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// light
var light = new THREE.DirectionalLight( 0xdddddd, 1 );
light.position.set(0, 0, 1 );
scene.add( light );

camera.position.x = 2; //move right from center of scene
camera.position.y = 1; //move up from center of scene
camera.position.z = 5; //move camera away from center of scene

// skybox
var directions  = ["sky_right.png", "sky_left.png", "sky_top.png", "sky_bottom.png",  "sky_front.png","sky_back.png"];
var materialArray = [];
for (var i = 0; i < 6; i++)
{
    materialArray.push(
        new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture( directions[i]),
            side: THREE.BackSide})
    );
}

var skyGeometry = new THREE.CubeGeometry( 5000, 5000, 5000 );
var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );

scene.add( skyBox );

// Json models
var loader = new THREE.ObjectLoader();

// add model to scene from path
// add x y z if you want to translate it at a given vector
function addModel(path, x= 0, y=0 ,z=0) {
    loader.load(path, function(object) {

        // then directly add the object
        scene.add(object);
        object.position.set(x,y,z);
    });
}

// add models
addModel("./models/json/tree-toon.json",10,0,0);
addModel("./models/json/lamp.json");

// ground (should be plane, not cube)
var geometry = new THREE.BoxGeometry(2000,0,2000);
var material = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('texture_grass.jpg')});
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// import camera control and rotation library
controls = new THREE.OrbitControls( camera );
controls.enableKeys= true;

// RENDER
var render = function () {
    requestAnimationFrame(render);

    controls.update();
    renderer.render(scene, camera);
};

render();