function addShadowToObject(object){
    object.receiveShadow = true;
    object.castShadow = true;
    return object;
}


// add model to scene from path
// add x y z if you want to translate it at a given vector
function addModel(path, x = 0, y = 0, z = 0, scale = 1) {
    return new Promise((resolve, reject) => {
        objectLoader.load(path, function (object) {
            object.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child = addShadowToObject(child);
                }
            });
            var transformation = new THREE.Matrix4().makeScale(scale, scale, scale);

            object.applyMatrix(transformation);
            object.position.set(x, y, z);
            resolve(object);
        });
    });
}