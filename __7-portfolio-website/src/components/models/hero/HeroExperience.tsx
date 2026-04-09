import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import RoomModel from "./Room";
import RoomLights from "./RoomLights";
import Particles from "./Particles";

const HeroExperience = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
      <RoomLights />
      <Particles count={200} />
      <OrbitControls
        enablePan={false}
        enableZoom={!isTablet}
        maxDistance={20}
        minDistance={5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 5}
      />
      <group
        position={[0, -3.5, 0]}
        scale={isMobile ? 0.9 : isTablet ? 1.2 : 1.2}
        rotation={[0, -Math.PI / 4, 0]}
      >
        <RoomModel />
      </group>
    </Canvas>
  );
};

export default HeroExperience;
