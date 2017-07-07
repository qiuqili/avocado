import * as THREE from 'three';

export default function createLights () {
  const container = new THREE.Object3D();

  const back = new THREE.SpotLight( 0xffffff ,1.5 );
  back.position.set( 0,100, -100 );
  const spot = new THREE.SpotLight( 0xffffff,1.5 );
  spot.position.set( 0, 120, 100 );
  spot.castShadow = true;
  container.add( spot );
  container.add( back );

  const camearHelper = new THREE.CameraHelper(spot.shadow.camera )
  spot.add(camearHelper)
  camearHelper.update;

  const spotHelper = new THREE.SpotLightHelper(spot);
  spot.add(spotHelper );
  spotHelper.update;

  const backHelper = new THREE.SpotLightHelper(back);
  back.add(backHelper);
  backHelper.update;

  return container;
};
