// Create scene and default loaders
var scene = new THREE.Scene();
var textureLoader = new THREE.TextureLoader();
var objectLoader = new THREE.ObjectLoader();
textureLoader.crossOrigin = null;
objectLoader.setCrossOrigin(null);

/**********
 * Camera *
 **********/
var camera = new THREE.PerspectiveCamera(
    75, // fov — Camera frustum vertical field of view.
    window.innerWidth / window.innerHeight, // aspect — Camera frustum aspect ratio.
    0.1, // near — Camera frustum near plane.
    5000); // far — Camera frustum far plane.

camera.position.x = 20; //move right from center of scene
camera.position.y = 10; //move up from center of scene
camera.position.z = 50; //move camera away from center of scene

/************
 * Renderer *
 ************/
renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.gammaInput = true;
renderer.gammaOutput = true;
renderer.shadowMap.enabled = true;


addWorldObjects(scene);


/***************
 * Random tree *
 ***************/
addModel("./models/json/tree-toon.json", 10, 0, 0, 10).then(function (obj) { scene.add(obj) });


scene.add(createPiramidHouse(100, 0, 50));
scene.add(createPiramidHouse(100, 0, -50));

// import camera control and rotation library
controls = new THREE.OrbitControls(camera);
controls.enableKeys = true;
controls.dampingFactor = 1;

// RENDER
var render = function () {
    requestAnimationFrame(render);

    controls.update();
    renderer.render(scene, camera);
};

render();