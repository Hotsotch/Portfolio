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
