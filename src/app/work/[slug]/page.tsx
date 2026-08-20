import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import ExpandableImage from "@/components/ExpandableImage";
import { site } from "@/content/site";
import { getTechIcon } from "@/content/techIcons";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return site.projects.map((project) => ({ slug: project.id }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = site.projects.find((p) => p.id === slug);
  if (!project) return {};

  return {
    title: `${project.title} — ${site.name}`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = site.projects.find((p) => p.id === slug);
  if (!project) notFound();

  return (
    <>
      <Nav />
      <main>
        <section className="shell section">
          <Link
            href="/#work"
            className="text-label uppercase tracking-[0.12em] text-accent hover:text-ink"
          >
            &larr; Projects
          </Link>

          <div className="flex flex-col items-center text-center">
            <p className="text-label mt-10 uppercase tracking-[0.12em] text-muted">
              {project.year}
            </p>
            <h1 className="text-display mt-4 font-medium">{project.title}</h1>
            {project.award ? (
              <p
                className={`text-label mt-4 inline-block rounded-full border px-3 py-1 uppercase tracking-[0.12em] ${
                  project.awardColor === "blue"
                    ? "border-badge-blue text-badge-blue"
                    : "border-accent text-accent"
                }`}
              >
                {project.award}
              </p>
            ) : null}
            <p className="text-[clamp(1.5rem,3.4vw,2.5rem)] mt-8 max-w-5xl text-balance font-normal leading-[1.05] tracking-[-0.03em] text-muted">
              {project.summary}
            </p>

            <div
              className="mt-12 aspect-square w-full max-w-xl"
              style={{
                backgroundImage: project.image
                  ? `url(${project.image})`
                  : "linear-gradient(160deg, #7c9b8e, #b5c9bd)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </div>

          <div className="mt-16 grid gap-12 md:grid-cols-[2fr_1fr]">
            <div className="space-y-6">
              {project.detail.map((paragraph, i) => (
                <p key={i} className="text-body max-w-2xl text-ink">
                  {paragraph}
                </p>
              ))}

              {project.process ? (
                <div className="space-y-3 pt-4">
                  <p className="text-label uppercase tracking-[0.12em] text-muted">
                    Process
                  </p>
                  {project.process.map((step, i) => (
                    <p key={i} className="text-sm max-w-2xl text-muted">
                      {step}
                    </p>
                  ))}
                </div>
              ) : null}

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

              {project.gallery ? (
                <div className="grid grid-cols-2 gap-4 pt-4">
                  {project.gallery.slice(0, 2).map((src, i) => (
                    <div
                      key={i}
                      className="aspect-square w-full"
                      style={{
                        backgroundImage: `url(${src})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  ))}
                  {project.gallery[2] ? (
                    <div
                      className="col-span-2 aspect-[2/1] w-full"
                      style={{
                        backgroundImage: `url(${project.gallery[2]})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  ) : null}
                </div>
              ) : null}
            </div>

            <div>
              <dl className="space-y-6">
                {project.tools ? (
                  <div>
                    <dt className="text-label uppercase tracking-[0.12em] text-muted">
                      Tools
                    </dt>
                    <dd className="text-body mt-2 text-ink">
                      {project.tools.join(", ")}
                    </dd>
                  </div>
                ) : null}
                {project.links ? (
                  <div>
                    <dt className="text-label uppercase tracking-[0.12em] text-muted">
                      Links
                    </dt>
                    <dd className="mt-2 space-y-1">
                      {project.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-body block text-accent hover:text-ink"
                        >
                          {link.label}
                        </a>
                      ))}
                    </dd>
                  </div>
                ) : null}
                {project.hardware ? (
                  <div>
                    <dt className="text-label uppercase tracking-[0.12em] text-muted">
                      Hardware
                    </dt>
                    <dd className="text-body mt-2 text-ink">
                      {project.hardware.join(", ")}
                    </dd>
                  </div>
                ) : null}
                <div>
                  <dt className="text-label uppercase tracking-[0.12em] text-muted">
                    Result
                  </dt>
                  {Array.isArray(project.result) ? (
                    <dd className="text-body mt-2 text-ink">
                      <ul className="list-disc space-y-1 pl-5">
                        {project.result.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </dd>
                  ) : (
                    <dd className="text-body mt-2 text-ink">{project.result}</dd>
                  )}
                </div>
              </dl>

              {project.gallery ? null : project.secondaryImage ? (
                <div className="mt-8">
                  <ExpandableImage
                    src={project.secondaryImage}
                    alt={`${project.title} hardware diagram`}
                    caption="Image was AI generated"
                  />
                </div>
              ) : (
                <div
                  className="mt-8 aspect-square w-full"
                  style={{
                    background: "linear-gradient(160deg, #7c9b8e, #b5c9bd)",
                  }}
                />
              )}
            </div>
          </div>
        </section>

        {project.stack ? (
          <section className="shell section rule text-center">
            <p className="text-label uppercase tracking-[0.12em] text-muted">
              Tech stack
            </p>
            <ul className="mt-8 flex flex-wrap justify-center gap-8">
              {project.stack.map((item) => (
                <li key={item} className="flex flex-col items-center gap-3">
                  <span className="flex h-14 w-14 items-center justify-center rounded-sm border border-rule">
                    {/* eslint-disable-next-line @next/next/no-img-element -- static export, images.unoptimized */}
                    <img
                      src={getTechIcon(item)}
                      alt=""
                      className="h-7 w-7"
                    />
                  </span>
                  <span className="text-label text-center uppercase tracking-[0.12em] text-muted">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </main>
    </>
  );
}
