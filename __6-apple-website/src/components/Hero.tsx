import { useEffect, useRef } from "react";

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 2;
  }, []);

  return (
    <section id="hero">
      <div>
        <h1 className="title">MacBook Pro</h1>
        <img src="/title.png" alt="MacBook Title" />

        <video
          src="/videos/hero.mp4"
          muted
          autoPlay
          playsInline
          ref={videoRef}
        />
      </div>

      <button>Buy</button>

      <p>Buy for $1599 or $133/month for 12months</p>
    </section>
  );
};

export default Hero;
