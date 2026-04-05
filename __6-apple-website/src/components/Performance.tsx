import { useGSAP } from "@gsap/react";
import { performanceImages, performanceImgPositions } from "../constants";
import { useMediaQuery } from "react-responsive";
import { useRef } from "react";
import gsap from "gsap";

const Performance = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".content p",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: "#performance",
            start: "center 40%",
            end: "bottom center",
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );

      if (isMobile) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "center center",
          scrub: true,
          invalidateOnRefresh: true,
        },
        defaults: { ease: "power2.inOut", duration: 2, overwrite: "auto" },
      });

      performanceImgPositions.forEach((position) => {
        if (position.id === "p5") return;
        const positionVars: Record<string, string> = {};

        if (position.left !== undefined)
          positionVars.left = `${position.left}%`;
        if (position.right !== undefined)
          positionVars.right = `${position.right}%`;
        if (position.bottom !== undefined)
          positionVars.bottom = `${position.bottom}%`;

        tl.to(`.${position.id}`, positionVars, 0);
      });
    },
    { scope: sectionRef, dependencies: [isMobile] },
  );
  return (
    <section ref={sectionRef} id="performance">
      <h2>Next-level graphics performance. Game on.</h2>

      <div className="wrapper">
        {performanceImages.map(({ src, id }) => (
          <img key={id} src={src} alt={id} className={id} />
        ))}
      </div>

      <div className="content">
        <p>
          Run graphics intensive workflows with a responsiveness that keeps up
          with your imagination. The M4 family of Chips features a GPU with a
          second-generation hardware-accelerated ray tracing that renders images
          faster, so
          <span className="text-white">gaming feels more immersive and realistic than ever.</span> And
          Dynamic Coaching optimizes fast on-chip memory to dramatically
          increase average GPU utilization - driving a huge performance boost
          for the most demanding pro apps and games.
        </p>
      </div>
    </section>
  );
};

export default Performance;
