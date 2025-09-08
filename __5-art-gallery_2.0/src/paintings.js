import * as THREE from "three";

const paintings = [
  // Wall 1 (z = -50) -> front wall
  {
    name: "Sunset",
    artist: "Alice",
    width: 15,
    height: 15,
    position: new THREE.Vector3(-30, 5, -74.85),
    rotation: new THREE.Euler(0, 0, 0),
    wall: "front",
  },

  {
    name: "Ocean",
    artist: "Carol",
    width: 15,
    height: 15,
    position: new THREE.Vector3(0, 5, -74.85),
    rotation: new THREE.Euler(0, 0, 0),
    wall: "front",
  },
  {
    name: "Cityscape",
    artist: "Eve",
    width: 15,
    height: 15,
    position: new THREE.Vector3(30, 5, -74.85),
    rotation: new THREE.Euler(0, 0, 0),
    wall: "front",
  },

  // Wall 2 (x = 50) -> right wall
  {
    name: "Abstract",
    artist: "Frank",
    width: 15,
    height: 15,
    position: new THREE.Vector3(49.85, 5, -30),
    rotation: new THREE.Euler(0, -Math.PI / 2, 0),
    wall: "right",
  },
  {
    name: "Still Life",
    artist: "Heidi",
    width: 15,
    height: 15,
    position: new THREE.Vector3(49.85, 5, 0),
    rotation: new THREE.Euler(0, -Math.PI / 2, 0),
    wall: "right",
  },
  {
    name: "Night Sky",
    artist: "Judy",
    width: 15,
    height: 15,
    position: new THREE.Vector3(49.85, 5, 30),
    rotation: new THREE.Euler(0, -Math.PI / 2, 0),
    wall: "right",
  },

  // Wall 3 (z = 50) -> back wall
  {
    name: "Flowers",
    artist: "Karl",
    width: 15,
    height: 15,
    position: new THREE.Vector3(30, 5, 74.85),
    rotation: new THREE.Euler(0, Math.PI, 0),
    wall: "back",
  },
  {
    name: "Desert",
    artist: "Mallory",
    width: 15,
    height: 15,
    position: new THREE.Vector3(0, 5, 74.85),
    rotation: new THREE.Euler(0, Math.PI, 0),
    wall: "back",
  },
  {
    name: "Winter",
    artist: "Olivia",
    width: 15,
    height: 15,
    position: new THREE.Vector3(-30, 5, 74.85),
    rotation: new THREE.Euler(0, Math.PI, 0),
    wall: "back",
  },

  // Wall 4 (x = -50) -> left wall
  {
    name: "Spring",
    artist: "Peggy",
    width: 15,
    height: 15,
    position: new THREE.Vector3(-49.85, 5, 30),
    rotation: new THREE.Euler(0, Math.PI / 2, 0),
    wall: "left",
  },
  {
    name: "Autumn",
    artist: "Rupert",
    width: 15,
    height: 15,
    position: new THREE.Vector3(-49.85, 5, 0),
    rotation: new THREE.Euler(0, Math.PI / 2, 0),
    wall: "left",
  },
  {
    name: "Dusk",
    artist: "Trent",
    width: 15,
    height: 15,
    position: new THREE.Vector3(-49.85, 5, -30),
    rotation: new THREE.Euler(0, Math.PI / 2, 0),
    wall: "left",
  },
];

export function createPainting(
  name,
  artist,
  width,
  height,
  position,
  rotation,
  wall
) {
  // geometries
  const artGeometry = new THREE.PlaneGeometry(width, height);
  const frameGeometry = new THREE.BoxGeometry(width + 0.5, height + 0.5, 0.1);
  //materials
  const artMeshMaterial = new THREE.MeshBasicMaterial({ color: 0x4b6382 });
  const frameMeshMaterial = new THREE.MeshBasicMaterial({ color: 0xe3c390 });

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
    ({ width, height, position, rotation, name, artist, wall }, index) => {
      const paintingGroup = createPainting(
        name,
        artist,
        width,
        height,
        position,
        rotation,
        wall
      );
      scene.add(paintingGroup);

      return paintingGroup;
    }
  );

  return paintingGroups;
}
