import Hero from "@/components/sections/Hero";
import BrandTicker from "@/components/sections/BrandTicker";
import Products from "@/components/sections/Products";
import Doctors from "@/components/sections/Doctors";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <BrandTicker />
      <Products />
      <Doctors />
      <About />
      <Contact />
    </>
  );
}
