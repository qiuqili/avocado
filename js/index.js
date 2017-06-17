import * as THREE from 'three';
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


const loader = new THREE.JSONLoader();
loader.load('assets/avo.json',function(geometry, materials) {
  const avo = new THREE.Mesh(geometry,new THREE.MultiMaterial(materials));
  avo.scale.multiplyScalar(8);
  avo.castShadow = true;
  scene.add(avo);
  avo.position.set(0,-50,0)
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

createLoop((dt) => {
  updateControls();
  renderer.render(scene, camera);
}).start();
