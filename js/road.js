/**
 * Create's a amizing road
 * 
 * @param {int} x 
 * @param {int} y 
 * @param {int} z 
 * @param {int} length
 */
function createRoad(x, y, z, length) {
    var road = new THREE.Group();
    var roadWidth = 75;

    // Asphalt
    var asphaltTexture = textureLoader.load('textures/asphalt.jpg');
    asphaltTexture.repeat.set(1, 100);
    asphaltTexture.wrapT = asphaltTexture.wrapS = THREE.RepeatWrapping;
    var geometry = new THREE.PlaneGeometry(roadWidth, length, 32);
    var material = new THREE.MeshBasicMaterial({ map: asphaltTexture });
    var asphalt = new THREE.Mesh(geometry, material);
    asphalt.rotateX(-Math.PI / 2);
    asphalt.position.set(x, y + 1, z - 30);
    road.add(asphalt);

    // Curb
    var geometry = new THREE.BoxGeometry(2, length, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var curbLeft = new THREE.Mesh(geometry, material);
    curbLeft.rotateX(-Math.PI / 2);
    curbLeft.position.set(x + (roadWidth / 2), y + 1, z - 30);
    road.add(curbLeft);

    var geometry = new THREE.BoxGeometry(2, length, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var curbRight = new THREE.Mesh(geometry, material);
    curbRight.rotateX(-Math.PI / 2);
    curbRight.position.set(x - (roadWidth / 2), y + 1, z - 30);
    road.add(curbRight);

    return road;
}