export default function () {
  const plane= new THREE.PlaneGeometry(500,500, 100,100);
  const planeMaterial = new THREE.ShadowMaterial();
  planeMaterial.opacity = 0.5;
  const planeMesh =  new THREE.Mesh(plane, planeMaterial);
  planeMesh.rotation.x= -90*(Math.PI/180);
  planeMesh.position.set(0, -100, 0);
  planeMesh.receiveShadow = true;
  return planeMesh;
};
