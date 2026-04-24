(function () {
  const sweetTalks = [
    "你一出现，我的日常就自动切到高甜模式。",
    "别人拍照是留念，我们拍照像在给未来存证据。",
    "你一笑，我这边的宇宙都开始补光。",
    "如果心动有界面，那你就是我这里一直置顶的主屏。",
    "我不是突然变温柔了，是看见你之后系统自动降噪了。",
    "你靠近一点，连空气都像被调成了奶油滤镜。",
    "别人说明天见是客套，我说明天见是提前开始期待。",
    "你站我旁边的时候，连普通日子都像被悄悄升级。",
    "恋爱这件事本来很抽象，直到你把它变成了合照。",
    "我的理想型没有标准答案，但每次都能被你满分命中。"
  ];

  const coldJokes = [
    "为什么星星不敢偷看我们？因为怕被当成电灯泡。",
    "我把笑点放冰箱两小时再端上来，这样才叫冷笑话。",
    "为什么 Wi-Fi 一到你身边就满格？因为空气里都是连接成功。",
    "月亮想兼职做浪漫顾问，看见你以后决定直接转正。",
    "我问冰箱什么叫爱情，它说你们合照让我压缩机都脸红。",
    "程序员为什么恋爱后更稳定？因为终于找到不想回滚的人了。",
    "如果我今天讲得不够冷，那一定是因为你把天气都笑热了。",
    "你知道照片为什么越看越顺眼吗？因为镜头也有审美。",
    "我本来想讲个更冷的，结果看到你们合照，笑点先融化了。",
    "连闹钟都想晚点响，可能它也想多看你们一会儿。"
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
  const autoplayDelay = Number(galleryConfig.autoplayDelayMs) || 4600;
  const manifestPath = galleryConfig.manifestPath || "data/love-gallery.json";

  const elements = {
    body: document.body,
    form: document.querySelector("[data-love-form]"),
    password: document.querySelector("[data-love-password]"),
    submit: document.querySelector("[data-love-submit]"),
    message: document.querySelector("[data-love-message]"),
    protected: document.querySelector("[data-love-protected]"),
    image: document.querySelector("[data-love-image]"),
    loading: document.querySelector("[data-love-loading]"),
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
    manifest: null,
    cryptoKey: null,
    currentIndex: 0,
    autoplayId: 0,
    switchId: 0,
    textTick: 0,
    imageUrlCache: new Map(),
    imageDataCache: new Map(),
    boundEvents: false
  };

  function pick(list, offset) {
    return list[offset % list.length];
  }

  function setText(node, value) {
    if (node) {
      node.textContent = value;
    }
  }

  function setMessage(text, type) {
    if (!elements.message) return;
    elements.message.textContent = text;
    elements.message.classList.remove("is-error", "is-success");
    if (type) {
      elements.message.classList.add(type);
    }
  }

  function bytesFromBase64(value) {
    const binary = window.atob(value);
    const bytes = new Uint8Array(binary.length);

    for (let index = 0; index < binary.length; index += 1) {
      bytes[index] = binary.charCodeAt(index);
    }

    return bytes;
  }

  async function deriveKey(password, saltBytes, iterations) {
    const encoder = new TextEncoder();
    const baseKey = await window.crypto.subtle.importKey(
      "raw",
      encoder.encode(password),
      "PBKDF2",
      false,
      ["deriveKey"]
    );

    return window.crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: saltBytes,
        iterations,
        hash: "SHA-256"
      },
      baseKey,
      {
        name: "AES-GCM",
        length: 256
      },
      false,
      ["decrypt"]
    );
  }

  async function decryptBytes(cryptoKey, ivBytes, payloadBytes) {
    const plainBuffer = await window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: ivBytes
      },
      cryptoKey,
      payloadBytes
    );

    return new Uint8Array(plainBuffer);
  }

  async function loadManifest() {
    if (state.manifest) return state.manifest;

    const response = await fetch(manifestPath, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Failed to load manifest: ${response.status}`);
    }

    state.manifest = await response.json();
    return state.manifest;
  }

  async function verifyPassword(password) {
    const manifest = await loadManifest();
    const saltBytes = bytesFromBase64(manifest.kdf.salt);
    const verifierIv = bytesFromBase64(manifest.verifier.iv);
    const verifierData = bytesFromBase64(manifest.verifier.data);
    const cryptoKey = await deriveKey(password, saltBytes, manifest.kdf.iterations);
    const verifierBytes = await decryptBytes(cryptoKey, verifierIv, verifierData);
    const verifierText = new TextDecoder().decode(verifierBytes);

    if (verifierText !== manifest.verifier.value) {
      throw new Error("Invalid password");
    }

    return cryptoKey;
  }

  function toggleLoading(isVisible) {
    if (!elements.loading) return;
    elements.loading.hidden = !isVisible;
  }

  async function getImageUrl(index) {
    if (state.imageUrlCache.has(index)) {
      return state.imageUrlCache.get(index);
    }

    const manifest = state.manifest;
    const item = manifest.files[index];
    const response = await fetch(item.path, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Failed to load encrypted image: ${response.status}`);
    }

    const encryptedBytes = new Uint8Array(await response.arrayBuffer());
    const plainBytes = await decryptBytes(
      state.cryptoKey,
      bytesFromBase64(item.iv),
      encryptedBytes
    );
    const objectUrl = URL.createObjectURL(new Blob([plainBytes], { type: item.type }));

    state.imageDataCache.set(index, plainBytes);
    state.imageUrlCache.set(index, objectUrl);
    return objectUrl;
  }

  function renderProgress() {
    if (!elements.progress || !state.manifest) return;

    elements.progress.innerHTML = state.manifest.files
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
    if (!state.manifest) return;
    setText(elements.counter, `已解锁 ${state.manifest.files.length} 张合照`);
  }

  async function renderImage(index, options) {
    if (!state.manifest || !state.manifest.files.length || !elements.image) return;

    const shouldRefreshTexts = !options || options.refreshTexts !== false;
    state.currentIndex = (index + state.manifest.files.length) % state.manifest.files.length;
    const currentImage = state.manifest.files[state.currentIndex];

    window.clearTimeout(state.switchId);
    elements.image.classList.add("is-switching");
    toggleLoading(true);

    try {
      const nextUrl = await getImageUrl(state.currentIndex);
      state.switchId = window.setTimeout(() => {
        elements.image.src = nextUrl;
        elements.image.alt = currentImage.caption;
        elements.image.classList.remove("is-switching");
      }, 170);

      setText(
        elements.frameLabel,
        `${String(state.currentIndex + 1).padStart(2, "0")} / ${String(state.manifest.files.length).padStart(2, "0")}`
      );
      setText(elements.caption, currentImage.caption);
      renderProgress();
      updateStatusText();

      if (shouldRefreshTexts) {
        refreshTexts();
      }
    } finally {
      toggleLoading(false);
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
    if (state.boundEvents) return;
    state.boundEvents = true;

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

    window.addEventListener("beforeunload", () => {
      state.imageUrlCache.forEach((url) => URL.revokeObjectURL(url));
    });
  }

  async function unlockGallery(password) {
    setMessage("正在解锁并解密相册...", null);
    elements.submit.disabled = true;

    try {
      state.cryptoKey = await verifyPassword(password);
      elements.body.classList.remove("love-is-locked");
      elements.protected.hidden = false;
      setMessage("已解锁。", "is-success");
      bindEvents();
      refreshTexts();
      await renderImage(0, { refreshTexts: false });
      startAutoplay();
    } catch (error) {
      setMessage("密码不对，或者加密资源还没有生成。", "is-error");
    } finally {
      elements.submit.disabled = false;
    }
  }

  function initForm() {
    if (!elements.form || !elements.password || !window.crypto || !window.crypto.subtle) {
      setMessage("当前浏览器不支持解密所需能力。", "is-error");
      return;
    }

    elements.form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const password = elements.password.value.trim();

      if (!password) {
        setMessage("先输入密码。", "is-error");
        return;
      }

      await unlockGallery(password);
    });
  }

  initForm();
})();
