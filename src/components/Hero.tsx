import Reveal from "@/components/Reveal";
import Typewriter from "@/components/Typewriter";
import { site } from "@/content/site";

export default function Hero() {
  return (
    <section id="top" className="shell section">
      <Reveal>
        <p className="text-label uppercase tracking-[0.12em] text-muted">
          <Typewriter phrases={site.heroRotatingRoles} />
        </p>
      </Reveal>

      <Reveal delay={80}>
        <h1 className="text-display mt-6 font-medium">{site.name}</h1>
      </Reveal>

      <Reveal delay={240}>
        <a
          href="#work"
          className="text-label mt-16 inline-flex items-center gap-2 uppercase tracking-[0.12em] text-ink transition-colors hover:text-accent"
        >
          Projects
          <span aria-hidden="true">&darr;</span>
        </a>
      </Reveal>
    </section>
  );
}
