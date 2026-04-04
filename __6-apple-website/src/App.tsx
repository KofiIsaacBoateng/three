import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import Product from "./components/Product";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);
const App = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <Product />
    </>
  );
};

export default App;
