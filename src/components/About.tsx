import Reveal from "@/components/Reveal";
import { site } from "@/content/site";

export default function About() {
  return (
    <section id="about" className="shell section">
      <Reveal>
        <h2 className="text-label uppercase tracking-[0.12em] text-muted">
          About
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-12 md:grid-cols-[2fr_1fr]">
        <Reveal>
          <div className="space-y-6">
            {site.about.map((paragraph, i) => (
              <p key={i} className="text-body max-w-2xl text-ink">
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <dl className="space-y-6">
            <div>
              <dt className="text-label uppercase tracking-[0.12em] text-muted">
                Education
              </dt>
              <dd className="text-body mt-2 text-ink">
                {site.education.degree}
                <br />
                {site.education.school}
                <br />
                <span className="text-muted">
                  Expected {site.education.graduation}
                </span>
              </dd>
            </div>

            <div>
              <dt className="text-label uppercase tracking-[0.12em] text-muted">
                Coursework
              </dt>
              <dd className="text-body mt-2 text-ink">
                {site.education.coursework.join(", ")}
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
