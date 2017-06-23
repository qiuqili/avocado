
import * as THREE from 'three';
import * as CANNON from 'cannon';
import createLoop from 'raf-loop';
import createApp from  './app';
import createLights from './lighting';
import createPlane from './plane';

const{
    renderer,
    camera,
    scene,
    updateControls
} = createApp();

var world, mass, body, shape, timeStep=1/60,avo;

initCannon();
function initCannon() {
    world = new CANNON.World();
    world.gravity.set(0,0,0);
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 10;

    shape = new CANNON.Box(new CANNON.Vec3(1,1,1));
    mass = 13;
    body = new CANNON.Body({
      mass: 13
    });
    body.addShape(shape);
    body.angularVelocity.set(0,10,0);
    body.angularDamping = 0.5;
    world.addBody(body);
}

//load model
  const loader = new THREE.JSONLoader();
  loader.load('assets/avo.json',function(geometry, materials) {
  avo = new THREE.Mesh(geometry,new THREE.MultiMaterial(materials));
  avo.scale.multiplyScalar(8);
  avo.castShadow = true;
  scene.add(avo);
  avo.position.set(0,-50,0);
});

const floor = createPlane();
floor.receiveShadow = true;
scene.add(floor);
const lights = createLights();
scene.add(lights);

renderer.shadowMap.enabled = true;
renderer.shadowMapSoft = true;
renderer.gammaInput = true;
renderer.gammaOutput = true;


 function updatePhysics() {
    // Step the physics world
    world.step(timeStep);
    // Copy coordinates from Cannon.js to Three.js
    // avo.position.copy(body.position);
    avo.quaternion.copy(body.quaternion);
    }

createLoop((dt) => {
  updateControls();
  updatePhysics();
  renderer.render(scene, camera);
}).start();
