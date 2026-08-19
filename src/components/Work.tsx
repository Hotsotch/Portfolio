"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import { site } from "@/content/site";

export default function Work() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="work" className="shell section rule">
      <Reveal>
        <h2 className="text-label uppercase tracking-[0.12em] text-muted">
          Selected work
        </h2>
      </Reveal>

      <ul className="mt-10">
        {site.projects.map((project, i) => {
          const isOpen = openId === project.id;
          const panelId = `${project.id}-panel`;

          return (
            <Reveal key={project.id} delay={i * 60}>
              <li className="rule">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenId(isOpen ? null : project.id)}
                    className="group flex w-full items-baseline justify-between gap-6 py-8 text-left"
                  >
                    <span className="text-title font-medium text-ink transition-colors group-hover:text-accent">
                      {project.title}
                    </span>
                    <span className="text-label shrink-0 uppercase tracking-[0.12em] text-muted">
                      {project.year}
                      <span aria-hidden="true" className="ml-4 inline-block">
                        {isOpen ? "−" : "+"}
                      </span>
                    </span>
                  </button>
                </h3>

                <div
                  id={panelId}
                  hidden={!isOpen}
                  className="grid gap-8 pb-10 md:grid-cols-[2fr_1fr]"
                >
                  <div className="space-y-4">
                    <p className="text-body font-medium text-ink">
                      {project.summary}
                    </p>
                    {project.detail.map((paragraph, j) => (
                      <p key={j} className="text-body max-w-2xl text-muted">
                        {paragraph}
                      </p>
                    ))}
                    {project.href ? (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-label inline-block uppercase tracking-[0.12em] text-accent hover:text-ink"
                      >
                        View repository &rarr;
                      </a>
                    ) : null}
                  </div>

                  <dl className="space-y-6">
                    <div>
                      <dt className="text-label uppercase tracking-[0.12em] text-muted">
                        Tools
                      </dt>
                      <dd className="text-body mt-2 text-ink">
                        {project.tools.join(", ")}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-label uppercase tracking-[0.12em] text-muted">
                        Result
                      </dt>
                      <dd className="text-body mt-2 text-ink">
                        {project.result}
                      </dd>
                    </div>
                  </dl>
                </div>
              </li>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
