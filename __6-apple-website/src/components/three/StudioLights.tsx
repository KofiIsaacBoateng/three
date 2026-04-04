import { Environment, Lightformer } from "@react-three/drei";

const StudioLights = () => {
  return (
    <group>
      <Environment resolution={256}>
        <group>
          <Lightformer
            scale={10}
            form="rect"
            intensity={10}
            position={[-10, 5, -5]}
            rotation-y={Math.PI / 2}
          />

          <Lightformer
            scale={10}
            form="rect"
            intensity={10}
            position={[10, 0, 1]}
            rotation-y={Math.PI / 2}
          />
        </group>
      </Environment>

      <spotLight
        intensity={Math.PI * 0.2}
        decay={0}
        angle={0.15}
        position={[-2, 10, 5]}
      />
      <spotLight
        intensity={Math.PI * 0.2}
        decay={0}
        angle={0.15}
        position={[0, -25, 5]}
      />

      <spotLight
        intensity={Math.PI * 1}
        decay={0}
        angle={0.15}
        position={[0, 15, 5]}
      />
    </group>
  );
};

export default StudioLights;
