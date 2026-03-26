# Website Maintenance Notes

This repository is now the Astro + MDX source for the site.

## Fast update routine

1. Write a new post in `src/content/posts/`.
2. Update homepage featured links if needed in `src/data/site.ts`.
3. Replace `public/assets/resume/zheng-guidong-resume.pdf` when your resume changes.
4. Run the legacy sync step and Astro build.
5. Push to GitHub so Pages redeploys.

## Core directories

- `src/pages/`: site pages
- `src/content/posts/`: new MDX posts
- `src/layouts/`: shared layouts
- `public/`: static assets
- `scripts/sync-legacy.mjs`: copies legacy HTML posts and assets into the served output
- `.github/workflows/deploy.yml`: GitHub Pages deployment workflow

## Keep the site fresh

- Update the homepage summary every quarter.
- Keep at least one recent MDX post in the featured or latest section.
- Refresh the resume PDF when your experience changes.
- Keep old legacy posts available until you intentionally migrate them.
