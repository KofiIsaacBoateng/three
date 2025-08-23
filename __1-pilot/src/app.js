import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

// canvas
const canvas = document.querySelector(".threeCanvas");

// initialize a scene
const scene = new THREE.Scene();

// add objects to the scene (mesh or a group)
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1); // geometry
const material = new THREE.MeshBasicMaterial({
  color: "turquoise",
  wireframe: true,
});

// initialize a mesh
const mesh = new THREE.Mesh(cubeGeometry, material);
scene.add(mesh); // add mesh to scene

mesh.position.x = -1;
mesh.position.y = 1;
mesh.position.z = -1;

// initialize a camera
const camera = new THREE.PerspectiveCamera(
  20,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);

const orbitals = new OrbitControls(camera, canvas);
orbitals.autoRotate = true;
orbitals.enableDamping = true;

camera.position.z = 25;
camera.position.y = -1;

// initialize render
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// window resize reset
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight); // set renderer size
  camera.aspect = window.innerWidth / window.innerHeight; // rest camera aspect ratio
  camera.updateProjectionMatrix(); // update camera projection matrix (must be called after any change to camera parameters)
});

function renderLoop() {
  orbitals.update(); // update the orbit controls (if enableDamping is true, must be called in the animation loop)
  renderer.render(scene, camera); // render the scene with the camera

  requestAnimationFrame(renderLoop); // call the renderLoop function on the next frame
}

renderLoop();

const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);
