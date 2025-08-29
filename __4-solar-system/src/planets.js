import * as THREE from "three";

// texture loader
const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();
cubeTextureLoader.setPath("templates/cubeMap/");

export const mercuryMaterial = new THREE.MeshStandardMaterial({
  map: textureLoader.load("templates/mercury.jpg"),
});
export const venusMaterial = new THREE.MeshStandardMaterial({
  map: textureLoader.load("templates/venus.jpg"),
});
export const earthMaterial = new THREE.MeshStandardMaterial({
  map: textureLoader.load("templates/earth.jpg"),
});
export const marsMaterial = new THREE.MeshStandardMaterial({
  map: textureLoader.load("templates/mars.jpg"),
});
export const moonMaterial = new THREE.MeshStandardMaterial({
  map: textureLoader.load("templates/moon.jpg"),
});

export const sunMaterial = new THREE.MeshStandardMaterial({
  map: textureLoader.load("templates/sun.jpg"),
});

export const cubeMap = cubeTextureLoader.load([
  "nx.png",
  "px.png",
  "ny.png",
  "py.png",
  "nz.png",
  "pz.png",
]);

export default [
  {
    name: "Mercury",
    radius: 0.5,
    distance: 10,
    speed: 0.01,
    material: mercuryMaterial,
    moons: [],
  },
  {
    name: "Venus",
    radius: 0.8,
    distance: 15,
    speed: 0.007,
    material: venusMaterial,
    moons: [],
  },
  {
    name: "Earth",
    radius: 1,
    distance: 20,
    speed: 0.005,
    material: earthMaterial,
    moons: [
      {
        name: "Moon",
        radius: 0.3,
        distance: 1.5,
        speed: 0.015,
      },
    ],
  },
  {
    name: "Mars",
    radius: 0.7,
    distance: 25,
    speed: 0.003,
    material: marsMaterial,
    moons: [
      {
        name: "Phobos",
        radius: 0.1,
        distance: 1,
        speed: 0.02,
      },
      {
        name: "Deimos",
        radius: 0.2,
        distance: 2,
        speed: 0.015,
        color: 0xffffff,
      },
    ],
  },
];
