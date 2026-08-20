import Reveal from "@/components/Reveal";
import { site } from "@/content/site";

export default function Skills() {
  return (
    <section id="skills" className="shell section">
      <Reveal>
        <h2 className="text-label uppercase tracking-[0.12em] text-muted">
          Skills
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {site.skills.map((group, i) => (
          <Reveal key={group.label} delay={i * 60}>
            <div>
              <h3 className="text-heading font-medium text-ink">
                {group.label}
              </h3>
              <ul className="mt-4 space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="text-body text-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
