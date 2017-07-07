
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

function initCannon() {
    world = new CANNON.World();
    world.gravity.set(0,-10,0);
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 10;
    shape = new CANNON.Box(new CANNON.Vec3(1,1,1));
    mass = 3;
    body = new CANNON.Body({
      mass: 3
    });
    body.addShape(shape);
    body.angularVelocity.set(0,10,0);
    body.angularDamping = 0.5;
    world.addBody(body);
}

//load model
  const loader = new THREE.JSONLoader();
  loader.load('assets/avo.json',loadmodel);
  function loadmodel(geometry, materials) {
  console.log("load")
  avo = new THREE.Mesh(geometry,new THREE.MultiMaterial(materials));
  avo.scale.multiplyScalar(8);
  avo.castShadow = true;
  scene.add(avo);
  avo.position.set(0,-50,0);
}

const floor = createPlane();
floor.receiveShadow = true;
scene.add(floor);
const lights = createLights();
scene.add(lights);

renderer.shadowMap.enabled = true;
renderer.shadowMapSoft = true;
renderer.gammaInput = true;
renderer.gammaOutput = true;


window.addEventListener("mousedown", onMouseDown, false );
window.addEventListener("mouseup", onMouseUp, false );
window.addEventListener("mousemove", onMouseMove, false );

function onMouseDown(e){
  initCannon();
  createLoop((dt) => {
  updatePhysics();
}).start();
  avo.position.set(0,-50,0);
}

function onMouseUp(e) {
  console.log("up")
}

function onMouseMove(e){
var pos = getIntersectsPoints(e.clientX,e.clientY);
avo.position.set(pos.x,pos.y,0.5);
}

function getIntersectsPoints(clientX,clientY){
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
mouse.x = ( clientX / window.innerWidth ) * 2 - 1;
mouse.y = - ( clientY / window.innerHeight ) * 2 + 1;
raycaster.setFromCamera( mouse, camera );
var intersects = raycaster.intersectObjects( scene.children );
for ( var i = 0; i < intersects.length; i++ ) {
  // console.log(intersects[i].point.x)
  return intersects[i].point
}
}

// var marker= false;
// function setMarker(x,y,z) {
//    if(!marker){
//       var shape = new THREE.SphereGeometry(10, 8, 8);
//       marker = new THREE.Mesh(shape, new THREE.MeshLambertMaterial( { color: 0xff0000 } ));
//       scene.add(marker);
//    }
//       marker.visible = true;
//       marker.position.set(x,y,z);
//  }

function updatePhysics() {
    world.step(timeStep);
  // Copy coordinates from Cannon.js to Three.js
  // avo.position.copy(body.position);
  avo.quaternion.copy(body.quaternion);
  }

createLoop((dt) => {
// updateControls();
renderer.render(scene, camera);
}).start();
