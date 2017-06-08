const createControls = require('orbit-controls');
const assign = require('object-assign');

// module.exports = createApp;
export default function createApp (opt = {}) {

  const dpr = window.devicePixelRatio;

  const renderer = new THREE.WebGLRenderer(assign({
    antialias: true
  }, opt));
  renderer.setPixelRatio(dpr);
  renderer.setClearColor(0xFFCCCC);

  const canvas = renderer.domElement;
  document.body.appendChild(canvas);

  const camera = new THREE.PerspectiveCamera(60, 1, 0.01, 800);
  const target = new THREE.Vector3();
  const scene = new THREE.Scene();
  const controls = createControls(assign({
    canvas,
    distance:400
  }, opt));

  window.addEventListener('resize', resize);
  resize();
  return {
    updateControls,
    camera,
    scene,
    renderer,
    controls,
    canvas
  };

   function updateControls () {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspect = width / height;

    controls.update();
    camera.position.fromArray(controls.position);
    camera.up.fromArray(controls.up);
    camera.lookAt(target.fromArray(controls.direction));

    camera.aspect = aspect;
    camera.updateProjectionMatrix();
  }

  function resize () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    updateControls();
  }
}
