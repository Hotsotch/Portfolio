import About from "@/components/About";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Skills from "@/components/Skills";
import Work from "@/components/Work";
import WireDivider, { TRUNK_X } from "@/components/WireDivider";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 top-0 hidden w-[1.5px] bg-ink/20 sm:block"
          style={{ left: TRUNK_X }}
        />

        <Hero />
        <WireDivider color="#d92d20" component="resistor" componentPosition={22} />
        <About />
        <WireDivider color="#171717" component="switch" componentPosition={55} />
        <Work />
        <WireDivider color="#2563eb" component="capacitor" componentPosition={68} />
        <Skills />
        <WireDivider color="#eab308" />
        <Contact />
      </main>
    </>
  );
}
