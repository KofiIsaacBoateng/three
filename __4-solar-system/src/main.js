import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import planets, { sunMaterial, cubeMap, moonMaterial } from "./planets";

// get dom elements
const canvas = document.querySelector(".canvas");

const galaxyCube = new THREE.CubeTexture();
// create a scene
const scene = new THREE.Scene();
scene.background = cubeMap;

/*** Add Objects -> Geometry, material and mesh */
const sunSphere = new THREE.SphereGeometry(3);

const sun = new THREE.Mesh(sunSphere, sunMaterial);
scene.add(sun);

const createPlanet = (data) => {
  const geometry = new THREE.SphereGeometry(data.radius);
  const planetMesh = new THREE.Mesh(geometry, data.material);
  planetMesh.name = data.name;

  // path of motion
  const pathGeometry = new THREE.RingGeometry(data.distance, data.distance, 64);
  const pathMaterial = new THREE.LineBasicMaterial({
    color: 0xaaaaaa,
    transparent: true,
    opacity: 0.2,
  });
  const pathMesh = new THREE.LineLoop(pathGeometry, pathMaterial);
  pathMesh.rotation.x = -Math.PI / 2;
  scene.add(pathMesh);

  return planetMesh;
};

const createMoon = (data) => {
  const geometry = new THREE.SphereGeometry(data.radius);
  const moonMesh = new THREE.Mesh(geometry, moonMaterial);
  moonMesh.name = data.name;

  return moonMesh;
};

const planetMeshes = planets.map((planet) => {
  const planetMesh = createPlanet(planet);

  planet.moons.forEach((moon) => {
    const moonMesh = createMoon(moon);
    planetMesh.add(moonMesh);
  });

  scene.add(planetMesh);
  return planetMesh;
});

// add light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1000);
scene.add(pointLight);

// create a camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  400
);
camera.position.set(0, 20, 50);
camera.lookAt(sun.position);

// create renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.NeutralToneMapping;
renderer.toneMappingExposure = 1;
renderer.setAnimationLoop(renderLoop);

// orbitals
const orbitals = new OrbitControls(camera, renderer.domElement);
orbitals.enableDamping = true;
orbitals.maxDistance = 200;
orbitals.minDistance = 5;

// add renderer to dom (must be done after orbit controls)
document.body.appendChild(renderer.domElement);

function renderLoop() {
  sun.rotation.y += 0.005;

  planetMeshes.forEach((planet, pi) => {
    planet.rotation.y += planets[pi].speed;
    planet.position.x =
      Math.sin(planet.rotation.y + pi * 5) * planets[pi].distance;
    planet.position.z =
      Math.cos(planet.rotation.y + pi * 5) * planets[pi].distance;

    planet.children.forEach((moon, mi) => {
      moon.rotation.y += planets[pi].moons[mi].speed;
      moon.position.x =
        Math.sin(moon.rotation.y) * planets[pi].moons[mi].distance;
      moon.position.z =
        Math.cos(moon.rotation.y) * planets[pi].moons[mi].distance;
    });
  });

  orbitals.update();
  renderer.render(scene, camera);
}

window.addEventListener("resize", (e) => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
