import * as THREE from "three";
import {
  ceilingTextures,
  floorLightTextures,
  floorTextures,
  wallTextures,
} from "./textureLoader";

const walls = [
  {
    name: "left",
    width: 150,
    height: 50,
    color: 0x071739,
    position: new THREE.Vector3(-50, 0, 0),
    rotation: new THREE.Vector3(0, Math.PI / 2, 0),
    textures: wallTextures,
  },
  {
    name: "right",
    width: 150,
    height: 50,
    color: 0x071739,
    position: new THREE.Vector3(50, 0, 0),
    rotation: new THREE.Vector3(0, -Math.PI / 2, 0),
    textures: wallTextures,
  },
  {
    name: "back",
    width: 100,
    height: 50,
    color: 0x071739,
    position: new THREE.Vector3(0, 0, -75),
    rotation: new THREE.Vector3(0, 0, 0),
    textures: wallTextures,
  },
  {
    name: "front",
    width: 100,
    height: 50,
    color: 0x071739,
    position: new THREE.Vector3(0, 0, 75),
    rotation: new THREE.Vector3(0, Math.PI, 0),
    textures: wallTextures,
  },
  {
    name: "floor",
    width: 100,
    height: 150,
    color: 0xe3c390,
    position: new THREE.Vector3(0, -25, 0),
    rotation: new THREE.Vector3(Math.PI / 2, 0, 0),
    textures: floorTextures,
  },
  {
    name: "ceiling",
    width: 100,
    height: 150,
    color: 0x4b6382,
    position: new THREE.Vector3(0, 25, 0),
    rotation: new THREE.Vector3(Math.PI / 2, 0, 0),
    textures: ceilingTextures,
  },
];

const createMaterial = (textures, isCeiling = false) => {
  const materialOption = {
    side: THREE.DoubleSide,
    map: textures.find((tex) => tex.name === "basecolor")?.texture || null,
    normalMap: textures.find((tex) => tex.name === "normal")?.texture || null,
    metalnessMap:
      textures.find((tex) => tex.name === "metalness")?.texture || null,
    displacementMap:
      textures.find((tex) => tex.name === "displacement")?.texture || null,
    roughnessMap:
      textures.find((tex) => tex.name === "roughness")?.texture || null,
    aoMap: textures.find((tex) => tex.name === "ao")?.texture || null,
    // displacementScale: isCeiling ? 0.3 : 1,
    // roughness: isCeiling ? 1 : 0.7,
    // metalness: isCeiling ? 0 : 0.2,
  };
  return new THREE.MeshStandardMaterial(materialOption);
};

export function createWall(
  name,
  width,
  height,
  color,
  position,
  rotation,
  textures
) {
  const geometry = new THREE.PlaneGeometry(width, height);
  const material = createMaterial(textures, name === "ceiling");
  const wall = new THREE.Mesh(geometry, material);
  wall.name = name;
  wall.castShadow = true;
  wall.receiveShadow = true;
  wall.position.set(position.x, position.y, position.z);
  wall.rotation.set(rotation.x, rotation.y, rotation.z);
  return wall;
}

export default function addWallsToScene(scene) {
  const wallMeshes = walls.map((wallData) => {
    const wall = createWall(
      wallData.name,
      wallData.width,
      wallData.height,
      wallData.color,
      wallData.position,
      wallData.rotation,
      wallData.textures
    );
    wall.name = wallData.name;
    scene.add(wall);

    return wall;
  });

  return wallMeshes;
}
