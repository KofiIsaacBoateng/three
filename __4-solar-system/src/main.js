import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

// get dom elements
const canvas = document.querySelector(".canvas");

// create a scene
const scene = new THREE.Scene();

// add objects
const sphere = new THREE.SphereGeometry(2, 32, 16);
const material = new THREE.MeshBasicMaterial({
  color: "aqua",
  wireframe: true,
});
const mesh = new THREE.Mesh(sphere, material);
scene.add(mesh);

// create a camera
const camera = new THREE.PerspectiveCamera(
  120,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// create renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setAnimationLoop(renderLoop);

// orbitals
const orbitals = new OrbitControls(camera, renderer.domElement);
orbitals.autoRotate = true;
orbitals.enableDamping = true;
orbitals.autoRotateSpeed = 10;

// add renderer to dom (must be done after orbit controls)
document.body.appendChild(renderer.domElement);

function renderLoop() {
  orbitals.update();
  renderer.render(scene, camera);
}
