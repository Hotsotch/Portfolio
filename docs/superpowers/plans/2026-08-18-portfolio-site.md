# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page, statically exported portfolio site for an electrical engineering student, in a Swiss/grotesk editorial style, with all copy held in one typed placeholder file.

**Architecture:** Next.js App Router with `output: 'export'` — one route, no server, no data fetching. Every word lives in `src/content/site.ts`; every style token lives in a Tailwind v4 `@theme` block in `src/app/globals.css`. Components import content from the first and classes from the second, so copy and design can each be rewritten without touching the other.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, Inter via `next/font/google`, ESLint with `jsx-a11y`.

## Global Constraints

- Project root is `C:\Users\hotso\THE DIRECTORY\2. PROJECTS\6. Portfolio`. The path contains spaces and the parent folder starts with a digit — quote all paths in shell commands.
- **Do not run `create-next-app`.** It derives the npm package name from the folder name (`6. Portfolio`), which is an invalid npm name, and it prompts interactively. Scaffold by writing files directly.
- **No git.** No repository, no commits, no `.git` directory. Skip every commit step you would normally run.
- **No unit test framework.** Verification is `tsc --noEmit`, `next build`, `eslint`, and manual viewport inspection. Do not install Jest, Vitest, or Playwright.
- Static export only: `output: 'export'` and `images.unoptimized: true` must stay set.
- All user-facing copy is placeholder text in bracketed caps, e.g. `[YOUR UNIVERSITY]`. Never invent biographical facts, school names, project results, or URLs.
- Design direction is Swiss/grotesk: sans-serif only, left-aligned grid, hairline rules, generous whitespace, light background. No serif faces anywhere.

---

### Task 1: Project scaffold and static export config

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Create: `eslint.config.mjs`
- Create: `.gitignore`
- Create: `next-env.d.ts`

**Interfaces:**
- Consumes: nothing
- Produces: a buildable Next.js project. Later tasks rely on the `@/*` path alias resolving to `src/*`, and on the npm scripts `dev`, `build`, `lint`, and `typecheck`.

- [ ] **Step 1: Write `package.json`**

```json
{
  "name": "portfolio",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "next": "^15.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3.2.0",
    "@tailwindcss/postcss": "^4.0.0",
    "@types/node": "^22.10.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "eslint": "^9.17.0",
    "eslint-config-next": "^15.1.0",
    "eslint-plugin-jsx-a11y": "^6.10.2",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.7.0"
  }
}
```

- [ ] **Step 2: Write `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Write `next.config.ts`**

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
```

`trailingSlash` makes the exported `out/` directory work correctly on static hosts that serve `about/index.html` rather than `about.html`.

- [ ] **Step 4: Write `postcss.config.mjs`**

```js
const config = {
  plugins: ["@tailwindcss/postcss"],
};

export default config;
```

- [ ] **Step 5: Write `eslint.config.mjs`**

```js
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "plugin:jsx-a11y/recommended"),
  { ignores: ["node_modules/**", ".next/**", "out/**"] },
];

export default eslintConfig;
```

- [ ] **Step 6: Write `.gitignore`**

No repository exists, but a stray `node_modules` upload is worth guarding against if one is created later.

```
node_modules/
.next/
out/
*.tsbuildinfo
next-env.d.ts
.DS_Store
```

- [ ] **Step 7: Write `next-env.d.ts`**

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />
```

- [ ] **Step 8: Install dependencies**

Run from the project root:

```bash
npm install
```

Expected: completes without `ERESOLVE` errors. `node_modules/` and `package-lock.json` appear.

If npm complains about the package name, confirm `package.json` says `"name": "portfolio"` and not the folder name.

- [ ] **Step 9: Verify the toolchain runs**

```bash
npx tsc --noEmit
```

Expected: exits 0 with no output. There are no source files yet, so this only proves the compiler and config parse.

---

### Task 2: Design tokens and root layout

**Files:**
- Create: `src/app/globals.css`
- Create: `src/app/layout.tsx`

**Interfaces:**
- Consumes: the `@/*` alias from Task 1.
- Produces: the token names every later task styles against — colors `paper`, `ink`, `muted`, `rule`, `accent`; type sizes `display`, `title`, `heading`, `body`, `label`; the `--content-width` variable; and the utility classes `.rule`, `.section`, `.reveal`. Also exports the root `metadata` object that Task 8 extends.

- [ ] **Step 1: Write `src/app/globals.css`**

This file is the design surface. Every value a person would want to change lives in the `@theme` block.

```css
@import "tailwindcss";

@theme {
  /* Color — light, paper-like, one accent */
  --color-paper: #fbfbf9;
  --color-ink: #14141a;
  --color-muted: #74747e;
  --color-rule: #e2e2dd;
  --color-accent: #1d4ed8;

  /* Type — grotesk only, fluid scale */
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;

  --text-display: clamp(2.75rem, 11vw, 8.5rem);
  --text-display--line-height: 0.92;
  --text-display--letter-spacing: -0.04em;

  --text-title: clamp(1.75rem, 4vw, 3rem);
  --text-title--line-height: 1.05;
  --text-title--letter-spacing: -0.03em;

  --text-heading: clamp(1.125rem, 2vw, 1.5rem);
  --text-heading--line-height: 1.2;
  --text-heading--letter-spacing: -0.02em;

  --text-body: clamp(1rem, 1.2vw, 1.125rem);
  --text-body--line-height: 1.6;

  --text-label: 0.75rem;
  --text-label--line-height: 1.4;
  --text-label--letter-spacing: 0.12em;

  /* Layout */
  --content-width: 68rem;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-paper);
  color: var(--color-ink);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

