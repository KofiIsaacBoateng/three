import clsx from "clsx";
import useMacBookStore from "../store";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import StudioLights from "./three/StudioLights.js";
import ModelSwitcher from "./three/ModelSwitcher.js";
import { useMediaQuery } from "react-responsive";

const Product = () => {
  const { setColor, color, setScale, scale } = useMacBookStore();
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  return (
    <section id="product-viewer">
      <h2>Take a closer look.</h2>

      <div className="controls">
        <div className="flex-center gap-5 mt-5">
          <div className="color-control">
            <div
              onClick={() => setColor("#adb5bd")}
              className={clsx(
                "bg-neutral-300",
                color === "#adb5bd" && "active",
              )}
            />
            <div
              onClick={() => setColor("#2e2c2e")}
              className={clsx(
                "bg-neutral-900",
                color === "#2e2c2e" && "active",
              )}
            />
          </div>

          <div className="size-control">
            <div
              onClick={() => setScale(0.06)}
              className={clsx(
                scale === 0.06
                  ? "bg-white text-black"
                  : "bg-transparent text-white",
              )}
            >
              <p>14"</p>
            </div>
            <div
              onClick={() => setScale(0.08)}
              className={clsx(
                scale === 0.08
                  ? "bg-white text-black"
                  : "bg-transparent text-white",
              )}
            >
              <p>16"</p>
            </div>
          </div>
        </div>
      </div>

      <Canvas
        id="canvas"
        camera={{ position: [0, 2, 5], near: 0.1, far: 1000, fov: 50 }}
      >
        <StudioLights />
        <ModelSwitcher scale={scale} isMobile={isMobile} />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </section>
  );
};

export default Product;
