import { Canvas } from "@react-three/fiber";
import StudioLights from "./three/StudioLights";
import { features } from "../constants";
import clsx from "clsx";
import type { Group } from "three";
import { Suspense, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { Html } from "@react-three/drei";
import MacBookModel from "./models/Macbook";
import { useEffect } from "react";
import useMacBookStore from "../store";
import { featureSequence } from "../constants";
import { preload } from "react-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ModelScroll = () => {
  const ref = useRef<Group | null>(null);
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const { texture, setTexture } = useMacBookStore();

  useEffect(() => {
    featureSequence.map((feature) => {
      const v = document.createElement("video");

      Object.assign(v, {
        src: feature.videoPath,
        muted: true,
        playsInline: true,
        preload: "auto",
        crossOrigin: "anonymous",
      });

      v.load();
    });
  }, []);

  useGSAP(() => {
    const modelTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#f-canvas",
        start: "top top",
        end: "bottom top",
        scrub: 1,
        pin: true,
      },
    });

    const featTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#f-canvas",
        start: "top center",
        end: "bottom top",
        scrub: 1,
      },
    });

    if (ref.current) {
      modelTl.to(ref.current.rotation, {
        y: Math.PI * 2,
        ease: "power2.inOut",
      });
    }

    featTl
      .call(() => setTexture("/videos/feature-1.mp4"))
      .to(".box1", { opacity: 1, y: 0, delay: 1 })
      .call(() => setTexture("/videos/feature-2.mp4"))
      .to(".box2", { opacity: 1, y: 0 })
      .call(() => setTexture("/videos/feature-3.mp4"))
      .to(".box3", { opacity: 1, y: 0 })
      .call(() => setTexture("/videos/feature-4.mp4"))
      .to(".box4", { opacity: 1, y: 0 })
      .call(() => setTexture("/videos/feature-5.mp4"))
      .to(".box5", { opacity: 1, y: 0 });
  }, []);

  return (
    <group ref={ref}>
      <Suspense
        fallback={
          <Html>
            <h1 className="text-white text-3xl uppercase">Loading...</h1>
          </Html>
        }
      >
        <MacBookModel
          ref={ref}
          scale={isMobile ? 0.05 : 0.08}
          position={[0, -1, 0]}
        />
      </Suspense>
    </group>
  );
};

const Features = () => {
  return (
    <section id="features">
      <h2>See it all in a new light.</h2>

      <Canvas
        id="f-canvas"
        camera={{ position: [0, 2, 5], near: 0.1, far: 1000, fov: 50 }}
      >
        <StudioLights />
        <ambientLight intensity={0.5} />

        {/**** 3D MODEL */}
        <ModelScroll />
      </Canvas>

      <div className="absolute inset-0">
        {features.map((feat, index) => (
          <div
            key={feat.id}
            className={clsx("box", `box${index + 1}`, feat.styles)}
          >
            <img src={feat.icon} alt={feat.highlight} />
            <p>
                <span className="text-white">{feat.highlight}</span>
                {feat.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
