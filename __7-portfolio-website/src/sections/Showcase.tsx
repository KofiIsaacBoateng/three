import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Showcase = () => {
  useGSAP(() => {
    gsap.fromTo(
      [".first-project-wrapper", ".project-2"],
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power1.inOut",
        stagger: 0.25,
        scrollTrigger: {
          trigger: ".first-project-wrapper",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    );

    gsap.fromTo(
      ".project-3",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: ".project-3",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    );
  });

  return (
    <div id="work" className="app-showcase">
      <div className="w-full">
        <div className="showcaselayout">
          {/**** LEFT */}
          <div className="first-project-wrapper">
            <div className="image-wrapper">
              <img src="/images/project1.png" alt="Ryd" />
            </div>
            <div className="text-content">
              <h2>
                On-Demand Rides made Simple with a Powerful, User-Friendly App
                called Ryde
              </h2>
              <p className="text-white-50 md:text-xl">
                An app built with React Native, Expo, and TailwindCss for a
                fast, User-friendly experience.
              </p>
            </div>
          </div>

          {/**** RIGHT */}
          <div className="project-list-wrapper overflow-hidden">
            <div className="projec project-2">
              <div className="image-wrapper bg-[#ffefdb]">
                <img
                  src="/images/project2.png"
                  alt="Library Management Platform"
                />
              </div>
              <h2>Library Management Platform.</h2>
            </div>

            <div className="project project-3">
              <div className="image-wrapper bg-[#ffe7eb]">
                <img src="/images/project3.png" alt="YC Directory" />
              </div>
              <h2>YC Directory - A Startup Showcase App</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Showcase;
