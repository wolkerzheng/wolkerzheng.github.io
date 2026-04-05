(function () {
  const config = window.WOLKER_SITE_CONFIG || {};
  const posts = window.WOLKER_POSTS || [];

  function renderHomePosts() {
    const mount = document.querySelector("[data-post-list]");
    if (!mount) return;

    mount.innerHTML = posts
      .map((post) => {
        const tags = (post.categories || [])
          .map((item) => `<span class="tag">${item}</span>`)
          .join("");

        const featured = post.featured ? `<span class="tag muted">Featured</span>` : "";

        return `
          <article class="post-card">
            <div class="featured-meta">
              ${tags}
              <span class="tag muted">${post.date}</span>
              ${featured}
            </div>
            <h3>${post.title}</h3>
            <p>${post.summary}</p>
            <a class="text-link" href="posts/${post.slug}.html">阅读全文</a>
          </article>
        `;
      })
      .join("");
  }

  function injectAnalytics() {
    const analytics = config.analytics || {};
    if (!analytics.enabled || analytics.provider !== "gtag" || !analytics.measurementId) return;

    const remote = document.createElement("script");
    remote.async = true;
    remote.src = `https://www.googletagmanager.com/gtag/js?id=${analytics.measurementId}`;
    document.head.appendChild(remote);

    const inline = document.createElement("script");
    inline.textContent = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${analytics.measurementId}');
    `;
    document.head.appendChild(inline);
  }

  function renderCommentsFallback(container) {
    container.innerHTML = `
      <div class="comment-placeholder">
        <strong>评论区未启用</strong>
        <p>请到 <code>data/site-config.js</code> 中填写 Giscus 配置后开启评论。</p>
      </div>
    `;
  }

  function renderComments() {
    const container = document.querySelector("[data-comments]");
    if (!container) return;

    const comments = config.comments || {};
    if (
      !comments.enabled ||
      comments.provider !== "giscus" ||
      !comments.repo ||
      !comments.repoId ||
      !comments.category ||
      !comments.categoryId
    ) {
      renderCommentsFallback(container);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", comments.repo);
    script.setAttribute("data-repo-id", comments.repoId);
    script.setAttribute("data-category", comments.category);
    script.setAttribute("data-category-id", comments.categoryId);
    script.setAttribute("data-mapping", comments.mapping || "pathname");
    script.setAttribute("data-strict", comments.strict || "0");
    script.setAttribute("data-reactions-enabled", comments.reactionsEnabled || "1");
    script.setAttribute("data-emit-metadata", comments.emitMetadata || "0");
    script.setAttribute("data-input-position", comments.inputPosition || "top");
    script.setAttribute("data-theme", comments.theme || "dark_dimmed");
    script.setAttribute("data-lang", comments.lang || "zh-CN");
    container.appendChild(script);
  }

  injectAnalytics();
  renderHomePosts();
  renderComments();
})();
