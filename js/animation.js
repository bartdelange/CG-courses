function animateCars(delta, vehicle1, vehicle2) {

    if (vehicle1 == null || vehicle2 == null) {
        return;
    }

    vehicle1.position.z += 276 * delta;
    if (vehicle1.position.z > 1000) {
        vehicle1.position.z = -1000;
    }

    vehicle2.position.z += -600 * delta;
    if (vehicle2.position.z < -1000) {
        vehicle2.position.z = 1000;
    }
}

window.trees = [];
function addAnimatedTree(tree) {
    tree.rotation.x = (Math.random() * 1000 - 500) / 10000
    window.trees.push({
        toSide: 0.03,
        tree
    })
}
function animateTrees(delta) {
    for (i = 0; i < window.trees.length; i++) {
        if (window.trees[i].tree == null) {
            break;
        }
        window.trees[i].tree.rotation.x += window.trees[i].toSide * delta;
        if (window.trees[i].tree.rotation.x > 0.05 && window.trees[i].toSide > 0) {
            window.trees[i].toSide *= -1;
        } else if (window.trees[i].tree.rotation.x < -0.05 && window.trees[i].toSide < 0) {
            window.trees[i].toSide *= -1;
        }
    }
}