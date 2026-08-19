# Portfolio Website — Design Spec

**Date:** 2026-08-18
**Status:** Approved

## Purpose

A personal portfolio site for an electrical engineering student seeking internship
and co-op positions.

The primary audience is recruiters at engineering firms and hardware companies.
They skim for roughly thirty seconds, looking for skills, projects, and a resume.
Every design decision below serves scannability and a fast path to the CV.

## Constraints

- No project photography or schematics are available. The design must carry itself
  on typography alone.
- Real content is not ready. The site ships with placeholder copy that the owner
  fills in later without touching layout or styling.
- The owner wants ongoing design control. Styling must be centralized and easy to
  change by hand.

## Design direction

Swiss/grotesk editorial. No serifs. Large, tight-tracked sans display type on a
strict left-aligned grid, with hairline rules, generous margins, and a light
background.

This keeps the airiness of editorial layout while reading as precision rather than
art direction — appropriate when a hardware recruiter is the reader.

## Architecture

Next.js with the App Router, TypeScript, and Tailwind v4, configured for static
export (`output: 'export'`).

One route (`/`). No server, no database, no API calls. The build emits plain
HTML, CSS, and JS that deploys to Vercel or GitHub Pages at no cost.

A portfolio has no dynamic data. Static export means no cold starts, no runtime
cost, and no class of production failure that cannot be reproduced locally.

## Content and presentation are separate

This is the structural decision that makes placeholder-now, content-later work.

**`src/content/site.ts`** holds every word on the site in one typed object: name,
bio, education, project list, skills, links. Placeholders appear as obvious
bracketed strings such as `[YOUR UNIVERSITY]`. Filling in real content means
editing this file and nothing else.

**`src/app/globals.css`** holds one `@theme` block of CSS custom properties: the
color ramp, type scale, spacing rhythm, and maximum content width. Changing
`--color-accent` shifts the entire site. This is the owner's design surface.

Components read content from the first file and styling from the second. Neither
file references the other, so copy can be rewritten without touching design and
the design can be replaced without touching copy.

## Components

Six components under `src/components/`, one file each, one responsibility each.

| Component | Responsibility |
|---|---|
| `Nav` | Top bar: initials at left, section anchors and CV link at right |
| `Hero` | Name at display scale, one-sentence positioning line, scroll cue |
| `About` | Short bio paragraph and education block |
| `Work` | Project list as ruled rows — title, tools, year — with expandable detail |
| `Skills` | Grouped columns: Languages, Hardware, Software, Lab |
| `Contact` | Email, GitHub, LinkedIn, CV download |

`Work` owns the only real interaction, the expand/collapse of project detail. The
other five are presentational.

Sections are semantic HTML elements carrying `id` attributes, so navigation
anchors resolve natively without a router or a scroll library.

## Behavior and edge cases

- **Contact is a `mailto:` link, not a form.** A form requires a backend, spam
  handling, and a deliverability story. Recruiters copy the address regardless.
- **CV download** points at `/public/cv.pdf`. A placeholder PDF ships with the
  repository so the link never 404s before the real file is added.
- **External links** carry `rel="noopener noreferrer"`.
- **`prefers-reduced-motion`** disables scroll-reveal transitions.
- **Responsive layout** uses `clamp()` for the type scale so display sizes shrink
  continuously rather than at breakpoints. Layout collapses to a single column
  below 768px.
- **404 page** rendered in the same type system.
- **Metadata**: title, description, and Open Graph tags, so a link pasted into
  LinkedIn or an email renders as a proper card.

## Verification

Unit tests are not appropriate here. The site has no business logic to assert
against, and tests written anyway would assert that markup matches itself.

What actually catches breakage:

- `tsc --noEmit` — the typed content file turns a malformed project entry into a
  compile error rather than a runtime surprise
- `next build` — catches broken imports and code incompatible with static export
- `eslint` with `jsx-a11y` — catches missing alt text, broken heading order, and
  unlabeled links
- Manual inspection at 375px, 768px, and 1440px before deploying

If `Work` gains interaction beyond expand/collapse, that logic earns a test.

## Out of scope

Blog, CMS, dark-mode toggle, animation library, analytics, and contact form.

Each is straightforward to add on this foundation later. Each is also a thing that
can break between now and the first recruiter visit.

## Open items

The owner supplies these when filling in `src/content/site.ts`:

- Display name, university, expected graduation year
- EE specialization (embedded, power, RF, controls, signals, VLSI)
- Per project: name, one-line description, tools, and a concrete result
- GitHub URL, LinkedIn URL, public email address
- The real CV PDF, to replace the placeholder at `public/cv.pdf`
