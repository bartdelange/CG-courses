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
var d = 2000;
dirLight.shadow.camera.left = - d;
dirLight.shadow.camera.right = d;
dirLight.shadow.camera.top = d;
dirLight.shadow.camera.bottom = - d;
dirLight.shadow.camera.far = 3500;
dirLight.shadow.bias = - 0.0001;

// Create a sun shape
var sunGeometry = new THREE.SphereGeometry(60, 64, 64);
var sunMaterial = new THREE.MeshBasicMaterial({ map: textureLoader.load('textures/sun.jpg') });
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
let grass = textureLoader.load("textures/texture_grass.jpg");
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
        var transformation = new THREE.Matrix4().makeScale(scale, scale, scale);

        object.applyMatrix(transformation);
        object.position.set(x, y, z);
        scene.add(object);
    });
}

// add models
addModel("./models/json/tree-toon.json", 10, 0, 0,10);
addModel("./models/json/lamp.json",-10,0,10,0.3);


/***************
 * Custom tree *
 ***************/
var geometry = new THREE.SphereGeometry(5, 8, 6);
var material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
var sphere = new THREE.Mesh(geometry, material);
sphere.position.set(10, 10, 10);
sphere.receiveShadow = true;
sphere.castShadow = true;
scene.add(sphere);

function addObjectWithShadow(object){
    scene.add(object);
    object.receiveShadow = true;
    object.castShadow = true;
    return object;
}

