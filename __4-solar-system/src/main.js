import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import planets, { sunMaterial, cubeMap } from "./planets";

// get dom elements
const canvas = document.querySelector(".canvas");

const galaxyCube = new THREE.CubeTexture();
// create a scene
const scene = new THREE.Scene();
scene.background = cubeMap;

// add objects
const sphere = new THREE.SphereGeometry(2, 32, 16);

// create mesh
const mesh = new THREE.Mesh(sphere, sunMaterial);
scene.add(mesh);

// add light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1000, 1000);
pointLight.position.set(0, 5, 15);
scene.add(pointLight);

// create a camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  400
);
camera.position.set(0, 5, 15);

// create renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.NeutralToneMapping;
renderer.toneMappingExposure = 1;
renderer.setAnimationLoop(renderLoop);

// orbitals
const orbitals = new OrbitControls(camera, renderer.domElement);
orbitals.autoRotate = true;
orbitals.enableDamping = true;
orbitals.maxDistance = 200;
orbitals.minDistance = 5;

// add renderer to dom (must be done after orbit controls)
document.body.appendChild(renderer.domElement);

function renderLoop() {
  mesh.rotation.y += 0.01;

  orbitals.update();
  renderer.render(scene, camera);
}
