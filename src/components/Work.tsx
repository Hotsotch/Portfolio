"use client";

import { useState } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { site } from "@/content/site";

export default function Work() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const hoveredProject = site.projects.find((p) => p.id === hoveredId);

  return (
    <section id="work" className="shell section">
      <Reveal>
        <h2 className="text-label uppercase tracking-[0.12em] text-muted">
          Projects
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-8 md:grid-cols-[2fr_1fr] md:items-start">
        <ul>
          {site.projects.map((project, i) => (
            <Reveal key={project.id} delay={i * 60}>
              <li className="rule">
                <Link
                  href={`/work/${project.id}/`}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onFocus={() => setHoveredId(project.id)}
                  onBlur={() => setHoveredId(null)}
                  className="group flex w-full items-baseline justify-between gap-6 py-8"
                >
                  <span className="text-title font-medium text-ink transition-colors group-hover:text-accent">
                    {project.title}
                  </span>
                  <span className="text-label shrink-0 uppercase tracking-[0.12em] text-muted transition-colors group-hover:text-accent">
                    {project.year}
                    <span aria-hidden="true" className="ml-4 inline-block">
                      &rarr;
                    </span>
                  </span>
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>

        <div className="sticky top-28 hidden aspect-square overflow-hidden rounded-sm md:block">
          {hoveredProject ? (
            <div
              key={hoveredProject.id}
              className="h-full w-full"
              style={{
                backgroundImage: hoveredProject.image
                  ? `url(${hoveredProject.image})`
                  : "linear-gradient(160deg, #7c9b8e, #b5c9bd)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