function createHouse(x = 0, y = 0, z = 0) {

    var width = 60;
    var length = 80;

    // kinda bad to reuse a var, but better for memory
    var geometry, material, texture;


    geometry = new THREE.BoxGeometry(width, 24, length);

    texture = textureLoader.load('textures/brick_wall.jpg', function (texture) {

        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set(0, 0);
        texture.repeat.set(4, 2);

    });

    material = new THREE.MeshPhongMaterial({map: texture});
    var cube = new THREE.Mesh(geometry, material);
    cube.position.set(x, y + 12, z);
    cube.rotateY(-Math.PI / 2);

    addObjectWithShadow(cube);
// new var instead of geometry
    geometry = new THREE.Geometry();

    geometry.vertices = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 1, 0),
        new THREE.Vector3(1, 1, 0),
        new THREE.Vector3(1, 0, 0),
        new THREE.Vector3(0.5, 0.5, 1)
    ];

    geometry.faces = [
        new THREE.Face3(0, 1, 2),
        new THREE.Face3(0, 2, 3),
        new THREE.Face3(1, 0, 4),
        new THREE.Face3(2, 1, 4),
        new THREE.Face3(3, 2, 4),
        new THREE.Face3(0, 3, 4)
    ];

    // setting texture uvs
    uvs = [];
    uvs.push(new THREE.Vector2(0.0, 0.0));
    uvs.push(new THREE.Vector2(1.0, 0.0));
    uvs.push(new THREE.Vector2(0.5, 1.0));

    geometry.faceVertexUvs[0].push([], [], [uvs[0], uvs[1], uvs[2]], [uvs[0], uvs[1], uvs[2]], [uvs[0], uvs[1], uvs[2]], [uvs[0], uvs[1], uvs[2]]);

    texture = textureLoader.load('textures/roof.jpg', function (texture) {

        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set(0, 0);
        texture.repeat.set(4, 4);

    });

    var roof = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({map: texture}));
    var transformation = new THREE.Matrix4().makeScale(width, length, 26);

    geometry.applyMatrix(transformation);

    roof.rotateX(-Math.PI / 2);
    roof.rotateZ(-Math.PI / 2);
    roof.position.set(x - 40, y + 24, z - 30);
    addObjectWithShadow(roof);

    // windows
    material = new THREE.MeshBasicMaterial({map: textureLoader.load('textures/window.jpg')});
    geometry = new THREE.PlaneBufferGeometry(18, 13, 8, 8);
    var window1 = new THREE.Mesh(geometry, material);

    window1.rotateY(-Math.PI / 2);
    window1.position.set(x - 40.1, 12, z - 9);
    addObjectWithShadow(window1);

    material = new THREE.MeshBasicMaterial({map: textureLoader.load('textures/window.jpg')});
    geometry = new THREE.PlaneBufferGeometry(18, 13, 8, 8);
    var window2 = new THREE.Mesh(geometry, material);

    window2.rotateY(Math.PI / 2);
    window2.position.set(x - 40.1+80.2, 12, z );
    addObjectWithShadow(window2);

    // doors
    material = new THREE.MeshBasicMaterial({map: textureLoader.load('textures/door.jpg')});
    geometry = new THREE.PlaneBufferGeometry(9, 20, 8, 8);
    var doorFront = new THREE.Mesh(geometry, material);

    doorFront.rotateY(-Math.PI / 2);
    doorFront.position.set(x - 40.1, 10, z + 11);
    addObjectWithShadow(doorFront);

    // Mail box
    geometry = new THREE.BoxBufferGeometry(1, 11, 1);
    material = new THREE.MeshBasicMaterial({color: 0x8B4513});
    var pole = new THREE.Mesh(geometry, material);

    pole.position.set(x - 50, 5.5, z + 4);


    geometry = new THREE.BoxBufferGeometry(3, 3, 5);
    material = new THREE.MeshToonMaterial({color: 0xff0000});
    var boxRec = new THREE.Mesh(geometry, material);

    boxRec.position.set(x - 50, 11, z + 4);
    boxRec.rotateY(-Math.PI / 2);

    geometry = new THREE.CylinderGeometry(1.5, 1.5, 5);
    material = new THREE.MeshToonMaterial({color: 0xff0000});
    var boxCil = new THREE.Mesh(geometry, material);

    boxCil.position.set(x - 50, 12.5, z + 4);
    boxCil.rotateZ(-Math.PI / 2);

    addObjectWithShadow(pole);
    addObjectWithShadow(boxRec);
    addObjectWithShadow(boxCil);


    // tree
    geometry = new THREE.CylinderGeometry(1.6, 2.4, 20);
    material = new THREE.MeshToonMaterial({color: 0x8B4513});
    var trunk = new THREE.Mesh(geometry, material);

    trunk.position.set(x - 30, 10, z + 50);

    // big leave sphere
    geometry = new THREE.SphereGeometry(10);
    material = new THREE.MeshPhysicalMaterial({color: 0x3A5F0B});
    var bigSphereLeaves = new THREE.Mesh(geometry, material);

    bigSphereLeaves.position.set(x - 30, 25, z + 50);

    // branch 1
    geometry = new THREE.CylinderGeometry(0.6, 0.4, 8);
    material = new THREE.MeshToonMaterial({color: 0x8B4513});
    var branch1 = new THREE.Mesh(geometry, material);

    branch1.position.set(x - 30, 12, z + 50 + 4);
    branch1.rotateX(-Math.PI / 1.66);
    // leaves
    geometry = new THREE.SphereGeometry(2);
    material = new THREE.MeshToonMaterial({color: 0x3A5F0B});
    var branch1Leaves = new THREE.Mesh(geometry, material);

    branch1Leaves.position.set(x - 30, 13.5 , z + 50 + 8);

    // branch 2
    geometry = new THREE.CylinderGeometry(0.6, 0.4, 8);
    material = new THREE.MeshToonMaterial({color: 0x8B4513});
    var branch2 = new THREE.Mesh(geometry, material);

    branch2.position.set(x - 30, 11, z + 50 - 4);
    branch2.rotateX(Math.PI / 1.33);
    // leaves
    geometry = new THREE.SphereGeometry(2);
    material = new THREE.MeshLambertMaterial({color: 0x3A5F0B});
    var branch2Leaves = new THREE.Mesh(geometry, material);

    branch2Leaves.position.set(x - 30, 15 , z + 50 - 8);

    addObjectWithShadow(trunk);
    addObjectWithShadow(bigSphereLeaves);

    addObjectWithShadow(branch1);
    addObjectWithShadow(branch1Leaves);

    addObjectWithShadow(branch2);
    addObjectWithShadow(branch2Leaves);

}

createHouse(100, 0, 50);

createHouse(100, 0, -50);

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