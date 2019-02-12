// Create scene
var scene = new THREE.Scene();

// Create camera
var camera = new THREE.PerspectiveCamera(
    75, // fov — Camera frustum vertical field of view.
    window.innerWidth / window.innerHeight, // aspect — Camera frustum aspect ratio.
    0.1, // near — Camera frustum near plane.
    5000); // far — Camera frustum far plane.

// Create renderer
var renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// light
var light = new THREE.DirectionalLight(0xdddddd, 1);
light.position.set(0, 0, 1);
scene.add(light);

camera.position.x = 2; //move right from center of scene
camera.position.y = 1; //move up from center of scene
camera.position.z = 5; //move camera away from center of scenefir


// skybox
var directions = ["textures/sky_right.png", "textures/sky_left.png", "textures/sky_top.png", "textures/sky_bottom.png", "textures/sky_front.png", "textures/sky_back.png"];
var materialArray = [];
for (var i = 0; i < 6; i++) {
    materialArray.push(
        new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture(directions[i]),
            side: THREE.BackSide
        })
    );
}

var skyGeometry = new THREE.CubeGeometry(5000, 5000, 5000);
var skyMaterial = new THREE.MeshFaceMaterial(materialArray);
var skyBox = new THREE.Mesh(skyGeometry, skyMaterial);

scene.add(skyBox);

// ground
var mat = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('textures/texture_grass.jpg')});
var geo = new THREE.PlaneBufferGeometry(2000, 2000, 8, 8);
var goundPlane = new THREE.Mesh(geo, mat);

scene.add(goundPlane);
goundPlane.rotateX(-Math.PI / 2);

var roadMat = new THREE.MeshNormalMaterial();
var roadGeo = new THREE.PlaneBufferGeometry(100, 500, 9, 8);
var roadPlane = new THREE.Mesh(roadGeo, roadMat);

scene.add(roadPlane);
roadPlane.rotateX(-Math.PI / 2);
roadPlane.position.set(0, 0.1, 0);

// Json models
var loader = new THREE.ObjectLoader();

// add model to scene from path
// add x y z if you want to translate it at a given vector
function addModel(path, x = 0, y = 0, z = 0,width=1,length=1,height=1) {
    loader.load(path, function (object) {

        // then directly add the object
        var transformation = new THREE.Matrix4().makeScale(width, length, height);

        object.applyMatrix(transformation);
        scene.add(object);
        object.position.set(x, y, z);

    });
}

function createHouse(x = 0, y = 0, z = 0) {

    var width = 60;
    var length = 80;

    var geometry, material;
    geometry = new THREE.BoxGeometry(width, 24, length);

    var loader = new THREE.TextureLoader();

    var texture = loader.load('textures/brick_wall.jpg', function (texture) {

        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set(0, 0);
        texture.repeat.set(4, 2);

    });

    material = new THREE.MeshBasicMaterial({map: texture});
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    cube.position.set(x, y + 12, z);
    cube.rotateY(-Math.PI / 2);

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

    loader = new THREE.TextureLoader();

    texture = loader.load('textures/roof.jpg', function (texture) {

        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set(0, 0);
        texture.repeat.set(4, 4);

    });

    var roof = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({map: texture}));
    var transformation = new THREE.Matrix4().makeScale(width, length, 26);

    geometry.applyMatrix(transformation);
