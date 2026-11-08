import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Work from "@/components/sections/Work";
import Stack from "@/components/sections/Stack";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Hero />
      <About />
      <Work />
      <Stack />
      <Experience />
      <Contact />
    </>
  );
}
