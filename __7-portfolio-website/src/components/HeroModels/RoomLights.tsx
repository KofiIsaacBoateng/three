import * as THREE from "three";

const RoomLights = () => {
  return (
    <>
      <spotLight
        position={[2, 5, 6]}
        intensity={100}
        color="white"
        angle={0.15}
        penumbra={0.2}
      />

      <spotLight
        position={[4, 5, 4]}
        intensity={40}
        color="#4cc9f0"
        angle={0.3}
        penumbra={0.5}
      />

      <spotLight
        position={[-3, 5, 5]}
        intensity={60}
        color="#9d4edd"
        angle={0.45}
        penumbra={1}
      />

      <primitive
        object={new THREE.RectAreaLight("#a259ff", 8, 3, 2)}
        intensity={15}
        rotation={[-Math.PI / 4, Math.PI / 4, 0]}
        position={[1, 3, 4]}
      />
      <pointLight position={[1, 2, -2]} intensity={10} color="#0d00a4" />
    </>
  );
};

export default RoomLights;
