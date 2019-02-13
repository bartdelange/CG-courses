/**
 * Creates a house with a tent shaped roof
 * 
 * @param {int} x 
 * @param {int} y 
 * @param {int} z 
 */
function createTentHouse(x = 0, y = 0, z = 0) {
    var width = 120;
    var length = 80;
    var height = 24;

    var house = new THREE.Group();

    // Ground level 
    var boxGeometry = new THREE.BoxGeometry(width, height, length);
    var brickTexture = textureLoader.load('textures/brick-seamless.jpg');
    brickTexture.wrapS = brickTexture.wrapT = THREE.RepeatWrapping;
    brickTexture.repeat.x = (width / 236) * 10;
    brickTexture.repeat.y = (height / 236) * 10;
    brickMaterial = new THREE.MeshStandardMaterial({ map: brickTexture });
    var groundLevel = new THREE.Mesh(boxGeometry, brickMaterial);
    groundLevel.position.set(x, y + 12, z);
    groundLevel.rotateY(-Math.PI / 2);
    house.add(addShadowToObject(groundLevel));

    var roofSize = length + 10
    var geometry = new PrismGeometry([
        new THREE.Vector2(0, 0), 
        new THREE.Vector2(roofSize, 0), 
        new THREE.Vector2(roofSize / 2, roofSize  / 2)
    ], width);

    var material = new THREE.MeshPhongMaterial({ color: 0x00b2fc, specular: 0x00ffff, shininess: 20 });
    var prism1 = new THREE.Mesh(geometry, material);
    // prism1.rotation.x = -Math.PI  /  2;
    // prism1.rotation.z = -Math.PI  /  2;
    prism1.position.set(x - (roofSize / 2), y + height, z - (width / 2));

    scene.add(prism1);

    addModel("./models/json/tree-toon.json", x + 10, y, z + 100, 10).then(function (obj) { house.add(obj) });

    return house;
}