import gsap from "gsap";
import Hero from "./sections/Hero";
import Showcase from "./sections/Showcase";
import { ScrollTrigger, SplitText } from "gsap/all";
import NavBar from "./components/NavBar";
import LogoDisplay from "./components/LogoDisplay";
import FeatureCards from "./sections/FeatureCards";
import Experience from "./sections/Experience";
import TechStack from "./sections/TechStack";
import Testimonials from "./sections/Testimonials";

gsap.registerPlugin(ScrollTrigger, SplitText);
const App = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <Showcase />
      <LogoDisplay />
      <FeatureCards />
      <Experience />
      <TechStack />
      <Testimonials />
    </>
  );
};

export default App;
