import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

// canvas
const canvas = document.querySelector(".threeCanvas");

// initialize a scene
const scene = new THREE.Scene();

// add objects to the scene (mesh or a group)
const cube = new THREE.BoxGeometry(1, 1, 1); // cube
const sphere = new THREE.SphereGeometry(0.8, 30, 30);
const torus = new THREE.TorusGeometry(0.5, 0.2, 16, 100);
const torusKnot = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 100);

// non-environment reacting materials
const basicMaterial = new THREE.MeshBasicMaterial({
  color: 0x049ef4,
  wireframe: true,
});
const matCapMaterial = new THREE.MeshMatcapMaterial({
  color: 0x049ef4,
});
const meshDepthMaterial = new THREE.MeshBasicMaterial({
  color: 0x049ef4,
  wireframe: true,
});

// Environment Reacting Materials
const lambertMaterial = new THREE.MeshLambertMaterial({ color: 0x049ef4 });
const meshPhongMaterial = new THREE.MeshPhongMaterial({
  color: 0x049ef4,
  shininess: 100,
});
const standardMaterial = new THREE.MeshStandardMaterial({
  color: 0x049ef4,
  metalness: 0.8,
  roughness: 0.1,
});
const physicalMaterial = new THREE.MeshPhysicalMaterial({
  color: 0x049ef4,
  metalness: 1,
  roughness: 0.3,
  reflectivity: 1,
  clearcoat: 1,
});

// initialize a mesh
const basicCubeMesh = new THREE.Mesh(cube, basicMaterial);
const matCapSphereMesh = new THREE.Mesh(sphere, matCapMaterial);
const depthTorusMesh = new THREE.Mesh(torus, meshDepthMaterial);
const lambertSphereMesh = new THREE.Mesh(sphere, lambertMaterial);
const phongCubeMesh = new THREE.Mesh(cube, meshPhongMaterial);
const standardTorusMesh = new THREE.Mesh(torus, standardMaterial);
const physicalTorusKnotMesh = new THREE.Mesh(torusKnot, physicalMaterial);

// create group for non-environment reacting mesh
const nonEnvGroup = new THREE.Group();
nonEnvGroup.add(basicCubeMesh, matCapSphereMesh, depthTorusMesh);

// create group for environment reacting mesh
const envGroup = new THREE.Group();
envGroup.add(
  lambertSphereMesh,
  phongCubeMesh,
  standardTorusMesh,
  physicalTorusKnotMesh
);

nonEnvGroup.position.y = 1.5;
envGroup.position.y = -1.5;
basicCubeMesh.position.x = -2;
depthTorusMesh.position.x = 2;

scene.add(nonEnvGroup, envGroup); // add groups to scene

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
