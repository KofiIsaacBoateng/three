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
phongCubeMesh.position.x = -2;
standardTorusMesh.position.x = 2;
physicalTorusKnotMesh.position.y = -3;

scene.add(nonEnvGroup, envGroup); // add groups to scene
scene.background = new THREE.Color(0x000f);

/** lights for environment reacting meshes */
// ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);

// spot light
const spotLight = new THREE.SpotLight(0xfff, 30, 0, Math.PI / 2, 0, 2);
spotLight.position.z = 5;
// scene.add(spotLight);

// point ligtht
const pointLight = new THREE.PointLight(0xfff, 30, 0);
pointLight.position.z = 5;
scene.add(pointLight);

// directional light
const directionalLight = new THREE.DirectionalLight(0xfff, 30);
directionalLight.position.z = 5;
// scene.add(directionalLight);

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

camera.position.z = 50;
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
