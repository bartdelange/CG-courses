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

/*******
 * Sun *
 *******/
// Light all areas with a hemi light (simulates "reflection")
hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
hemiLight.color.setHSL(0.6, 1, 0.6);
hemiLight.groundColor.setHSL(0.095, 1, 0.75);
hemiLight.position.set(0, 500, 0);
scene.add(hemiLight);

// Create a "Sun" light that creates brighter light points where the sun would shine
dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.color.setHSL(0.1, 1, 0.95);
dirLight.position.set(-20, 27.5, 20);
dirLight.position.multiplyScalar(30);
scene.add(dirLight);
dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;
var d = 100;
dirLight.shadow.camera.left = - d;
dirLight.shadow.camera.right = d;
dirLight.shadow.camera.top = d;
dirLight.shadow.camera.bottom = - d;
dirLight.shadow.camera.far = 3500;
dirLight.shadow.bias = - 0.0001;

// Create a sun shape
var sunGeometry = new THREE.SphereGeometry(60, 64, 64);
var sunMaterial = new THREE.MeshBasicMaterial({ map: textureLoader.load('sun.jpg') });
var sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.position.set(-20, 27.5, 20);
sun.position.multiplyScalar(50);
scene.add(sun);


/**********
 * Skybox *
 **********/
scene.background = new THREE.Color().setHSL(0.6, 0, 1);
scene.fog = new THREE.Fog(scene.background, 1, 5000);

var vertexShader = document.getElementById('vertexShader').textContent;
var fragmentShader = document.getElementById('fragmentShader').textContent;
var uniforms = {
    "topColor": { value: new THREE.Color(0x0077ff) },
    "bottomColor": { value: new THREE.Color(0xffffff) },
    "offset": { value: 33 },
    "exponent": { value: 0.6 }
};

uniforms["topColor"].value.copy(hemiLight.color);
scene.fog.color.copy(uniforms["bottomColor"].value);

var skyGeo = new THREE.SphereBufferGeometry(4000, 32, 15);
var skyMat = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    side: THREE.BackSide
});
var sky = new THREE.Mesh(skyGeo, skyMat);

scene.add(sky);

/**********
 * ground *
 **********/
let grass = textureLoader.load("texture_grass.jpg");
grass.anisotropy = 32;
grass.repeat.set(100, 100);
grass.wrapT = THREE.RepeatWrapping;
grass.wrapS = THREE.RepeatWrapping;

var groundGeo = new THREE.PlaneGeometry(10000, 10000);
var groundMat = new THREE.MeshPhongMaterial({ map: grass })
var ground = new THREE.Mesh(groundGeo, groundMat);
ground.position.set(0, 0, 0);
ground.rotation.x -= Math.PI / 2;
ground.receiveShadow = true;
ground.castShadow = false;
scene.add(ground);


/***************
 * JSON Models *
 ***************/
// add model to scene from path
// add x y z if you want to translate it at a given vector
function addModel(path, x = 0, y = 0, z = 0, scale = 1) {
    objectLoader.load(path, function (object) {

        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        object.position.set(x, y, z);
        scene.add(object);
    });
}

// add models
addModel("./models/json/tree-toon.json", 10, 0, 0);
addModel("./models/json/lamp.json");


/***************
 * Custom tree *
 ***************/
var geometry = new THREE.SphereGeometry(5, 8, 6);
var material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
var sphere = new THREE.Mesh(geometry, material);
sphere.position.set(10, 10, 10);
sphere.receiveShadow = true;
sphere.castShadow = true
scene.add(sphere);


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