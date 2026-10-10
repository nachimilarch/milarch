import JsonLd from "@/components/JsonLd";
import { pharmaSchema } from "@/lib/seo";
import Hero from "@/components/sections/Hero";
import Products from "@/components/sections/Products";
import Doctors from "@/components/sections/Doctors";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <JsonLd data={pharmaSchema()} />
      <Hero />
      <Products />
      <Doctors />
      <About />
      <Contact />
    </>
  );
}