/* Shared structural utilities */
.shell {
  width: 100%;
  max-width: var(--content-width);
  margin-inline: auto;
  padding-inline: 1.5rem;
}

.section {
  padding-block: clamp(4rem, 10vw, 8rem);
}

.rule {
  border-top: 1px solid var(--color-rule);
}

/* Scroll reveal — opt-in via the Reveal component */
.reveal {
  opacity: 0;
  transform: translateY(1rem);
  transition: opacity 700ms ease-out, transform 700ms ease-out;
}

.reveal[data-visible="true"] {
  opacity: 1;
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  .reveal,
  .reveal[data-visible="true"] {
    opacity: 1;
    transform: none;
    transition: none;
  }
}

/* Visible keyboard focus on a light background */
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
}
```

- [ ] **Step 2: Write `src/app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Portfolio site.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
```

The metadata here is deliberately literal rather than read from `site`, because
`src/content/site.ts` does not exist until Task 3 and importing it now would break
the dev server. Task 8 replaces this export with the content-driven version.

- [ ] **Step 3: Verify the CSS compiles**

Create a throwaway `src/app/page.tsx` so the build has a route:

```tsx
export default function Home() {
  return <main className="shell section">token check</main>;
}
```

Run:

```bash
npm run dev
```

Open `http://localhost:3000`. Expected: text renders in Inter on an off-white (`#fbfbf9`) background, not Times New Roman on white. If it renders serif, the font variable is not reaching `body` — check that `inter.variable` is on `<html>`.

Stop the dev server. Leave the throwaway `page.tsx` in place; Task 4 replaces it.

---

### Task 3: Content model

