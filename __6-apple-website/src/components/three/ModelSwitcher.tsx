import { PresentationControls } from "@react-three/drei";
import MacBookModel14 from "../models/Macbook-14";
import { useRef, type RefObject } from "react";
import { Group, Mesh } from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import MacBookModel16 from "../models/Macbook-16";

const ANIMATION_DURATION = 1;
const OFFSET = 10;

const fadeIn = (macbook: RefObject<Group | null>, opacity: number) => {
  if (!macbook.current) return;

  macbook.current.traverse((child) => {
    if (child instanceof Mesh) {
      const material = child.material;

      material.transparent = true;
      gsap.to(material, { opacity, duration: ANIMATION_DURATION });
    }
  });
};

const move = (macbook: RefObject<Group | null>, x: number) => {
  if (!macbook.current) return;

  gsap.to(macbook.current.position, { x, duration: ANIMATION_DURATION });
};

const ModelSwitcher = ({
  scale,
  isMobile,
}: {
  scale: number;
  isMobile: boolean;
}) => {
  const SCALE_LARGE_MOBILE = 0.03;
  const SCALE_LARGE_DESKTOP = 0.08;
  const smallMacBookRef = useRef<Group | null>(null);
  const largeMacBookRef = useRef<Group | null>(null);

  const showLargeMacBook =
    scale === SCALE_LARGE_DESKTOP || scale === SCALE_LARGE_MOBILE;

  useGSAP(() => {
    if (showLargeMacBook) {
      move(largeMacBookRef, 0);
      move(smallMacBookRef, -OFFSET);

      fadeIn(largeMacBookRef, 1);
      fadeIn(smallMacBookRef, 0);
    } else {
      move(largeMacBookRef, OFFSET);
      move(smallMacBookRef, 0);

      fadeIn(largeMacBookRef, 0);
      fadeIn(smallMacBookRef, 1);
    }
  }, [scale]);

  return (
    <>
      <PresentationControls
        snap={true}
        speed={1}
        zoom={1}
        rotation={[0, 0, 0]}
        polar={[-Math.PI / 3, Math.PI / 3]}
        azimuth={[-Math.PI / 1.4, Math.PI / 2]}
        config={{ mass: 1, tension: 0, friction: 26 }}
      >
        <group ref={smallMacBookRef}>
          <MacBookModel14 scale={isMobile ? 0.03 : 0.06} />
        </group>
      </PresentationControls>
      <PresentationControls
        snap={true}
        speed={1}
        zoom={1}
        rotation={[0, 0, 0]}
        polar={[-Math.PI / 3, Math.PI / 3]}
        azimuth={[-Math.PI / 1.4, Math.PI / 2]}
        config={{ mass: 1, tension: 0, friction: 26 }}
      >
        <group ref={largeMacBookRef}>
          <MacBookModel16 scale={isMobile ? 0.05 : 0.08} />
        </group>
      </PresentationControls>
    </>
  );
};

export default ModelSwitcher;
