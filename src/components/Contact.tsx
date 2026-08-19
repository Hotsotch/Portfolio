import Reveal from "@/components/Reveal";
import { site } from "@/content/site";

const links = [
  { label: "GitHub", href: site.contact.github },
  { label: "LinkedIn", href: site.contact.linkedin },
  { label: "Download CV", href: site.contact.cv },
];

export default function Contact() {
  return (
    <section id="contact" className="shell section rule">
      <Reveal>
        <h2 className="text-label uppercase tracking-[0.12em] text-muted">
          Contact
        </h2>
      </Reveal>

      <Reveal delay={80}>
        <a
          href={`mailto:${site.contact.email}`}
          className="text-title mt-8 inline-block font-medium text-ink underline decoration-rule decoration-1 underline-offset-8 transition-colors hover:text-accent hover:decoration-accent"
        >
          {site.contact.email}
        </a>
      </Reveal>

      <Reveal delay={160}>
        <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-label uppercase tracking-[0.12em] text-muted transition-colors hover:text-ink"
              >
                {link.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </Reveal>

      <footer className="text-label mt-24 flex flex-wrap justify-between gap-4 text-muted">
        <span>
          &copy; {new Date().getFullYear()} {site.name}
        </span>
        <a href="#top" className="uppercase tracking-[0.12em] hover:text-ink">
          Back to top &uarr;
        </a>
      </footer>
    </section>
  );
}
