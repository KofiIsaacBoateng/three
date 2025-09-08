import * as THREE from "three";

const floor = [
  { name: "basecolor", texture: "/textures/floor/basecolor.jpg" },
  { name: "normal", texture: "/textures/floor/normal.png" },
  { name: "metalness", texture: "/textures/floor/metalness.jpg" },
  { name: "roughness", texture: "/textures/floor/roughness.jpg" },
  { name: "displacement", texture: "/textures/floor/displacement.tiff" },
];
const ceiling = [
  { name: "ao", texture: "/textures/ceiling/ao.jpg" },
  { name: "basecolor", texture: "/textures/ceiling/basecolor.jpg" },
  { name: "normal", texture: "/textures/ceiling/normal.jpg" },
  { name: "roughness", texture: "/textures/ceiling/roughness.jpg" },
  { name: "displacement", texture: "/textures/ceiling/displacement.png" },
];
const walls = [
  { name: "basecolor", texture: "/textures/walls/basecolor.jpg" },
  { name: "normal", texture: "/textures/walls/normal.png" },
  { name: "metalness", texture: "/textures/walls/metalness.jpg" },
  { name: "roughness", texture: "/textures/walls/roughness.jpg" },
  { name: "displacement", texture: "/textures/walls/displacement.tiff" },
];
const floorLight = [
  { name: "basecolor", texture: "/textures/floor-light/basecolor.jpg" },
  { name: "normal", texture: "/textures/floor-light/normal.png" },
  { name: "metalness", texture: "/textures/floor-light/metalness.jpg" },
  { name: "roughness", texture: "/textures/floor-light/roughness.jpg" },
  { name: "displacement", texture: "/textures/floor-light/displacement.tiff" },
];

const textureLoader = new THREE.TextureLoader();

export const loadTexture = (url) => {
  const texture = textureLoader.load(url);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
};

const loadTextures = (urls) => {
  return urls.map((url) => {
    const texture = loadTexture(url.texture);
    texture.repeat.set(2, 2);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return { ...url, texture };
  });
};

export const floorTextures = loadTextures(floor);
export const ceilingTextures = loadTextures(ceiling);
export const wallTextures = loadTextures(walls);
export const floorLightTextures = loadTextures(floorLight);
