import Reveal from "@/components/Reveal";
import { site } from "@/content/site";

export default function Hero() {
  return (
    <section id="top" className="shell section">
      <Reveal>
        <p className="text-label uppercase tracking-[0.12em] text-muted">
          {site.role}
        </p>
      </Reveal>

      <Reveal delay={80}>
        <h1 className="text-display mt-6 font-medium">{site.name}</h1>
      </Reveal>

      <Reveal delay={160}>
        <p className="text-title mt-10 max-w-3xl text-balance font-normal text-muted">
          {site.tagline}
        </p>
      </Reveal>

      <Reveal delay={240}>
        <a
          href="#work"
          className="text-label mt-16 inline-flex items-center gap-2 uppercase tracking-[0.12em] text-ink transition-colors hover:text-accent"
        >
          Selected work
          <span aria-hidden="true">&darr;</span>
        </a>
      </Reveal>
    </section>
  );
}