**Files:**
- Create: `src/content/site.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: the `site` object and the `Project` and `SkillGroup` types. Every component in Tasks 4–7 imports from here. Exact field names below are load-bearing — later tasks reference them directly.

- [ ] **Step 1: Write `src/content/site.ts`**

```ts
export type Project = {
  /** Stable id, used for anchor targets and expand/collapse state. */
  id: string;
  title: string;
  year: string;
  /** One line, shown collapsed. */
  summary: string;
  tools: string[];
  /** Paragraphs shown when expanded. */
  detail: string[];
  /** A concrete outcome — efficiency, latency, placement, size. */
  result: string;
  /** Optional external link, e.g. a repo. Omit if there is none. */
  href?: string;
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const site = {
  name: "[YOUR FULL NAME]",
  initials: "[XX]",
  role: "Electrical Engineering Student",

  /** One sentence. Appears in the hero and as the meta description. */
  tagline:
    "Electrical engineering student focused on [YOUR FOCUS AREA], seeking a [SEASON YEAR] internship.",

  about: [
    "[TWO OR THREE SENTENCES ABOUT WHO YOU ARE AND WHAT YOU BUILD. Lead with the concrete — the systems you have actually worked on — rather than adjectives about yourself.]",
    "[ONE SENTENCE ON WHAT YOU ARE LOOKING FOR. State the role type, the season, and the year.]",
  ],

  education: {
    school: "[YOUR UNIVERSITY]",
    degree: "[B.S. Electrical Engineering]",
    graduation: "[EXPECTED GRADUATION YEAR]",
    coursework: [
      "[RELEVANT COURSE 1]",
      "[RELEVANT COURSE 2]",
      "[RELEVANT COURSE 3]",
      "[RELEVANT COURSE 4]",
    ],
  },

  projects: [
    {
      id: "project-one",
      title: "[PROJECT ONE TITLE]",
      year: "[YEAR]",
      summary: "[ONE LINE — WHAT IT IS AND WHAT IT DOES]",
      tools: ["[TOOL]", "[TOOL]", "[TOOL]"],
      detail: [
        "[WHAT PROBLEM THIS SOLVED AND WHY IT MATTERED.]",
        "[WHAT YOU SPECIFICALLY DESIGNED, BUILT, OR MEASURED. Be concrete about your own contribution if this was a team project.]",
      ],
      result: "[A MEASURED OUTCOME — e.g. 92% peak efficiency at 12V input]",
    },
    {
      id: "project-two",
      title: "[PROJECT TWO TITLE]",
      year: "[YEAR]",
      summary: "[ONE LINE — WHAT IT IS AND WHAT IT DOES]",
      tools: ["[TOOL]", "[TOOL]", "[TOOL]"],
      detail: [
        "[WHAT PROBLEM THIS SOLVED AND WHY IT MATTERED.]",
        "[WHAT YOU SPECIFICALLY DESIGNED, BUILT, OR MEASURED.]",
      ],
      result: "[A MEASURED OUTCOME]",
    },
    {
      id: "project-three",
      title: "[PROJECT THREE TITLE]",
      year: "[YEAR]",
      summary: "[ONE LINE — WHAT IT IS AND WHAT IT DOES]",
      tools: ["[TOOL]", "[TOOL]"],
      detail: [
        "[WHAT PROBLEM THIS SOLVED AND WHY IT MATTERED.]",
        "[WHAT YOU SPECIFICALLY DESIGNED, BUILT, OR MEASURED.]",
      ],
      result: "[A MEASURED OUTCOME]",
    },
  ] satisfies Project[],

  skills: [
    { label: "Languages", items: ["[C]", "[Python]", "[VHDL]", "[MATLAB]"] },
    { label: "Hardware", items: ["[STM32]", "[FPGA]", "[PCB DESIGN]"] },
    { label: "Software", items: ["[KiCad]", "[LTspice]", "[Altium]", "[Git]"] },
    { label: "Lab", items: ["[OSCILLOSCOPE]", "[SPECTRUM ANALYZER]", "[SOLDERING]"] },
  ] satisfies SkillGroup[],

  contact: {
    email: "[YOU@EXAMPLE.COM]",
    github: "https://github.com/[YOUR-USERNAME]",
    linkedin: "https://linkedin.com/in/[YOUR-USERNAME]",
    cv: "/cv.pdf",
  },
} as const;
```

`satisfies` on the arrays gives type checking against `Project` and `SkillGroup` while preserving the literal types that `as const` provides — so a typo in a field name fails `npm run typecheck` rather than rendering blank.

- [ ] **Step 2: Verify types resolve**

```bash
npm run typecheck
```

Expected: exits 0.

To confirm the alias resolves before any component depends on it, temporarily add
`import { site } from "@/content/site";` to the throwaway `src/app/page.tsx`, run
`npm run typecheck` again, then remove the import. If it reports
`Cannot find module '@/content/site'`, the `@/*` alias in `tsconfig.json` is
wrong — it must map to `./src/*`.

---

### Task 4: Reveal wrapper, Nav, and Hero

**Files:**
- Create: `src/components/Reveal.tsx`
- Create: `src/components/Nav.tsx`
- Create: `src/components/Hero.tsx`
- Modify: `src/app/page.tsx` (replace the Task 2 throwaway)

**Interfaces:**
- Consumes: `site`, `navLinks` from `@/content/site`; the `.shell`, `.section`, `.rule`, `.reveal` classes from `globals.css`.
- Produces: `<Reveal>{children}</Reveal>` — a client component taking an optional `delay?: number` in milliseconds. Tasks 5–7 wrap their sections in it. Also produces `<Nav />` and `<Hero />`, both taking no props.

- [ ] **Step 1: Write `src/components/Reveal.tsx`**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  /** Milliseconds to stagger this element behind its siblings. */
  delay?: number;
};

export default function Reveal({ children, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="reveal"
      data-visible={visible}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
```

The reduced-motion case is handled entirely in CSS (Task 2), so this component needs no media query. The element still starts at `opacity: 0` for one frame before the observer fires; that is imperceptible and avoids a flash of fully-styled content.

- [ ] **Step 2: Write `src/components/Nav.tsx`**

```tsx
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
      <div className="rule" />
    </header>
  );
}
```

All four nav links plus CV stay visible on small screens because the labels are short. No hamburger menu is needed — adding one would be five items of machinery for five items of content.

- [ ] **Step 3: Write `src/components/Hero.tsx`**

```tsx
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
```

- [ ] **Step 4: Replace `src/app/page.tsx`**

```tsx
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
      </main>
    </>
  );
}
```

- [ ] **Step 5: Verify**

```bash
npm run dev
```

Open `http://localhost:3000`. Expected:
- The placeholder name renders at display size, tightly tracked, left-aligned.
- Hero elements fade up in sequence on load.
- The nav sticks to the top when scrolling and its background stays legible.
- Clicking "Selected work" does nothing yet — `#work` does not exist until Task 6. That is expected.

