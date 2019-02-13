/**
 * Create's a basic red American mailbox
 * 
 * @param {int} x 
 * @param {int} y 
 * @param {int} z 
 */
function mailbox(x, y, z) {
    var mailbox = new THREE.Group();

    geometry = new THREE.BoxBufferGeometry(1, 11, 1);
    material = new THREE.MeshBasicMaterial({color: 0x8B4513});
    var pole = new THREE.Mesh(geometry, material);
    pole.position.set(x, y + 5.5, z);
    mailbox.add(addShadowToObject(pole));

    geometry = new THREE.BoxBufferGeometry(3, 3, 5);
    material = new THREE.MeshToonMaterial({color: 0xff0000});
    var boxRec = new THREE.Mesh(geometry, material);
    boxRec.position.set(x, y + 11, z);
    boxRec.rotateY(-Math.PI / 2);
    mailbox.add(addShadowToObject(boxRec));

    geometry = new THREE.CylinderGeometry(1.5, 1.5, 5);
    material = new THREE.MeshToonMaterial({color: 0xff0000});
    var boxCil = new THREE.Mesh(geometry, material);
    boxCil.position.set(x, y + 12.5, z);
    boxCil.rotateZ(-Math.PI / 2);
    mailbox.add(addShadowToObject(boxCil));

    return mailbox;
}