import { Environment, Float, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";

interface Model {
  name: string;
  modelPath: string;
  scale: number;
  rotation: [number, number, number];
}

const TechIconCardsExperience = ({ model }: { model: Model }) => {
  const { scene } = useGLTF(model.modelPath);

  useEffect(() => {
    if (model.name === "Interactive Developer") {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh && child.name === "Object_5") {
          child.material = new THREE.MeshStandardMaterial({ color: "#fff" });
        }
      });
    }
  }, [scene, model.name]);

  return (
    <Canvas>
      <ambientLight intensity={0.3} />
      {/* <directionalLight position={[5, 5, 5]} intensity={1} /> */}

      <Environment preset="city" />

      <Float speed={5} floatIntensity={1} rotationIntensity={0.5}>
        <group scale={model.scale} rotation={model.rotation}>
          <primitive object={scene} />
        </group>
      </Float>

      <OrbitControls enableZoom={false} />
    </Canvas>
  );
};

export default TechIconCardsExperience;
