(function () {
  const fallbackImages = [
    "imgs/3286ee5d55afb83683bec59b27cb7a43.jpg",
    "imgs/94da5fae34abc07b5785019f0e66f4b7.jpg",
    "imgs/c4dd2c50fe2fcbdc540be159852b134a.jpg"
  ].map((src, index) => ({
    src,
    caption: `甜心合照 ${String(index + 1).padStart(2, "0")}`
  }));

  const sweetTalks = [
    "你一出现，我的日常就自动切到高甜模式。",
    "别人拍照是留念，我们拍照像在给未来存证据。",
    "你一笑，我这边的宇宙都开始补光。",
    "如果心动有界面，那你就是我这里一直置顶的主屏。",
    "我不是突然变温柔了，是看见你之后系统自动降噪了。",
    "你靠近一点，连空气都像被调成了奶油滤镜。",
    "别人说明天见是客套，我说明天见是提前开始期待。",
    "你站我旁边的时候，连普通日子都像被悄悄升级。 ",
    "恋爱这件事本来很抽象，直到你把它变成了合照。",
    "我的理想型没有标准答案，但每次都能被你满分命中。 "
  ];

  const coldJokes = [
    "为什么星星不敢偷看我们？因为怕被当成电灯泡。",
    "我把笑点放冰箱两小时再端上来，这样才叫冷笑话。 ",
    "为什么 Wi-Fi 一到你身边就满格？因为空气里都是连接成功。",
    "月亮想兼职做浪漫顾问，看见你以后决定直接转正。",
    "我问冰箱什么叫爱情，它说你们合照让我压缩机都脸红。",
    "程序员为什么恋爱后更稳定？因为终于找到不想回滚的人了。",
    "如果我今天讲得不够冷，那一定是因为你把天气都笑热了。",
    "你知道照片为什么越看越顺眼吗？因为镜头也有审美。 ",
    "我本来想讲个更冷的，结果看到你们合照，笑点先融化了。",
    "连闹钟都想晚点响，可能它也想多看你们一会儿。 "
  ];

  const orbitPhrases = [
    "甜度稳定超标",
    "心动信号已锁定",
    "合照缓存成功",
    "请持续撒糖",
    "今日份喜欢已加载",
    "浪漫频段连接中",
    "笑点低温待命",
    "恋爱像素清晰",
    "光影偏爱你们",
    "镜头正在心动"
  ];

  const page = document.querySelector(".love-main");
  if (!page) return;

  const config = window.WOLKER_SITE_CONFIG || {};
  const galleryConfig = config.loveGallery || {};
  const repo = galleryConfig.repo || (config.comments && config.comments.repo) || "";
  const branch = galleryConfig.branch || "master";
  const folder = galleryConfig.folder || "imgs";
  const autoplayDelay = Number(galleryConfig.autoplayDelayMs) || 4600;

  const elements = {
    image: document.querySelector("[data-love-image]"),
    frameLabel: document.querySelector("[data-love-frame-label]"),
    caption: document.querySelector("[data-love-caption]"),
    counter: document.querySelector("[data-love-counter]"),
    progress: document.querySelector("[data-love-progress]"),
    sweetMain: document.querySelector("[data-love-sweet-main]"),
    sweetSideA: document.querySelector("[data-love-sweet-side-a]"),
    sweetSideB: document.querySelector("[data-love-sweet-side-b]"),
    jokeMain: document.querySelector("[data-love-joke-main]"),
    jokeSideA: document.querySelector("[data-love-joke-side-a]"),
    jokeSideB: document.querySelector("[data-love-joke-side-b]"),
    orbitChips: Array.from(document.querySelectorAll("[data-love-chip]")),
    prev: document.querySelector("[data-love-prev]"),
    next: document.querySelector("[data-love-next]"),
    stage: document.querySelector("[data-love-stage]")
  };

  const state = {
    images: fallbackImages.slice(),
    currentIndex: 0,
    autoplayId: 0,
    textId: 0,
    switchId: 0,
    textTick: 0,
    usingFallback: true
  };

  function pick(list, offset) {
    return list[offset % list.length];
  }

  function setText(node, value) {
    if (node) {
      node.textContent = value;
    }
  }

  function buildCaption(index) {
    return `甜心合照 ${String(index + 1).padStart(2, "0")}`;
  }

  function normalizeRemoteImage(item, index) {
    const src = item.path || item.download_url || `${folder}/${item.name}`;
    return {
      src,
      caption: buildCaption(index)
    };
  }

  async function loadRemoteImages() {
    if (!repo) {
      throw new Error("Missing repository configuration");
    }

    const apiUrl = `https://api.github.com/repos/${repo}/contents/${folder}?ref=${branch}`;
    const response = await fetch(apiUrl, {
      headers: {
        Accept: "application/vnd.github+json"
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub API returned ${response.status}`);
    }

    const items = await response.json();
    if (!Array.isArray(items)) {
      throw new Error("Unexpected GitHub API payload");
    }

    const remoteImages = items
      .filter((item) => item.type === "file" && /\.(avif|gif|jpe?g|png|webp)$/i.test(item.name))
      .sort((a, b) => a.name.localeCompare(b.name, "zh-CN"))
      .map(normalizeRemoteImage);

    if (!remoteImages.length) {
      throw new Error("No images found in remote folder");
    }

    return remoteImages;
  }

  function renderProgress() {
    if (!elements.progress) return;

    elements.progress.innerHTML = state.images
      .map((_, index) => {
        const isActive = index === state.currentIndex ? "is-active" : "";
        const label = String(index + 1).padStart(2, "0");
        return `<button class="${isActive}" type="button" data-love-index="${index}" aria-label="切换到第 ${index + 1} 张">${label}</button>`;
      })
      .join("");
  }

  function refreshTexts() {
    const base = state.textTick;

    setText(elements.sweetMain, pick(sweetTalks, base));
    setText(elements.sweetSideA, pick(sweetTalks, base + 1));
    setText(elements.sweetSideB, pick(sweetTalks, base + 2));
    setText(elements.jokeMain, pick(coldJokes, base));
    setText(elements.jokeSideA, pick(coldJokes, base + 1));
    setText(elements.jokeSideB, pick(coldJokes, base + 2));

    elements.orbitChips.forEach((chip, index) => {
      chip.textContent = pick(orbitPhrases, base + index);
    });

    state.textTick += 1;
  }

  function updateStatusText() {
    const count = state.images.length;
    const prefix = state.usingFallback ? "已载入本地兜底合照" : "已发现甜心合照";
    setText(elements.counter, `${prefix} ${count} 张`);
  }

  function setImageSource(nextImage) {
    if (!elements.image) return;

    window.clearTimeout(state.switchId);
    elements.image.classList.add("is-switching");

    state.switchId = window.setTimeout(() => {
      elements.image.src = nextImage.src;
      elements.image.alt = nextImage.caption;
      elements.image.classList.remove("is-switching");
    }, 170);
  }

  function renderImage(index, options) {
    if (!state.images.length) return;

    const shouldRefreshTexts = !options || options.refreshTexts !== false;
    state.currentIndex = (index + state.images.length) % state.images.length;
    const currentImage = state.images[state.currentIndex];

    setImageSource(currentImage);
    setText(
      elements.frameLabel,
      `${String(state.currentIndex + 1).padStart(2, "0")} / ${String(state.images.length).padStart(2, "0")}`
    );
    setText(elements.caption, currentImage.caption);

    renderProgress();
    updateStatusText();

    if (shouldRefreshTexts) {
      refreshTexts();
    }
  }

  function stepImage(delta) {
    renderImage(state.currentIndex + delta);
  }

  function stopAutoplay() {
    window.clearInterval(state.autoplayId);
    state.autoplayId = 0;
  }

  function startAutoplay() {
    stopAutoplay();
    state.autoplayId = window.setInterval(() => {
      stepImage(1);
    }, autoplayDelay);
  }

  function bindEvents() {
    if (elements.prev) {
      elements.prev.addEventListener("click", () => {
        stepImage(-1);
        startAutoplay();
      });
    }

    if (elements.next) {
      elements.next.addEventListener("click", () => {
        stepImage(1);
        startAutoplay();
      });
    }

    if (elements.progress) {
      elements.progress.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof HTMLButtonElement)) return;

        const nextIndex = Number(target.getAttribute("data-love-index"));
        if (Number.isNaN(nextIndex)) return;

        renderImage(nextIndex);
        startAutoplay();
      });
    }

    if (elements.stage) {
      elements.stage.addEventListener("mouseenter", stopAutoplay);
      elements.stage.addEventListener("mouseleave", startAutoplay);
    }
  }

  async function initializeGallery() {
    refreshTexts();
    renderImage(0, { refreshTexts: false });
    bindEvents();
    startAutoplay();

    try {
      const remoteImages = await loadRemoteImages();
      state.images = remoteImages;
      state.usingFallback = false;
      renderImage(0, { refreshTexts: false });
      startAutoplay();
    } catch (error) {
      state.usingFallback = true;
      updateStatusText();
    }
  }

  initializeGallery();
})();
