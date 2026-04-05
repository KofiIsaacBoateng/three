import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import Product from "./components/Product";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Showcase from "./components/Showcase";
import Performance from "./components/Performance";
import Features from "./components/Features";
import Highlights from "./components/Highlights";
import Footer from "./components/Footer";

gsap.registerPlugin(ScrollTrigger, SplitText);
const App = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <Product />
      <Showcase />
      <Performance />
      <Features />
      <Highlights />
      <Footer />
    </>
  );
};

export default App;
