import Hero from "@/components/sections/Hero";
import Products from "@/components/sections/Products";
import Doctors from "@/components/sections/Doctors";
import About from "@/components/sections/About";
import Tech from "@/components/sections/Tech";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Products />
      <Doctors />
      <About />
      <Tech />
      <Contact />
    </>
  );
}