Then:

```bash
npm run typecheck
```

Expected: exits 0.

---

### Task 5: About and Skills

**Files:**
- Create: `src/components/About.tsx`
- Create: `src/components/Skills.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `site.about`, `site.education`, `site.skills`; `<Reveal>` from Task 4.
- Produces: `<About />` and `<Skills />`, both taking no props, rendering `<section id="about">` and `<section id="skills">` — the anchor targets `Nav` already links to.

- [ ] **Step 1: Write `src/components/About.tsx`**

```tsx
import Reveal from "@/components/Reveal";
import { site } from "@/content/site";

export default function About() {
  return (
    <section id="about" className="shell section rule">
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
```

- [ ] **Step 2: Write `src/components/Skills.tsx`**

```tsx
import Reveal from "@/components/Reveal";
import { site } from "@/content/site";

export default function Skills() {
  return (
    <section id="skills" className="shell section rule">
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
```

- [ ] **Step 3: Modify `src/app/page.tsx`**

```tsx
import About from "@/components/About";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
      </main>
    </>
  );
}
```

- [ ] **Step 4: Verify**

```bash
npm run dev
```

Expected:
- About renders as a two-column grid on desktop, stacking below 768px.
- Skills renders four columns on large screens, two on tablet, one on mobile.
- Hairline rules separate the sections.
- Nav links "About" and "Skills" scroll to the right places.

```bash
npm run typecheck && npm run lint
```

Expected: both exit 0.

---

### Task 6: Work section with expandable project rows

**Files:**
- Create: `src/components/Work.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `site.projects` and the `Project` type; `<Reveal>` from Task 4.
- Produces: `<Work />`, taking no props, rendering `<section id="work">`. This is the only component in the project holding interactive state.

- [ ] **Step 1: Write `src/components/Work.tsx`**

```tsx
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
                        {isOpen ? "\u2212" : "+"}
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
```

Three accessibility details that are easy to get wrong and worth stating explicitly:

- The project title is a real `<h3>` wrapping the `<button>`, so the heading stays in the document outline for screen-reader navigation while the whole row remains clickable.
- `aria-expanded` and `aria-controls` announce the collapsed state. Without them this reads as an unlabeled button.
- `hidden` — not `display: none` via a class — keeps collapsed content out of the accessibility tree and out of keyboard tab order.

Only one project is open at a time. That keeps the page scannable, which is the whole point of the section.

- [ ] **Step 2: Modify `src/app/page.tsx`**

```tsx
import About from "@/components/About";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Skills from "@/components/Skills";
import Work from "@/components/Work";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Work />
        <Skills />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Verify interaction**

```bash
npm run dev
```

Expected:
- Three project rows, each a ruled line with title left and year plus `+` right.
- Clicking a row expands it; the marker becomes `−`.
- Clicking a second row collapses the first.
- Tab reaches each row button; Enter and Space toggle it.
- With a row collapsed, Tab skips over the hidden detail entirely.

```bash
npm run typecheck && npm run lint
```

Expected: both exit 0.

---

### Task 7: Contact and footer

**Files:**
- Create: `src/components/Contact.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `site.contact`, `site.name`; `<Reveal>` from Task 4.
- Produces: `<Contact />`, taking no props, rendering `<section id="contact">` and the page footer.

- [ ] **Step 1: Write `src/components/Contact.tsx`**

```tsx
import Reveal from "@/components/Reveal";
import { site } from "@/content/site";

const links = [
  { label: "GitHub", href: site.contact.github, external: true },
  { label: "LinkedIn", href: site.contact.linkedin, external: true },
  { label: "Download CV", href: site.contact.cv, external: true },
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
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="text-label uppercase tracking-[0.12em] text-muted transition-colors hover:text-ink"
              >
                {link.label} &nearr;
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
```

`new Date().getFullYear()` runs at build time in a server component, so the exported HTML carries a fixed year. Rebuilding updates it; there is no hydration mismatch because the value never differs between server and client in a static export.

- [ ] **Step 2: Modify `src/app/page.tsx`**

```tsx
import About from "@/components/About";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Skills from "@/components/Skills";
import Work from "@/components/Work";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Work />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Verify**

```bash
npm run dev
```

Expected: clicking the email address opens a mail client draft. "Back to top" returns to the hero. All five nav links resolve to real sections.

---

### Task 8: 404 page, metadata, CV placeholder, and final verification

**Files:**
- Create: `src/app/not-found.tsx`
- Create: `public/cv.pdf`
- Modify: `src/app/layout.tsx`
- Create: `README.md`

**Interfaces:**
- Consumes: `site` from Task 3; the token classes from Task 2.
- Produces: the finished, buildable site.

- [ ] **Step 1: Write `src/app/not-found.tsx`**

```tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="shell section flex min-h-screen flex-col justify-center">
      <p className="text-label uppercase tracking-[0.12em] text-muted">
        Error 404
      </p>
      <h1 className="text-display mt-6 font-medium">Not found</h1>
      <p className="text-body mt-8 max-w-md text-muted">
        That page does not exist.
      </p>
      <Link
        href="/"
        className="text-label mt-12 uppercase tracking-[0.12em] text-accent hover:text-ink"
      >
        &larr; Back home
      </Link>
    </main>
  );
}
```

- [ ] **Step 2: Add Open Graph metadata to `src/app/layout.tsx`**

Replace the existing `metadata` export with:

```tsx
export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
  description: site.tagline,
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
  },
};
```

No `metadataBase` or image is set, because the deployment URL is not known yet and a broken absolute image URL is worse than none. Add both once the site has a domain.

- [ ] **Step 3: Create the placeholder CV**

The CV link must not 404 before a real file is dropped in. Write a minimal valid PDF:

```bash
cd "C:/Users/hotso/THE DIRECTORY/2. PROJECTS/6. Portfolio" && mkdir -p public && printf '%%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 612 792]/Resources<</Font<</F1 4 0 R>>>>/Contents 5 0 R>>endobj\n4 0 obj<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>endobj\n5 0 obj<</Length 62>>stream\nBT /F1 18 Tf 72 700 Td (Placeholder - replace with your CV.) Tj ET\nendstream\nendobj\ntrailer<</Root 1 0 R>>\n' > public/cv.pdf
```

Expected: `public/cv.pdf` opens in a PDF viewer and shows one line of text.

- [ ] **Step 4: Write `README.md`**

```markdown
# Portfolio

