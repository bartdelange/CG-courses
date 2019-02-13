/**
 * Adds general world objects to the scene
 * 
 * @param {THREE.Scene} scene 
 */
function addWorldObjects(scene) {
    /*******
     * Sun *
     *******/
    // Light all areas with a hemi light (simulates "reflection")
    hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
    hemiLight.color.setHSL(0.6, 1, 0.6);
    hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    hemiLight.position.set(0, 500, 0);
    scene.add(hemiLight);

    // Create a "Sun" light that creates brighter light points where the sun would shine
    dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.color.setHSL(0.1, 1, 0.95);
    dirLight.position.set(-20, 27.5, 20);
    dirLight.position.multiplyScalar(30);
    scene.add(dirLight);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    var d = 2000;
    dirLight.shadow.camera.left = - d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = - d;
    dirLight.shadow.camera.far = 3500;
    dirLight.shadow.bias = - 0.0001;

    // These create a sun like effect
    var textureFlare0 = textureLoader.load( 'textures/lensflare0.png' );
    var textureFlare3 = textureLoader.load( 'textures/lensflare3.png' );
    var lensflare = new THREE.Lensflare();
    lensflare.addElement( new THREE.LensflareElement( textureFlare0, 700, 0, dirLight.color ) );
    lensflare.addElement( new THREE.LensflareElement( textureFlare3, 60, 0.6 ) );
    lensflare.addElement( new THREE.LensflareElement( textureFlare3, 70, 0.7 ) );
    lensflare.addElement( new THREE.LensflareElement( textureFlare3, 120, 0.9 ) );
    lensflare.addElement( new THREE.LensflareElement( textureFlare3, 70, 1 ) );
    dirLight.add( lensflare );

    /**********
     * Skybox *
     **********/
    scene.background = new THREE.Color().setHSL(0.6, 0, 1);
    scene.fog = new THREE.Fog(scene.background, 1, 5000);
    
    var vertexShader = document.getElementById('vertexShader').textContent;
    var fragmentShader = document.getElementById('fragmentShader').textContent;
    var uniforms = {
        "topColor": { value: new THREE.Color(0x0077ff) },
        "bottomColor": { value: new THREE.Color(0xffffff) },
        "offset": { value: 33 },
        "exponent": { value: 0.6 }
    };
    
    uniforms["topColor"].value.copy(hemiLight.color);
    scene.fog.color.copy(uniforms["bottomColor"].value);
    
    var skyGeo = new THREE.SphereBufferGeometry(4000, 32, 15);
    var skyMat = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        side: THREE.BackSide
    });
    var sky = new THREE.Mesh(skyGeo, skyMat);
    scene.add(sky);

    /**********
     * ground *
     **********/
    let grass = textureLoader.load("textures/texture_grass.jpg");
    grass.anisotropy = 32;
    grass.repeat.set(100, 100);
    grass.wrapT = THREE.RepeatWrapping;
    grass.wrapS = THREE.RepeatWrapping;

    var groundGeo = new THREE.PlaneGeometry(10000, 10000);
    var groundMat = new THREE.MeshStandardMaterial({ map: grass })
    var ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.set(0, 0, 0);
    ground.rotation.x -= Math.PI / 2;
    ground.receiveShadow = true;
    ground.castShadow = false;
    scene.add(ground);
}
