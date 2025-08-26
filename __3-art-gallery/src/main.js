import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const images = [
  "socrates.jpg",
  "stars.jpg",
  "wave.jpg",
  "spring.jpg",
  "mountain.jpg",
  "sunday.jpg",
];

const titles = [
  "The Death of Socrates",
  "Starry Night",
  "The Great Wave off Kanagawa",
  "Effect of Spring, Giverny",
  "Mount Corcoran",
  "A Sunday on La Grande Jatte",
];

const artists = [
  "Jacques-Louis David",
  "Vincent Van Gogh",
  "Katsushika Hokusai",
  "Claude Monet",
  "Albert Bierstadt",
  "George Seurat",
];

// initiate texture loader
const texture = new THREE.TextureLoader();
const leftArrow = texture.load(`left.png`);
const rightArrow = texture.load(`right.png`);

// scene
const scene = new THREE.Scene();
const rootNode = new THREE.Object3D();
scene.add(rootNode);

// camera
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(renderLoop);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.toneMapping = THREE.NeutralToneMapping;
renderer.toneMappingExposure = 2;
document.body.appendChild(renderer.domElement);

function renderLoop() {
  // rootNode.rotation.y += 0.01;
  renderer.render(scene, camera);
}

const COUNT = images.length;
for (let i = 0; i < COUNT; i++) {
  const image = texture.load(images[i]);

  const baseNode = new THREE.Object3D();
  baseNode.rotation.y = i * ((2 * Math.PI) / COUNT);

  const border = new THREE.Mesh(
    new THREE.BoxGeometry(3.2, 2.2, 0.01),
    new THREE.MeshStandardMaterial({ color: 0x303030 })
  );
  border.position.z = -4;
  baseNode.add(border);

  const art = new THREE.Mesh(
    new THREE.BoxGeometry(3, 2, 0.2),
    new THREE.MeshStandardMaterial({ map: image })
  );
  art.position.z = -4;
  baseNode.add(art);

  const left = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.3, 0.01),
    new THREE.MeshStandardMaterial({ map: leftArrow, transparent: true })
  );
  left.position.set(-1.8, 0, -4);
  baseNode.add(left);

  const right = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.3, 0.01),
    new THREE.MeshStandardMaterial({ map: rightArrow, transparent: true })
  );
  right.position.set(1.8, 0, -4);
  baseNode.add(right);

  rootNode.add(baseNode);
}

// add light
const spotLight = new THREE.SpotLight(0xffffff, 100.0, 10.0, 0.65, 1);
spotLight.position.set(0, 4, 0);
spotLight.target.position.set(0, 1, -4);
scene.add(spotLight);
scene.add(spotLight.target);

window.addEventListener("resize", (e) => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
