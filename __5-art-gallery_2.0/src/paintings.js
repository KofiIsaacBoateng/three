import * as THREE from "three";
import { loadTexture } from "./textureLoader";

const paintings = [
  // Wall 1 (z = -50) -> front wall
  {
    name: "Starry Night",
    artist: "Vincent Van Gogh",
    width: 25,
    height: 20,
    position: new THREE.Vector3(-60, -5, -99.85),
    rotation: new THREE.Euler(0, 0, 0),
    wall: "front",
    image: "/textures/paintings/starry_night.jpg",
  },

  {
    name: "Mona Lisa",
    artist: "Leonardo Da Vinci",
    width: 17,
    height: 25,
    position: new THREE.Vector3(0, -5, -99.85),
    rotation: new THREE.Euler(0, 0, 0),
    wall: "front",
    image: "/textures/paintings/mona_lisa.jpg",
  },
  {
    name: "La Rêve",
    artist: "Pablo Picasso",
    width: 20,
    height: 25,
    position: new THREE.Vector3(60, -5, -99.85),
    rotation: new THREE.Euler(0, 0, 0),
    wall: "front",
    image: "/textures/paintings/la-reve.jpg",
  },

  // Wall 2 (x = 50) -> right wall
  {
    name: "San Giorgio Maggiore at Dusk",
    artist: "Claude Monet",
    width: 25,
    height: 20,
    position: new THREE.Vector3(99.85, -5, -60),
    rotation: new THREE.Euler(0, -Math.PI / 2, 0),
    wall: "right",
    image: "/textures/paintings/san-giorgio-maggiore-at-dusk.jpg",
  },
  {
    name: "Girl with a Pearl Earring",
    artist: "Johannes Vermeer",
    width: 20,
    height: 25,
    position: new THREE.Vector3(99.85, -5, 0),
    rotation: new THREE.Euler(0, -Math.PI / 2, 0),
    wall: "right",
    image: "/textures/paintings/girl-with-pearl-earring.jpg",
  },
  {
    name: "The Scream",
    artist: "Edvard Munch",
    width: 20,
    height: 25,
    position: new THREE.Vector3(99.85, -5, 60),
    rotation: new THREE.Euler(0, -Math.PI / 2, 0),
    wall: "right",
    image: "/textures/paintings/the-scream.jpg",
  },

  // Wall 3 (z = 50) -> back wall
  {
    name: "The Persistence of Memory",
    artist: "Salvador Dali",
    width: 25,
    height: 20,
    position: new THREE.Vector3(60, -5, 99.85),
    rotation: new THREE.Euler(0, Math.PI, 0),
    wall: "back",
    image: "/textures/paintings/the-persistence-of-memory.jpg",
  },
  {
    name: "The False Mirror",
    artist: "René Magritte",
    width: 20,
    height: 15,
    position: new THREE.Vector3(0, -5, 99.85),
    rotation: new THREE.Euler(0, Math.PI, 0),
    wall: "back",
    image: "/textures/paintings/the-false-mirror.jpg",
  },
  {
    name: "Birth Of Venus",
    artist: "Sandro Botticelli",
    width: 25,
    height: 15,
    position: new THREE.Vector3(-60, -5, 99.85),
    rotation: new THREE.Euler(0, Math.PI, 0),
    wall: "back",
    image: "/textures/paintings/birth-of-venus.jpg",
  },

  // Wall 4 (x = -50) -> left wall
  {
    name: "The Treachery of Images",
    artist: "René François Ghislain Magritte",
    width: 25,
    height: 20,
    position: new THREE.Vector3(-99.85, -5, 60),
    rotation: new THREE.Euler(0, Math.PI / 2, 0),
    wall: "left",
    image: "/textures/paintings/the-treachery-of-images.jpg",
  },
  {
    name: "Dance",
    artist: "Henri Matisse",
    width: 25,
    height: 18,
    position: new THREE.Vector3(-99.85, -5, 0),
    rotation: new THREE.Euler(0, Math.PI / 2, 0),
    wall: "left",
    image: "/textures/paintings/dance.jpg",
  },
  {
    name: "Two Fridas",
    artist: "Frida Kahlo",
    width: 25,
    height: 25,
    position: new THREE.Vector3(-99.85, -5, -60),
    rotation: new THREE.Euler(0, Math.PI / 2, 0),
    wall: "left",
    image: "/textures/paintings/two-fridas.jpg",
  },
];

export function createPainting(
  name,
  artist,
  width,
  height,
  position,
  rotation,
  wall,
  image
) {
  // geometries
  const artGeometry = new THREE.PlaneGeometry(width, height);
  const frameGeometry = new THREE.BoxGeometry(width + 1, height + 1, 0.1);
  //materials
  const artMeshMaterial = new THREE.MeshStandardMaterial({
    map: loadTexture(image),
  });
  const frameMeshMaterial = new THREE.MeshBasicMaterial({ color: 0x777777 });

  // mesh
  const artMesh = new THREE.Mesh(artGeometry, artMeshMaterial);
  // art position slightly in front of the wall and frame to avoid z-fighting and stay visible
  if (wall === "front") {
    artMesh.position.set(position.x, position.y, position.z + 0.15);
  } else if (wall === "back") {
    artMesh.position.set(position.x, position.y, position.z - 0.15);
  } else if (wall === "left") {
    artMesh.position.set(position.x + 0.15, position.y, position.z);
  } else if (wall === "right") {
    artMesh.position.set(position.x - 0.15, position.y, position.z);
  }
  artMesh.rotation.copy(rotation);
  artMesh.name = name;
  artMesh.userData = { artist, type: "painting" };

  const frameMesh = new THREE.Mesh(frameGeometry, frameMeshMaterial);
  frameMesh.position.copy(position);
  frameMesh.rotation.copy(rotation);

  const painting = new THREE.Group();
  painting.add(artMesh, frameMesh);

  return painting;
}

export function addPaintingToScene(scene) {
  const paintingGroups = paintings.map(
    (
      { width, height, position, rotation, name, artist, wall, image },
      index
    ) => {
      const paintingGroup = createPainting(
        name,
        artist,
        width,
        height,
        position,
        rotation,
        wall,
        image
      );
      scene.add(paintingGroup);

      return paintingGroup;
    }
  );

  return paintingGroups;
}
