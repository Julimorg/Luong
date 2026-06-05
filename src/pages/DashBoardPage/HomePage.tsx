import About from "../../components/About";
import Contact from "../../components/Contract";
import Projects from "../../components/Project";
import Hero from "./Components/Hero";
import Services from "./Components/Services";
import StatsBar from "./Components/StatsBar";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <Services />
      <About />
      <Projects />
      <Contact />
    </>
  );
}