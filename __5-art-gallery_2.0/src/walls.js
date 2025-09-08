import * as THREE from "three";

const walls = [
  {
    name: "left-wall",
    width: 150,
    height: 50,
    color: 0x071739,
    position: new THREE.Vector3(-50, 0, 0),
    rotation: new THREE.Vector3(0, Math.PI / 2, 0),
  },
  {
    name: "right-wall",
    width: 150,
    height: 50,
    color: 0x071739,
    position: new THREE.Vector3(50, 0, 0),
    rotation: new THREE.Vector3(0, -Math.PI / 2, 0),
  },
  {
    name: "back-wall",
    width: 100,
    height: 50,
    color: 0x071739,
    position: new THREE.Vector3(0, 0, -75),
    rotation: new THREE.Vector3(0, 0, 0),
  },
  {
    name: "front-wall",
    width: 100,
    height: 50,
    color: 0x071739,
    position: new THREE.Vector3(0, 0, 75),
    rotation: new THREE.Vector3(0, Math.PI, 0),
  },
  {
    name: "floor",
    width: 100,
    height: 150,
    color: 0xe3c390,
    position: new THREE.Vector3(0, -25, 0),
    rotation: new THREE.Vector3(-Math.PI / 2, 0, 0),
  },
  {
    name: "ceiling",
    width: 100,
    height: 150,
    color: 0x4b6382,
    position: new THREE.Vector3(0, 25, 0),
    rotation: new THREE.Vector3(Math.PI / 2, 0, 0),
  },
];

export function createWall(width, height, color, position, rotation) {
  const geometry = new THREE.PlaneGeometry(width, height);
  const material = new THREE.MeshBasicMaterial({
    color: color,
    side: THREE.DoubleSide,
  });
  const wall = new THREE.Mesh(geometry, material);
  wall.position.set(position.x, position.y, position.z);
  wall.rotation.set(rotation.x, rotation.y, rotation.z);
  return wall;
}

export default function addWallsToScene(scene) {
  const wallMeshes = walls.map((wallData) => {
    const wall = createWall(
      wallData.width,
      wallData.height,
      wallData.color,
      wallData.position,
      wallData.rotation
    );
    wall.name = wallData.name;
    scene.add(wall);

    return wall;
  });

  return wallMeshes;
}
