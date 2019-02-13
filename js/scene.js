/********
 * INIT *
 ********/
// Create scene and default loaders
var scene = new THREE.Scene();
var clock = new THREE.Clock();
var textureLoader = new THREE.TextureLoader();
var objectLoader = new THREE.ObjectLoader();
textureLoader.crossOrigin = null;
objectLoader.setCrossOrigin(null);

// Camera
var camera = new THREE.PerspectiveCamera(
    75, // fov — Camera frustum vertical field of view.
    window.innerWidth / window.innerHeight, // aspect — Camera frustum aspect ratio.
    0.1, // near — Camera frustum near plane.
    5000); // far — Camera frustum far plane.

camera.position.x = 20; //move right from center of scene
camera.position.y = 10; //move up from center of scene
camera.position.z = 50; //move camera away from center of scene

// Renderer
renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.gammaInput = true;
renderer.gammaOutput = true;
renderer.shadowMap.enabled = true;

// import camera control and rotation library
controls = new THREE.OrbitControls(camera);
controls.enableKeys = true;
controls.dampingFactor = 1;
/************
 * END INIT *
 ************/

addWorldObjects(scene);
scene.add(createpyramidHouse(100, 0, 30));
scene.add(createpyramidHouse(100, 0, -100));
scene.add(createTentHouse(-100, 0, 00));
scene.add(createRoad(0, 0, 0, 10000))

var car1 = null, car2 = null;
addModel("models/json/classic-1982-tron-light-cycle-blue-threejs/classic-1982-tron-light-cycle-blue.json", 10, 0, 0, 10).then(function (obj) {
    scene.add(obj);
    car1 = obj;
    car1.position.set(0, 5, 0);
    scene.add(car1);
});

addModel("models/json/classic-1982-tron-light-cycle-blue-threejs/classic-1982-tron-light-cycle-blue.json", 10, 0, 0, 10).then(function (obj) {
    scene.add(obj);
    car2 = obj;
    car2.position.set(0, 5, 100);
    car2.rotateY(-Math.PI / 2);
    scene.add(car2);
});


// RENDER
var render = function () {
    requestAnimationFrame(render);

    var delta = clock.getDelta();
    animateCars(delta, car1, car2);
    animateTrees(delta);

    controls.update();
    renderer.render(scene, camera);
};

render();