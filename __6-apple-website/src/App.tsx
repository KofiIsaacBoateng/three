import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import Product from "./components/Product";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Showcase from "./components/Showcase";

gsap.registerPlugin(ScrollTrigger, SplitText);
const App = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <Product />
      <Showcase />
    </>
  );
};

export default App;
