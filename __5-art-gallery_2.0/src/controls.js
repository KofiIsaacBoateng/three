import * as THREE from "three";
import { camera } from "./main";

const pressedKeys = new Set();

window.addEventListener("keydown", (e) => {
  if (e.code.startsWith("Arrow")) {
    pressedKeys.add(e.code);
    e.preventDefault();
  }
});

window.addEventListener("keyup", (e) => {
  if (e.code.startsWith("Arrow")) {
    pressedKeys.delete(e.code);
    e.preventDefault();
  }
});

const ROOM_LIMIT = 98; // Slightly inside the wall (walls at 100/-100)

const clampCameraPosition = (camera) => {
  camera.position.x = Math.max(
    -ROOM_LIMIT,
    Math.min(ROOM_LIMIT, camera.position.x)
  );
  camera.position.z = Math.max(
    -ROOM_LIMIT,
    Math.min(ROOM_LIMIT, camera.position.z)
  );
};

function handleMovement() {
  if (pressedKeys.has("ArrowRight")) move("right");
  if (pressedKeys.has("ArrowLeft")) move("left");
  if (pressedKeys.has("ArrowUp")) move("forward");
  if (pressedKeys.has("ArrowDown")) move("back");

  clampCameraPosition(camera);

  requestAnimationFrame(handleMovement);
}

export const initiateControls = () => handleMovement();

const move = (direction) => {
  const speed = 0.5;
  const rotationSpeed = 0.01;
  switch (direction) {
    case "right":
      camera.rotation.y -= rotationSpeed;
      break;
    case "left":
      camera.rotation.y += rotationSpeed;
      break;
    case "forward":
      camera.position.x -= Math.sin(camera.rotation.y) * speed;
      camera.position.z -= Math.cos(camera.rotation.y) * speed;
      break;
    case "back":
      camera.position.x += Math.sin(camera.rotation.y) * speed;
      camera.position.z += Math.cos(camera.rotation.y) * speed;
      break;
  }
};
