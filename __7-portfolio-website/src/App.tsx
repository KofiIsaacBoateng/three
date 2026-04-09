import gsap from "gsap";
import Hero from "./sections/Hero";
import Showcase from "./sections/Showcase";
import { ScrollTrigger, SplitText } from "gsap/all";
import NavBar from "./components/NavBar";
import LogoDisplay from "./components/LogoDisplay";
import FeatureCards from "./sections/FeatureCards";
import Experience from "./sections/Experience";

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
    </>
  );
};

export default App;
