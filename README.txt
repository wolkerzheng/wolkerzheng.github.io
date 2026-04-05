Wolker Lab 站点维护说明
========================

1. 站点定位
-----------

这是一个纯静态中文博客站，直接托管在 `wolkerzheng.github.io` 仓库默认分支。

当前站点特点：
- 首页是科技风展示页，同时包含博客列表
- 文章页支持评论区占位
- 支持基础 SEO 元信息
- 支持统计脚本和评论脚本的统一配置

2. 目录结构
-----------

- `index.html`
  站点首页，包含 Hero、文章列表、分类、站点方向等内容
- `posts/*.html`
  具体文章页面。每篇文章一个独立 html 文件，负责文章 SEO、侧边栏、评论区和 Markdown 挂载点
- `content/posts/*.md`
  文章正文内容。以后发布新文章，正文主要写在这里
- `styles/site.css`
  全站样式
- `scripts/site.js`
  全站前端逻辑，负责渲染首页博客列表、注入统计脚本和初始化评论区
- `data/site-config.js`
  站点统一配置，主要放网站标题和域名、评论系统配置、统计系统配置
- `data/posts.js`
  首页博客列表数据源。新增文章时要在这里补一条记录
- `robots.txt`
  搜索引擎抓取规则
- `sitemap.xml`
  站点页面地图

3. 新增博客放在哪里
-------------------

每新增一篇文章，做这 2 步：

第 1 步：在 `content/posts/` 下新增一个 Markdown 文件。

例如：
- `content/posts/agent-memory-design.md`
- `content/posts/multi-agent-runtime.md`

第 2 步：在 `posts/` 目录下新增一个对应的 html 文章页。

例如：
- `posts/agent-memory-design.html`
- `posts/multi-agent-runtime.html`

建议文件名全部使用英文或英文连字符，便于 URL 稳定。

第 3 步：在 `data/posts.js` 里新增一条文章数据。

示例：

```js
{
  title: "Agent 记忆系统设计：从上下文到长期记忆",
  slug: "agent-memory-design",
  date: "2026-04-08",
  categories: ["AI", "智能体"],
  summary: "讨论智能体系统中的短期记忆、长期记忆、检索策略与成本控制。",
  featured: false
}
```

这里的 `slug` 要和文章文件名对应：
- `slug: "agent-memory-design"`
- Markdown 路径：`content/posts/agent-memory-design.md`
- 文件路径：`posts/agent-memory-design.html`

4. 图文系列怎么发布
-------------------

推荐用“一个系列一个主题，多篇文章拆开发布”的方式，而不是把所有内容塞进一篇超长文章。

建议做法：
- 系列名称放在文章标题前缀里
  例如：
  - `智能体工程 01：为什么 Harness Engineering 重要`
  - `智能体工程 02：Agent 记忆系统设计`
  - `智能体工程 03：工具调用与失败恢复`
- 图片统一放到 `assets/` 目录
  例如：
  - `assets/series/agent-engineering/cover-01.jpg`
  - `assets/series/agent-engineering/memory-arch.png`
- 在 Markdown 正文里直接用 `![]()` 引用图片

示例：

```md
![Agent 记忆架构图](../assets/series/agent-engineering/memory-arch.png)
```

一个系列建议保持统一：
- 标题命名规则一致
- 封面风格一致
- 分类保持一致
- 发布时间连续

如果你之后想做“系列页”，可以再单独加一个：
- `series/agent-engineering.html`

5. 评论怎么配置
---------------

站点已经预留了 Giscus 评论接入逻辑，配置文件在：
- `data/site-config.js`

你只需要把 `comments.enabled` 改为 `true`，并补齐下面字段：
- `repo`
- `repoId`
- `category`
- `categoryId`

示例：

```js
comments: {
  enabled: true,
  provider: "giscus",
  repo: "wolkerzheng/wolkerzheng.github.io",
  repoId: "你的 repoId",
  category: "General",
  categoryId: "你的 categoryId",
  mapping: "pathname"
}
```

如果没填完整，页面会显示一个“评论未启用”的说明卡片，而不会报错。

6. 统计怎么配置
---------------

统计配置也在：
- `data/site-config.js`

当前支持 `Google Analytics gtag` 方式。

把下面字段填上即可：

```js
analytics: {
  enabled: true,
  provider: "gtag",
  measurementId: "G-XXXXXXXXXX"
}
```

如果没填 `measurementId`，统计脚本不会加载。

7. SEO 在哪里改
---------------

SEO 目前分两层：
- 全站基础配置：`data/site-config.js`
  放站点名、描述、域名、社交卡片图等
- 单篇文章页面 head：每个 `posts/*.html`
  放文章自己的 `title`、`description`、`canonical`、`og:title`、`og:description`

如果以后文章越来越多，建议再升级成模板化生成。

8. 发布流程
-----------

本地修改完成后：

```bash
git add -A
git commit -m "Add new blog post"
git push origin master
```

推送完成后，GitHub Pages 会自动更新。

9. 推荐发文流程
---------------

每次发文建议按这个顺序：
1. 在 `content/posts/` 新建正文 Markdown
2. 在 `posts/` 新建对应文章页
3. 在 `data/posts.js` 新增列表记录
4. 如果文章用了配图，把图放到 `assets/` 对应目录
5. 检查文章里的标题、摘要、分类、日期
6. 推送到 GitHub

10. 后续可继续扩展
------------------

如果后面要继续升级，这个站点下一步很适合补这些能力：
- 文章分页
- 标签页
- 系列专题页
- 封面图自动化
- RSS
- 站内搜索
- 暗色/浅色主题切换
