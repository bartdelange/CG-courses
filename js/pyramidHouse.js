/**
 * Create's a basic pyramid roof house with a tree, a mailbox and a lightpost
 * 
 * @param {int} x 
 * @param {int} y 
 * @param {int} z 
 */
function createpyramidHouse(x = 0, y = 0, z = 0) {
    var width = 60;
    var length = 80;

    var house = new THREE.Group();
    var geometry, material, texture;

    // Main house square
    geometry = new THREE.BoxGeometry(width, 24, length);
    texture = textureLoader.load('textures/brick_wall.jpg', function (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set(0, 0);
        texture.repeat.set(4, 2);
    });
    material = new THREE.MeshStandardMaterial({ map: texture });
    var cube = new THREE.Mesh(geometry, material);
    cube.position.set(x, y + 12, z);
    cube.rotateY(-Math.PI / 2);
    house.add(addShadowToObject(cube));

    // Roof shape
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

    // Setting roof texture uvs
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

    // Roof
    var roof = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ map: texture }));
    var transformation = new THREE.Matrix4().makeScale(width, length, 26);
    geometry.applyMatrix(transformation);
    roof.rotateX(-Math.PI / 2);
    roof.rotateZ(-Math.PI / 2);
    roof.position.set(x - 40, y + 24, z - 30);
    house.add(addShadowToObject(roof));

    // Window 1
    material = new THREE.MeshStandardMaterial({ map: textureLoader.load('textures/window.jpg') });
    geometry = new THREE.PlaneBufferGeometry(18, 13, 8, 8);
    var window1 = new THREE.Mesh(geometry, material);
    window1.rotateY(-Math.PI / 2);
    window1.position.set(x - 40.1, y + 12, z - 9);
    house.add(addShadowToObject(window1));

    // Window 2
    material = new THREE.MeshStandardMaterial({ map: textureLoader.load('textures/window.jpg') });
    geometry = new THREE.PlaneBufferGeometry(18, 13, 8, 8);
    var window2 = new THREE.Mesh(geometry, material);
    window2.rotateY(Math.PI / 2);
    window2.position.set(x - 40.1 + 80.2, y + 12, z);
    house.add(addShadowToObject(window2));

    // Doors
    material = new THREE.MeshStandardMaterial({ map: textureLoader.load('textures/door.jpg') });
    geometry = new THREE.PlaneBufferGeometry(9, 20, 8, 8);
    var doorFront = new THREE.Mesh(geometry, material);
    doorFront.rotateY(-Math.PI / 2);
    doorFront.position.set(x - 40.1, y + 10, z + 11);
    house.add(addShadowToObject(doorFront));

    // Adding a fixed tree and mailbox to the house
    house.add(mailbox(x - 50, y, z + 4));
    house.add(bigCanopyTree(x - 30, y, z + 50));

    // Adding a lampposts
    addModel("./models/json/lamp.json", x - 60, y, z + 25, 0.3).then(function (obj) { house.add(obj) });
    var textureFlare0 = textureLoader.load('textures/lensflare0.png');
    var light = new THREE.PointLight(0xffff33, 1.5, 50);
    light.position.set(x - 60, y + 26, z + 25);
    house.add(light);
    var lensflare = new THREE.Lensflare();
    lensflare.addElement(new THREE.LensflareElement(textureFlare0, 700, 0, light.color));
    light.add(lensflare);

    return house
}