import PictureFrame from "@/components/PictureFrame";
import { navLinks, site } from "@/content/site";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-paper/85 backdrop-blur-sm">
      <nav
        aria-label="Primary"
        className="shell flex items-center justify-between py-5"
      >
        <a
          href="#top"
          className="text-label font-medium uppercase tracking-[0.12em] text-ink"
        >
          {site.initials}
        </a>

        <ul className="flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-label uppercase tracking-[0.12em] text-muted transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={site.contact.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="text-label uppercase tracking-[0.12em] text-accent transition-colors hover:text-ink"
            >
              CV
            </a>
          </li>
        </ul>
      </nav>

      <div className="pointer-events-none relative hidden 2xl:block">
        <div className="absolute right-32 top-full z-40">
          <PictureFrame />
        </div>
      </div>

      <div className="rule" />
    </header>
  );
}