Static portfolio site. Next.js App Router, exported to plain HTML.

## Editing content

All copy lives in `src/content/site.ts`. Replace every `[BRACKETED]` placeholder.
Nothing else needs to change to publish real content.

Replace `public/cv.pdf` with your actual resume, keeping the filename.

## Editing design

All design tokens live in the `@theme` block at the top of `src/app/globals.css` —
colors, type scale, spacing, content width. Changing `--color-accent` restyles
every accent on the site.

## Commands

    npm run dev        # local server at http://localhost:3000
    npm run typecheck  # type errors
    npm run lint       # lint and accessibility checks
    npm run build      # static export to out/

## Deploying

`npm run build` writes a self-contained `out/` directory. Upload it to any static
host, or point Vercel or Netlify at the project and let it run the build.
```

- [ ] **Step 5: Full verification pass**

Run all three in order:

```bash
npm run typecheck
npm run lint
npm run build
```

Expected: all exit 0. `build` reports the `/` route as static and writes `out/index.html`, `out/404.html`, and `out/_next/`.

If build fails with an error about `output: export` and dynamic APIs, a component is using a server-only dynamic feature — check that no component calls `headers()`, `cookies()`, or `searchParams`.

- [ ] **Step 6: Manual viewport check**

```bash
npm run dev
```

At each of 375px, 768px, and 1440px browser widths, confirm:
- No horizontal scrollbar.
- The hero name does not overflow or clip at any width.
- The Work rows keep title and year on one line, wrapping only the title.
- Skills columns reflow 4 → 2 → 1.
- Nav stays readable over content when scrolled.

- [ ] **Step 7: Keyboard and motion check**

- Tab from the top of the page: focus order is nav links, CV, hero link, then each section in order. Every focused element shows a visible blue outline.
- In OS display settings, enable "reduce motion", reload: content appears immediately with no fade or slide, and anchor links jump rather than smooth-scroll.

---

## Notes for whoever picks this up

The site is deliberately small. Six components, one content file, one stylesheet.
If a change feels like it needs a seventh component or a state library, check
whether it belongs in `site.ts` or `globals.css` first — most changes do.

The one real dependency left open: the layout is tuned against placeholder copy
of roughly the length in `site.ts`. When real content arrives, expect one pass of
spacing adjustment, especially around the hero and the About grid.
