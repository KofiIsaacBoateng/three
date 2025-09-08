import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { PointerLockControls } from "three/examples/jsm/Addons.js";
import addWallsToScene from "./walls";

// initialize scene
const scene = new THREE.Scene();

// initialize camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 45;

// initialize renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.NeutralToneMapping;
renderer.toneMappingExposure = 1.5;
// renderer.outputEncoding = THREE.sRGBEncoding
renderer.setAnimationLoop(renderLoop);
document.body.appendChild(renderer.domElement);

// initialize orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.position0.set(0, 0, 0);
controls.enableDamping = true;
controls.minDistance = 0;
controls.maxDistance = 50;
controls.zoomSpeed = 3;

// initialize pointer lock controls
// const pointerControls = new PointerLockControls(camera, renderer.domElement);

function renderLoop() {
  controls.update();
  //   pointerControls.update();
  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// add a objects here
const walls = addWallsToScene(scene);
