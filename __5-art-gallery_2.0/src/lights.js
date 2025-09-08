import * as THREE from "three";

export default (scene) => {
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(0, 2, 0);
  directionalLight.castShadow = true;
  directionalLight.receiveShadow = true;
  scene.add(directionalLight);

  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight1.position.set(0, -10, 0);
  directionalLight1.castShadow = true;
  directionalLight1.receiveShadow = true;
  scene.add(directionalLight1);

  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight2.position.set(-10, -10, 0);
  directionalLight2.castShadow = true;
  directionalLight2.receiveShadow = true;
  scene.add(directionalLight2);

  const directionalLight3 = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight3.position.set(10, -10, 0);
  directionalLight3.castShadow = true;
  directionalLight3.receiveShadow = true;
  scene.add(directionalLight3);

  const directionalLight4 = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight4.position.set(0, -10, 15);
  directionalLight4.castShadow = true;
  directionalLight4.receiveShadow = true;
  scene.add(directionalLight4);

  const directionalLight5 = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight5.position.set(0, -10, -30);
  directionalLight5.castShadow = true;
  directionalLight5.receiveShadow = true;
  scene.add(directionalLight5);

  const floorLight = new THREE.DirectionalLight(0xffffff, 2);
  floorLight.position.set(0, 20, 0);
  floorLight.target.position.set(0, 0, 0);
  scene.add(floorLight);
  scene.add(floorLight.target);

  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);
};
