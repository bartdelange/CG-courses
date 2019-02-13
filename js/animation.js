function animateCars(delta, vehicle1, vehicle2) {

    if (vehicle1 == null || vehicle2 == null) {
        return;
    }

    vehicle1.position.z += 276 * delta;
    if (vehicle1.position.z > 1000) {
        vehicle1.position.z = -1000;
    }

    vehicle2.position.x += 600 * delta;
    if (vehicle2.position.x > 1000) {
        vehicle2.position.x = -1000;
    }

    var car1IntersectionFront = false, car1IntersectionBack = false, car2Intersection = false;
    x = vehicle1.position.x;
    z = vehicle1.position.z + 10 + 10;
    if (x > -50 && x < 50 && z > 90 && z < 110) {
        car1IntersectionFront = true;
    }

    x = vehicle1.position.x;
    z = vehicle1.position.z - 10;
    if (x > -50 && x < 50 && z > 80 && z < 130) {
        car1IntersectionBack = true;
    }

    x = vehicle2.position.x + 10;
    z = vehicle2.position.z;
    if (x > -50 && x < 50 && z > 50 && z < 150) {
        car2Intersection = true;
    }

    if (car2Intersection && car1IntersectionFront) {
        vehicle1.position.z -= 276 * delta;
    } else if (car2Intersection && car1IntersectionBack) {
        vehicle2.position.x -= 600 * delta;
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