import { useGSAP } from "@gsap/react";
import Button from "../components/Button";
import AnimatedCounter from "../components/Counter";
import HeroExperience from "../components/HeroModels/HeroExperience";
import { words } from "../constants";
import gsap from "gsap";

const Hero = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".hero-text h1",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.3, ease: "power1.inOUt" },
    );
  });

  return (
    <section id="hero" className="relative overflow-hidden">
      {/***** header */}
      <div className="absolute top-0 left-0 z-10">
        <img src="/images/bg.png" alt="Background" />
      </div>

      <div className="hero-layout">
        {/**** LEFT - HERO CONTENT */}
        <header className="flex flex-col z-10 justify-center xl:w-[40%] w-screen xl:px-20 px-5">
          <div className="flex flex-col gap-7">
            <div className="hero-text">
              <h1>
                Shaping
                <span className="slide">
                  <span className="wrapper">
                    {words.map((word, index) => (
                      <span
                        key={index}
                        className="flex items-center md:gap-3 gap-1 pb-2"
                      >
                        <img
                          src={word.imgPath}
                          alt={word.text}
                          className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rouded-full bg-white-50"
                        />
                        <span>{word.text}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </h1>
              <h1>into Real Projects</h1>
              <h1>that Deliver Results</h1>
            </div>
            <p className="text-white-50 md:text-xl relative z-10 pointer-events-none">
              Hi, I'm Kofi, a developer based in Ghana with a passion for code.
            </p>
            <Button
              className="md:w-80 md:h-16 w-60 h-12"
              id="button"
              text="See my work"
            />
          </div>
        </header>

        {/**** RIGHT - 3D MODEL */}
        <figure className="relative z-5 xl:w-[60%] w-screen xl:h-screen xl:mt-0 -mt-20">
          <div className="hero-3d-layout">
            {/* <HeroExperience /> */}
          </div>
        </figure>
      </div>

      <AnimatedCounter />
    </section>
  );
};

export default Hero;
