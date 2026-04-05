import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const contentDir = path.join(root, "content", "posts");
const postsDir = path.join(root, "posts");
const sitemapPath = path.join(root, "sitemap.xml");
const postsJsPath = path.join(root, "data", "posts.js");
const siteUrl = "https://wolkerzheng.github.io";

function parseFrontmatter(fileContent) {
  if (!fileContent.startsWith("---")) throw new Error("Markdown file is missing frontmatter block.");
  const end = fileContent.indexOf("\n---", 3);
  if (end === -1) throw new Error("Frontmatter block is not closed.");

  const rawFrontmatter = fileContent.slice(3, end).trim();
  const meta = {};

  for (const line of rawFrontmatter.split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    meta[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
  }

  return meta;
}

function parseList(value = "") {
  return value.split(",").map((item) => item.trim()).filter(Boolean);
}

function escHtml(value = "") {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildPostHtml(post) {
  const tagsHtml = post.categories.map((category) => `          <span class="tag">${escHtml(category)}</span>`).join("\n");
  const keywordHtml = post.sidebarKeywords.map((item) => `            <li>${escHtml(item)}</li>`).join("\n");

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escHtml(post.seoTitle || post.title)} | Wolker Lab</title>
  <meta name="description" content="${escHtml(post.description)}">
  <meta name="keywords" content="${escHtml(post.seoKeywords.join(", "))}">
  <meta name="author" content="Wolker Lab">
  <meta name="robots" content="index,follow">
  <link rel="canonical" href="${siteUrl}/posts/${post.slug}.html">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${escHtml(post.title)}">
  <meta property="og:description" content="${escHtml(post.description)}">
  <meta property="og:url" content="${siteUrl}/posts/${post.slug}.html">
  <meta property="og:site_name" content="Wolker Lab">
  <meta property="og:image" content="${siteUrl}/assets/og-cover.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escHtml(post.seoTitle || post.title)} | Wolker Lab">
  <meta name="twitter:description" content="${escHtml(post.description)}">
  <meta name="twitter:image" content="${siteUrl}/assets/og-cover.jpg">
  <script type="application/ld+json">
    ${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      datePublished: post.date,
      dateModified: post.date,
      author: { "@type": "Organization", name: "Wolker Lab" },
      publisher: { "@type": "Organization", name: "Wolker Lab" },
      mainEntityOfPage: `${siteUrl}/posts/${post.slug}.html`,
      inLanguage: "zh-CN",
      description: post.description
    }, null, 4)}
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Noto+Sans+SC:wght@400;500;700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../styles/site.css">
</head>
<body>
  <div class="page-shell article-shell">
    <header class="topbar">
      <a class="brand" href="${siteUrl}/">
        <span class="brand-mark"></span>
        <span class="brand-text">
          <strong>Wolker Lab</strong>
          <small>AI Native Blog</small>
        </span>
      </a>
      <nav class="topnav">
        <a href="${siteUrl}/">首页</a>
        <a href="#article-body">正文</a>
        <a href="#comments">评论</a>
      </nav>
    </header>

    <main class="article-layout">
      <article class="article-card markdown-article" id="article-body" data-markdown="../content/posts/${post.slug}.md">
        <div class="article-meta">
${tagsHtml}
          <span class="tag muted">${escHtml(post.date)}</span>
        </div>
        <p class="eyebrow">${escHtml(post.eyebrow)}</p>
        <div data-markdown-content></div>

        <section class="comments-section" id="comments">
          <div class="section-heading">
            <p class="eyebrow">Comments</p>
            <h2>评论</h2>
          </div>
          <div data-comments></div>
        </section>

        <footer class="article-footer">
          <a class="button button-primary" href="${siteUrl}/">返回首页</a>
        </footer>
      </article>

      <aside class="article-sidebar">
        <div class="sidebar-card">
          <span class="sidebar-label">分类</span>
          <strong>${escHtml(post.sidebarTitle)}</strong>
          <p>${escHtml(post.sidebarDescription)}</p>
        </div>
        <div class="sidebar-card">
          <span class="sidebar-label">关键词</span>
          <ul class="keyword-list">
${keywordHtml}
          </ul>
        </div>
      </aside>
    </main>
  </div>
  <script src="../data/site-config.js"></script>
  <script src="../data/posts.js"></script>
  <script src="../scripts/site.js"></script>
</body>
</html>
`;
}

const markdownFiles = fs.readdirSync(contentDir).filter((file) => file.endsWith(".md"));
const posts = markdownFiles.map((file) => {
  const raw = fs.readFileSync(path.join(contentDir, file), "utf8");
  const meta = parseFrontmatter(raw);
  return {
    title: meta.title,
    slug: meta.slug || path.basename(file, ".md"),
    date: meta.date,
    categories: parseList(meta.categories),
    summary: meta.summary,
    featured: meta.featured === "true",
    eyebrow: meta.eyebrow || "Article",
    seoTitle: meta.seo_title || meta.title,
    description: meta.description || meta.summary,
    seoKeywords: parseList(meta.seo_keywords || meta.categories || ""),
    sidebarTitle: meta.sidebar_title || parseList(meta.categories).join(" / "),
    sidebarDescription: meta.sidebar_description || meta.summary,
    sidebarKeywords: parseList(meta.sidebar_keywords || meta.seo_keywords || "")
  };
}).sort((a, b) => b.date.localeCompare(a.date));

for (const post of posts) {
  fs.writeFileSync(path.join(postsDir, `${post.slug}.html`), buildPostHtml(post), "utf8");
}

fs.writeFileSync(postsJsPath, `window.WOLKER_POSTS = ${JSON.stringify(posts.map(({ title, slug, date, categories, summary, featured }) => ({ title, slug, date, categories, summary, featured })), null, 2)};\n`, "utf8");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
  </url>
${posts.map((post) => `  <url>\n    <loc>${siteUrl}/posts/${post.slug}.html</loc>\n  </url>`).join("\n")}
</urlset>
`;
fs.writeFileSync(sitemapPath, sitemap, "utf8");

console.log(`Generated ${posts.length} post pages.`);
