import * as THREE from "three";
import { OrbitControls, Reflector } from "three/examples/jsm/Addons.js";
import { Easing, Tween, update as updateTween } from "tween";

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

// dom elements
const titleElement = document.getElementById("title");
const artistElement = document.getElementById("artist");

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
renderer.toneMappingExposure = 1;
document.body.appendChild(renderer.domElement);

function renderLoop() {
  updateTween();
  renderer.render(scene, camera);
}

const COUNT = images.length;
for (let i = 0; i < COUNT; i++) {
  const image = texture.load(images[i]);

  const baseNode = new THREE.Object3D();
  baseNode.rotation.y = -1 * i * ((2 * Math.PI) / COUNT);

  const border = new THREE.Mesh(
    new THREE.BoxGeometry(3.2, 2.2, 0.01),
    new THREE.MeshStandardMaterial({ color: 0x505050 })
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
  left.name = `left-${i}`;
  baseNode.add(left);

  const right = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.3, 0.01),
    new THREE.MeshStandardMaterial({ map: rightArrow, transparent: true })
  );
  right.position.set(1.8, 0, -4);
  right.name = `right-${i}`;
  baseNode.add(right);

  rootNode.add(baseNode);
}

// add light
const spotLight = new THREE.SpotLight(0xffffff, 100.0, 10.0, 0.65, 1);
spotLight.position.set(0, 4, 0);
spotLight.target.position.set(0, 1, -4);
scene.add(spotLight);
scene.add(spotLight.target);

// mirror
const mirror = new Reflector(new THREE.CircleGeometry(40, 64), {
  color: 0x505050,
  textureWidth: window.innerWidth * window.devicePixelRatio,
  textureHeight: window.innerHeight * window.devicePixelRatio,
});

mirror.position.set(0, -1.1, 0);
mirror.rotateX(-Math.PI / 2);
scene.add(mirror);

window.addEventListener("resize", (e) => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  mirror
    .getRenderTarget()
    .setSize(
      window.innerWidth * window.devicePixelRatio,
      window.innerHeight * window.devicePixelRatio
    );
});

window.addEventListener("click", (e) => {
  const mouse = new THREE.Vector2();
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);
  const intersection = raycaster.intersectObjects(rootNode.children, true);
  if (intersection.length > 0) {
    const [arrow, index] = intersection[0].object.name.split("-");
    console.log(arrow, Number(index));
    if (arrow === "left" || arrow === "right") {
      const direction = arrow === "left" ? -1 : 1;

      rotateGallery(direction, Number(index));
    }
  }
});

function rotateGallery(direction, index) {
  const angle = (2 * Math.PI) / COUNT;
  const currentRotation = rootNode.rotation.y;
  const newIndex =
    direction === -1
      ? index === 0
        ? COUNT - 1
        : index - 1
      : index === COUNT - 1
      ? 0
      : index + 1;

  titleElement.style.opacity = 0;
  artistElement.style.opacity = 0;
  new Tween(rootNode.rotation)
    .to({ y: currentRotation + direction * angle }, 1500)
    .easing(Easing.Quadratic.InOut)
    .start()
    .onComplete(() => {
      titleElement.style.opacity = 1;
      artistElement.style.opacity = 1;
      titleElement.innerText = titles[newIndex];
      artistElement.innerText = artists[newIndex];
    });
}

titleElement.innerText = titles[0];
artistElement.innerText = artists[0];
