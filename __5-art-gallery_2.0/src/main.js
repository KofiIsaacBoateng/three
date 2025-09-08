import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { PointerLockControls } from "three/examples/jsm/Addons.js";
import addWallsToScene from "./walls";
import { addPaintingToScene } from "./paintings";
import createLights from "./lights";
import "./controls";
import { initiateControls } from "./controls";

// initialize scene
const scene = new THREE.Scene();

// initialize camera
export const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 74);

// add lights
createLights(scene);

// initiate controls
initiateControls();

// initialize renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.NeutralToneMapping;
renderer.setAnimationLoop(renderLoop);
document.body.appendChild(renderer.domElement);

function renderLoop() {
  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// add objects to scene
const walls = addWallsToScene(scene); // walls
const paintings = addPaintingToScene(scene); // paintings
