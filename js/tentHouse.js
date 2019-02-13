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

    // Window 1
    material = new THREE.MeshStandardMaterial({ map: textureLoader.load('textures/window2.png') });
    geometry = new THREE.PlaneBufferGeometry(25, 12, 8, 8);
    var window = new THREE.Mesh(geometry, material);
    window.rotateY(Math.PI / 2);
    window.position.set(x + ((length / 2) + 0.1), y + 12, z);
    house.add(addShadowToObject(window));

    // Window 2
    geometry = new THREE.PlaneBufferGeometry(25, 12, 8, 8);
    var window = new THREE.Mesh(geometry, material);
    window.rotateY(Math.PI / 2);
    window.position.set(x + ((length / 2) + 0.1), y + 12, z - (width / 4));
    house.add(addShadowToObject(window));

    // Door
    material = new THREE.MeshStandardMaterial({map: textureLoader.load('textures/door.jpg')});
    geometry = new THREE.PlaneBufferGeometry(9, 20, 8, 8);
    var doorFront = new THREE.Mesh(geometry, material);
    doorFront.rotateY(Math.PI / 2);
    doorFront.position.set(x + ((length / 2) + 0.1), y + 10, z + (width / 4) + 10);
    house.add(addShadowToObject(doorFront));

    // Roof
    var roofSize = length + 10
    var geometry = new PrismGeometry([
        new THREE.Vector2(0, 0),
        new THREE.Vector2(roofSize, 0),
        new THREE.Vector2(roofSize / 2, roofSize / 2)
    ], width);
    var roofTexture = textureLoader.load('textures/frontend-large.jpg')
    roofTexture.wrapS = roofTexture.wrapT = THREE.RepeatWrapping;
    roofTexture.repeat.x = 0.05;
    roofTexture.repeat.y = 0.05;
    var material = new THREE.MeshStandardMaterial({ map: roofTexture });
    var prism1 = new THREE.Mesh(geometry, material);
    prism1.position.set(x - (roofSize / 2), y + height, z - (width / 2));
    house.add(prism1);

    addModel("./models/json/tree-toon.json", x + 10, y, z + 100, 10).then(function (tree) {
        addAnimatedTree(tree)
        house.add(tree)
    });

    return house;
}