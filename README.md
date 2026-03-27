# wolkerzheng.github.io

This repository now uses **Astro + MDX** as the source stack for the site.

## What changed

- The homepage, resume page, guide page, and new blog pages are now authored in Astro.
- New posts should be written in `src/content/posts/` as MDX files.
- Legacy static HTML posts from the old GitHub Pages site are preserved through `scripts/sync-legacy.mjs`.
- Resume files live in `public/assets/resume/`.

## Project structure

```text
.
├─ public/                  # static assets served as-is
├─ scripts/                 # helper scripts
├─ src/
│  ├─ content/posts/        # new MDX posts
│  ├─ data/                 # homepage and navigation data
│  ├─ layouts/              # shared Astro layouts
│  ├─ pages/                # routes
│  └─ styles/               # global styles
├─ 2016/ 2017/ archives/    # legacy exported site content used by sync script
└─ package.json
```

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

`npm run dev` and `npm run build` both trigger the legacy sync script first, so the old article routes remain available.

## GitHub Pages deployment

The repository now includes a Pages workflow:

`/.github/workflows/deploy.yml`

And a safety guard:

`/.github/workflows/pages-source-guard.yml`

After pushing to `main`, GitHub Actions will:

1. install dependencies
2. build the Astro site
3. deploy `dist/` to GitHub Pages

The guard workflow will fail early if your repo Pages source is not configured to `GitHub Actions`.

## How to add a new blog post

Create a file in `src/content/posts/`, for example:

```mdx
---
title: "Your Post Title"
description: "A short summary."
publishDate: 2026-03-25
tags: ["ai", "notes"]
category: "nlp"
---

Write your post here.
```

## Resume update

Replace:

`public/assets/resume/zheng-guidong-resume.pdf`

## Notes

- Legacy routes such as `/2017/...` and `/archives/` are kept for continuity.
- New content should move to the MDX workflow instead of editing generated HTML directly.
- The latest example post now includes `Attention Is All You Need 论文解读`.