/// xxx

    scene.add(roof);

    roof.rotateX(-Math.PI / 2);
    roof.rotateZ(-Math.PI / 2);
    roof.position.set(x - 40, y + 24, z - 30);


    // doors, windows etc


    // windows
    var mat = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('textures/window.jpg')});
    var geo = new THREE.PlaneBufferGeometry(18, 13, 8, 8);
    var window1 = new THREE.Mesh(geo, mat);

    scene.add(window1);
    window1.rotateY(-Math.PI / 2);
    window1.position.set(x - 40.1, 12, z - 9);

    mat = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('textures/window.jpg')});
    geo = new THREE.PlaneBufferGeometry(18, 13, 8, 8);
    var window2 = new THREE.Mesh(geo, mat);

    scene.add(window2);
    window2.rotateY(-Math.PI / 2);
    window2.position.set(x - 40.1, 12, z - 9);


    // doors
    mat = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('textures/door.jpg')});
    geo = new THREE.PlaneBufferGeometry(9, 20, 8, 8);
    var doorFront = new THREE.Mesh(geo, mat);

    scene.add(doorFront);
    doorFront.rotateY(-Math.PI / 2);
    doorFront.position.set(x - 40.1, 10, z + 11);


    // Mail box
    geometry = new THREE.BoxBufferGeometry(1, 11, 1);
    mat = new THREE.MeshBasicMaterial({color: 0x8B4513});
    var pole = new THREE.Mesh(geometry, mat);
    scene.add(pole);

    pole.position.set(x - 50, 5.5, z + 4);


    geometry = new THREE.BoxBufferGeometry(3, 3, 5);
    mat = new THREE.MeshToonMaterial({color: 0xff0000});
    var boxRec = new THREE.Mesh(geometry, mat);


    scene.add(boxRec);
    boxRec.position.set(x - 50, 11, z + 4);
    boxRec.rotateY(-Math.PI / 2);

    geometry = new THREE.CylinderGeometry(1.5, 1.5, 5);
    mat = new THREE.MeshToonMaterial({color: 0xff0000});
    var boxCil = new THREE.Mesh(geometry, mat);

    scene.add(boxCil);
    boxCil.position.set(x - 50, 12.5, z + 4);
    boxCil.rotateZ(-Math.PI / 2);

    // tree
    geometry = new THREE.CylinderGeometry(1.6, 2.4, 20);
    mat = new THREE.MeshToonMaterial({color: 0x8B4513});
    var trunk = new THREE.Mesh(geometry, mat);

    scene.add(trunk);
    trunk.position.set(x - 30, 10, z + 50);

    // big leave sphere
    geometry = new THREE.SphereGeometry(10);
    mat = new THREE.MeshPhysicalMaterial({color: 0x3A5F0B});
    var bigSphereLeaves = new THREE.Mesh(geometry, mat);

    scene.add(bigSphereLeaves);
    bigSphereLeaves.position.set(x - 30, 25, z + 50);

    // branch 1
    geometry = new THREE.CylinderGeometry(0.6, 0.4, 8);
    mat = new THREE.MeshToonMaterial({color: 0x8B4513});
    var branch1 = new THREE.Mesh(geometry, mat);

    scene.add(branch1);
    branch1.position.set(x - 30, 12, z + 50 + 4);
    branch1.rotateX(-Math.PI / 1.66);
    // leaves
    geometry = new THREE.SphereGeometry(2);
    mat = new THREE.MeshToonMaterial({color: 0x3A5F0B});
    var branch1Leaves = new THREE.Mesh(geometry, mat);

    scene.add(branch1Leaves);
    branch1Leaves.position.set(x - 30, 13.5 , z + 50 + 8);

    // branch 2
    geometry = new THREE.CylinderGeometry(0.6, 0.4, 8);
    mat = new THREE.MeshToonMaterial({color: 0x8B4513});
    var branch2 = new THREE.Mesh(geometry, mat);

    scene.add(branch2);
    branch2.position.set(x - 30, 11, z + 50 - 4);
    branch2.rotateX(Math.PI / 1.33);
    // leaves
    geometry = new THREE.SphereGeometry(2);
    mat = new THREE.MeshLambertMaterial({color: 0x3A5F0B});
    var branch2Leaves = new THREE.Mesh(geometry, mat);

    scene.add(branch2Leaves);
    branch2Leaves.position.set(x - 30, 15 , z + 50 - 8);

}

// add models
addModel("./models/json/tree-toon.json", 10, 0, 0,10,10,10);
addModel("./models/json/lamp.json");


createHouse(100, 0, 50);


createHouse(100, 0, -50);

// import camera control and rotation library
controls = new THREE.OrbitControls(camera);
controls.enableKeys = true;

// RENDER
var render = function () {
    requestAnimationFrame(render);

    controls.update();
    renderer.render(scene, camera);
};

render();