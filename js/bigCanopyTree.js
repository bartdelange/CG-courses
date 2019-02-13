/**
 * Create a tree with 2 branches and one big canopy
 * 
 * @param {int} x 
 * @param {int} y 
 * @param {int} z 
 */
function bigCanopyTree(x, y, z) {
    var tree = new THREE.Group();

    // Trunk
    geometry = new THREE.CylinderGeometry(1.6, 2.4, 20);
    material = new THREE.MeshToonMaterial({color: 0x8B4513});
    var trunk = new THREE.Mesh(geometry, material);
    trunk.position.set(x, y + 10, z);
    tree.add(addShadowToObject(trunk));

    // Big canopy
    geometry = new THREE.SphereGeometry(10);
    material = new THREE.MeshPhysicalMaterial({color: 0x3A5F0B});
    var bigCanopy = new THREE.Mesh(geometry, material);
    bigCanopy.position.set(x, y + 25, z);
    tree.add(addShadowToObject(bigCanopy));

    // Branch 1
    geometry = new THREE.CylinderGeometry(0.6, 0.4, 8);
    material = new THREE.MeshToonMaterial({color: 0x8B4513});
    var branch1 = new THREE.Mesh(geometry, material);
    branch1.position.set(x, y + 12, z + 4);
    branch1.rotateX(-Math.PI / 1.66);
    tree.add(addShadowToObject(branch1));
    // - Leaves
    geometry = new THREE.SphereGeometry(2);
    material = new THREE.MeshToonMaterial({color: 0x3A5F0B});
    var branch1Leaves = new THREE.Mesh(geometry, material);
    branch1Leaves.position.set(x, y + 13.5 , z + 8);
    tree.add(addShadowToObject(branch1Leaves));

    // Branch 2
    geometry = new THREE.CylinderGeometry(0.6, 0.4, 8);
    material = new THREE.MeshToonMaterial({color: 0x8B4513});
    var branch2 = new THREE.Mesh(geometry, material);
    branch2.position.set(x, y + 11, z - 4);
    branch2.rotateX(Math.PI / 1.33);
    tree.add(addShadowToObject(branch2));
    // - Leaves
    geometry = new THREE.SphereGeometry(2);
    material = new THREE.MeshLambertMaterial({color: 0x3A5F0B});
    var branch2Leaves = new THREE.Mesh(geometry, material);
    branch2Leaves.position.set(x, y + 15 , z - 8);
    tree.add(addShadowToObject(branch2Leaves));

    return tree;
}