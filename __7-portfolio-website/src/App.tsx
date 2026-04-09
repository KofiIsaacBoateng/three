import gsap from "gsap";
import Hero from "./sections/Hero";
import Showcase from "./sections/Showcase";
import { ScrollTrigger, SplitText } from "gsap/all";
import NavBar from "./components/NavBar";

gsap.registerPlugin(ScrollTrigger, SplitText);
const App = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <Showcase />
    </>
  );
};

export default App;
