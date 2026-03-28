# ZGDisZhengguidong Blog

This is the rebuilt main site using **Astro + MDX**.

The original Hexo site is archived in `legacy-hexo/`, and published under `/legacy-hexo/`.

## Structure

```text
src/
  content/posts/          # MDX posts
  layouts/MainLayout.astro
  pages/
    index.astro
    blog/index.astro
    blog/[slug].astro
    about.astro
    legacy.astro
  styles/site.css
legacy-hexo/              # full legacy Hexo content
scripts/sync-legacy.mjs   # copies legacy site to static/legacy-hexo before build
```

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Add a new post

Create a file in `src/content/posts/`:

```mdx
---
title: "Post title"
description: "Short summary"
publishDate: 2026-03-28
tags: ["llm", "agent"]
category: "agent-systems"
featured: false
draft: false
---

Post content...
```

## Legacy links

- Entry page: `/legacy/`
- Archived site: `/legacy-hexo/`

## Maintenance notes

- Publish all new content in MDX only.
- Keep Hexo as historical archive.
- Run `npm run build` locally before pushing.
