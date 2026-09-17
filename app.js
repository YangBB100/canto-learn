(() => {
  "use strict";

  const course = window.CANTO_COURSE;
  const byId = (id) => document.getElementById(id);
  const readStored = (key) => {
    try {
      return localStorage.getItem(key);
    } catch (_) {
      return null;
    }
  };
  const writeStored = (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch (_) {
      // Private browsing or strict storage settings may disable persistence.
    }
  };
  const toneNames = Object.fromEntries((course.tones || []).map((tone) => [tone.tone, tone.name]));
  const toneCues = Object.fromEntries((course.tones || []).map((tone) => [tone.tone, tone.cue]));

  const escapeHtml = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const audioUrl = (key) => `audio/${encodeURIComponent(key)}.mp3`;
  const audioCache = new Map();
  let activeAudio = null;
  let activeElement = null;
  let lastTrigger = null;
  let currentRequest = null;
  let sequenceIndex = 0;
  let remainingRuns = 0;
  let playGeneration = 0;
  let playbackRate = Number(readStored("cantoPlaybackRate.v1")) || 1;
  let repeatCount = Number(readStored("cantoRepeatCount.v1")) || 1;

  const audioDock = byId("audioDock");
  const dockLabel = byId("dockLabel");
  const speedSelect = byId("speedSelect");
  const repeatControl = byId("repeatControl");
  const toast = byId("toast");

  speedSelect.value = String(playbackRate);
  repeatControl.querySelectorAll("button").forEach((button) => {
    const selected = Number(button.dataset.repeat) === repeatCount;
    button.classList.toggle("is-active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });

  function getAudio(key) {
    if (!audioCache.has(key)) {
      const audio = new Audio(audioUrl(key));
      audio.preload = "metadata";
      audio.addEventListener("ended", handleAudioEnded);
      audio.addEventListener("error", () => {
        if (audio === activeAudio && audio.cantoGeneration === playGeneration) {
          showToast(navigator.onLine ? "这段音频暂时无法加载，请稍后重试。" : "这段音频尚未离线缓存，请联网播放一次。");
        }
      });
      audioCache.set(key, audio);
    }
    return audioCache.get(key);
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove("is-visible"), 2800);
  }

  function clearPlayingState() {
    document.querySelectorAll(".is-playing").forEach((element) => element.classList.remove("is-playing"));
    activeElement = null;
  }

  function markPlaying(element) {
    clearPlayingState();
    if (element) {
      activeElement = element;
      element.classList.add("is-playing");
    }
  }

  function stopActiveAudio() {
    if (!activeAudio) return;
    activeAudio.pause();
    try {
      activeAudio.currentTime = 0;
    } catch (_) {
      // Some browsers reject currentTime changes while media metadata is unavailable.
    }
  }

  async function playCurrentKey() {
    if (!currentRequest) return;
    const generation = playGeneration;
    const key = currentRequest.keys[sequenceIndex];
    stopActiveAudio();
    activeAudio = getAudio(key);
    activeAudio.cantoGeneration = generation;
    activeAudio.playbackRate = playbackRate;
    try {
      activeAudio.currentTime = 0;
      await activeAudio.play();
    } catch (error) {
      if (generation !== playGeneration || error?.name === "AbortError") return;
      if (!navigator.onLine) {
        showToast("这段音频尚未离线缓存，请联网播放一次。");
      } else if (error?.name === "NotAllowedError") {
        showToast("浏览器阻止了播放，请再点一次播放键。");
      } else {
        showToast("这段音频暂时无法播放，请稍后重试。");
      }
      clearPlayingState();
    }
  }

  function beginPlayback(keys, label, sourceElement = null) {
    const cleanKeys = keys.filter(Boolean);
    if (!cleanKeys.length) return;
    playGeneration += 1;
    currentRequest = { keys: cleanKeys, label };
    sequenceIndex = 0;
    remainingRuns = repeatCount;
    dockLabel.textContent = label;
    audioDock.hidden = false;
    document.body.classList.add("audio-open");
    lastTrigger = sourceElement;
    markPlaying(sourceElement);
    playCurrentKey();
  }

  function handleAudioEnded() {
    if (!currentRequest || this !== activeAudio) return;
    if (sequenceIndex < currentRequest.keys.length - 1) {
      sequenceIndex += 1;
      playCurrentKey();
      return;
    }
    remainingRuns -= 1;
    if (remainingRuns > 0) {
      sequenceIndex = 0;
      playCurrentKey();
      return;
    }
    clearPlayingState();
  }

  function replayCurrent() {
    if (!currentRequest) return;
    playGeneration += 1;
    sequenceIndex = 0;
    remainingRuns = repeatCount;
    markPlaying(lastTrigger);
    playCurrentKey();
  }

  function closeDock() {
    const returnFocusTo = lastTrigger;
    playGeneration += 1;
    stopActiveAudio();
    currentRequest = null;
    audioDock.hidden = true;
    document.body.classList.remove("audio-open");
    clearPlayingState();
    if (returnFocusTo?.isConnected) returnFocusTo.focus({ preventScroll: true });
    lastTrigger = null;
  }

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-audio]");
    if (!trigger) return;
    beginPlayback([trigger.dataset.audio], trigger.dataset.label || trigger.textContent.trim(), trigger);
  });

  byId("dockReplay").addEventListener("click", replayCurrent);
  byId("dockClose").addEventListener("click", closeDock);

  speedSelect.addEventListener("change", () => {
    playbackRate = Number(speedSelect.value) || 1;
    writeStored("cantoPlaybackRate.v1", String(playbackRate));
    if (activeAudio) activeAudio.playbackRate = playbackRate;
  });

  repeatControl.addEventListener("click", (event) => {
    const button = event.target.closest("[data-repeat]");
    if (!button) return;
    repeatCount = Number(button.dataset.repeat) || 1;
    writeStored("cantoRepeatCount.v1", String(repeatCount));
    repeatControl.querySelectorAll("button").forEach((item) => {
      const selected = item === button;
      item.classList.toggle("is-active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
  });

  document.addEventListener("focusin", (event) => {
    if (audioDock.hidden || audioDock.contains(event.target) || !window.matchMedia("(max-width: 620px)").matches) return;
    const targetRect = event.target.getBoundingClientRect();
    const dockRect = audioDock.getBoundingClientRect();
    if (targetRect.bottom > dockRect.top - 12 || targetRect.top < 0) {
      event.target.scrollIntoView({ block: "center", behavior: "instant" });
    }
  });

  function contourSvg(contour) {
    const y = (level) => 57 - level * 10;
    return `
      <svg class="contour" viewBox="0 0 100 58" aria-hidden="true">
        <line x1="3" y1="7" x2="97" y2="7"></line>
        <line x1="3" y1="27" x2="97" y2="27"></line>
        <line x1="3" y1="47" x2="97" y2="47"></line>
        <path d="M 10 ${y(contour[0])} L 90 ${y(contour[1])}"></path>
      </svg>`;
  }

  function tokenButton(item, className = "token-button") {
    const label = `${item.char}，${item.contextualJyutping || item.jyutping}`;
    const jyutping = item.contextualJyutping || item.jyutping;
    const audio = item.charAudio || item.audio;
    const title = item.note ? ` title="${escapeHtml(item.note)}"` : "";
    return `
      <button class="${className}" type="button" data-audio="${escapeHtml(audio)}" data-label="${escapeHtml(label)}" aria-label="播放 ${escapeHtml(label)}"${title}>
        <ruby><span class="token-char">${escapeHtml(item.char)}</span><rt>${escapeHtml(jyutping)}</rt></ruby>
      </button>`;
  }

  function phraseButton(item, className = "phrase-chip") {
    return `
      <button class="${className}" type="button" data-audio="${escapeHtml(item.audio)}" data-label="${escapeHtml(item.text)}，${escapeHtml(item.jyutping)}" aria-label="播放 ${escapeHtml(item.text)}，${escapeHtml(item.jyutping)}">
        <span class="phrase-text">${escapeHtml(item.text)}</span>
        <span class="phrase-jyutping">${escapeHtml(item.jyutping)}</span>
        ${item.meaning ? `<span class="phrase-meaning">${escapeHtml(item.meaning)}</span>` : ""}
      </button>`;
  }

  function phraseCard(item, className = "phrase-chip") {
    const tokens = Array.isArray(item.tokens) && item.tokens.length > 1
      ? `<div class="phrase-token-row" aria-label="${escapeHtml(item.text)}逐字发音">${item.tokens.map((part) => tokenButton(part)).join("")}</div>`
      : "";
    const dark = className.includes("phrase-chip-dark") ? " phrase-card-dark" : "";
    return `<div class="phrase-card${dark}">${phraseButton(item, className)}${tokens}</div>`;
  }

  function lexicalButton(item) {
    const label = `${item.char}，${item.contextualJyutping}`;
    return `
      <button class="lexical-button" type="button" data-audio="${escapeHtml(item.charAudio)}" data-label="${escapeHtml(label)}" aria-label="播放 ${escapeHtml(label)}">
        <ruby><span>${escapeHtml(item.char)}</span><rt>${escapeHtml(item.contextualJyutping)}</rt></ruby>
        <small>${escapeHtml(item.meaning)}</small>
      </button>`;
  }

  function renderSentenceRow(item, compact = false, headingLevel = 4) {
    const headingTag = headingLevel === 3 ? "h3" : "h4";
    return `
      <article class="sentence-row${compact ? " sentence-row-compact" : ""}" data-sentence-id="${escapeHtml(item.id)}">
        <div class="sentence-copy">
          <${headingTag}>${escapeHtml(item.text)}</${headingTag}>
          <p>${escapeHtml(item.meaning)}</p>
          ${item.sourceOriginal ? `<p class="sentence-source"><strong>课堂原写：</strong>${escapeHtml(item.sourceOriginal)}</p>` : ""}
        </div>
        <button class="sentence-play" type="button" data-audio="${escapeHtml(item.sentenceAudio)}" data-label="整句：${escapeHtml(item.text)}" aria-label="播放整句 ${escapeHtml(item.text)}">
          <span aria-hidden="true">▶</span><span>整句</span>
        </button>
        <div class="sentence-tokens" aria-label="逐字发音">
          ${item.tokens.map((part) => tokenButton(part)).join("")}
        </div>
      </article>`;
  }

  function renderLessonTwo() {
    byId("pronounBuilder").innerHTML = course.pronouns.map((pair) => `
      <article class="pronoun-row">
        ${phraseCard(pair.singular)}
        <span class="builder-plus" aria-hidden="true">+ 哋 dei6 →</span>
        ${phraseCard(pair.plural)}
      </article>`).join("");

    const prefixes = course.demonstrativeParts.prefixes.map((item) => lexicalButton(item)).join("");
    const suffixes = course.demonstrativeParts.suffixes.map((item) => lexicalButton(item)).join("");
    byId("demonstrativeParts").innerHTML = `
      <div><p class="micro-label">先选范围</p><div class="lexical-set">${prefixes}</div></div>
      <span class="builder-cross" aria-hidden="true">×</span>
      <div><p class="micro-label">再选对象</p><div class="lexical-set">${suffixes}</div></div>`;
    byId("demonstrativeGrid").innerHTML = course.demonstratives.map((item) => phraseCard(item)).join("");
    byId("questionWordGrid").innerHTML = course.questionExpressions.map((item) => phraseCard(item)).join("");

    byId("grammarContrasts").innerHTML = course.contrasts.map((item) => `
      <article class="grammar-contrast">
        <div class="contrast-heading"><span>${escapeHtml(item.cue)}</span><h3>${escapeHtml(item.title)}</h3></div>
        <div class="grammar-pair">
          ${phraseCard(item.left, "phrase-chip phrase-chip-dark")}
          <span class="contrast-vs" aria-hidden="true">vs.</span>
          ${phraseCard(item.right, "phrase-chip phrase-chip-dark")}
        </div>
        <p>${escapeHtml(item.note)}</p>
      </article>`).join("");

    byId("sentenceGroups").innerHTML = course.sentenceGroups.map((group, index) => `
      <details class="sentence-group" id="${escapeHtml(group.id)}">
        <summary>
          <span class="sentence-group-heading">
          <span class="micro-label">句组 ${String(index + 1).padStart(2, "0")}</span>
          <strong>${escapeHtml(group.title)}</strong>
          <small>${escapeHtml(group.description)}</small>
          </span>
          <b>${group.sentences.length} 句</b>
          <i aria-hidden="true">＋</i>
        </summary>
        <div class="sentence-group-body">
          <h3 class="sr-only">${escapeHtml(group.title)}</h3>
          ${group.sentences.map((item) => renderSentenceRow(item)).join("")}
        </div>
      </details>`).join("");

    byId("negativeGroups").innerHTML = course.negativeWords.map((group) => `
      <details class="negative-group" id="negative-${escapeHtml(group.word.contextualJyutping)}">
        <summary>
          <span class="negative-summary-word">${escapeHtml(group.word.char)} <small>${escapeHtml(group.word.contextualJyutping)}</small></span>
          <span>${escapeHtml(group.word.meaning)}</span>
          <i aria-hidden="true">＋</i>
        </summary>
        <div class="negative-group-body">
          <h3 class="sr-only">${escapeHtml(group.word.char)} ${escapeHtml(group.word.contextualJyutping)}：${escapeHtml(group.word.meaning)}</h3>
          <header>
          ${tokenButton(group.word, "negative-word")}
          <p>${escapeHtml(group.word.meaning)}</p>
          </header>
          <div>${group.examples.map((item) => renderSentenceRow(item, true)).join("")}</div>
        </div>
      </details>`).join("");

    byId("extraWords").innerHTML = course.extraWords.map((item) => phraseCard(item, "phrase-chip phrase-chip-dark")).join("");
  }

  function renderWordFamily(group, dark = false) {
    const chipClass = dark ? "phrase-chip phrase-chip-dark" : "phrase-chip";
    return `
      <details class="word-family${dark ? " word-family-dark" : ""}" id="${escapeHtml(group.id)}">
        <summary>
          <span class="word-family-key">${escapeHtml(group.word.text)} <small>${escapeHtml(group.word.jyutping)}</small></span>
          <span>${escapeHtml(group.word.meaning)}</span>
          <i aria-hidden="true">＋</i>
        </summary>
        <div class="word-family-body">
          <div class="word-family-lead">
            ${phraseCard(group.word, chipClass)}
            <p>${escapeHtml(group.note)}</p>
          </div>
          <div class="word-family-examples">
            ${group.examples.map((item) => phraseCard(item, chipClass)).join("")}
          </div>
        </div>
      </details>`;
  }

  function setupExclusiveDetails(container) {
    if (!container) return;
    const items = [...container.children].filter((item) => item.tagName === "DETAILS");
    items.forEach((item) => {
      item.addEventListener("toggle", () => {
        if (!item.open) return;
        items.forEach((other) => {
          if (other !== item) other.open = false;
        });
      });
    });
  }

  function renderLessonThree() {
    byId("searchSentences").innerHTML = course.searchSentences.map((item) => renderSentenceRow(item, false, 3)).join("");
    byId("aspectParts").innerHTML = course.aspectParts.map((item) => phraseCard(item)).join("");
    byId("progressiveGroups").innerHTML = course.progressiveGroups.map((group, index) => `
      <details class="sentence-group" id="${escapeHtml(group.id)}">
        <summary>
          <span class="sentence-group-heading">
            <span class="micro-label">结构 ${String(index + 1).padStart(2, "0")}</span>
            <strong>${escapeHtml(group.title)}</strong>
            <small>${escapeHtml(group.description)}</small>
          </span>
          <b>${group.sentences.length} 句</b>
          <i aria-hidden="true">＋</i>
        </summary>
        <div class="sentence-group-body">
          <h3 class="sr-only">${escapeHtml(group.title)}</h3>
          ${group.sentences.map((item) => renderSentenceRow(item)).join("")}
        </div>
      </details>`).join("");
    byId("giveSentences").innerHTML = course.giveSentences.map((item) => renderSentenceRow(item, false, 3)).join("");
    byId("directionSentences").innerHTML = course.directionSentences.map((item) => renderSentenceRow(item, false, 3)).join("");
    byId("verbFamilies").innerHTML = course.verbFamilies.map((group) => renderWordFamily(group, true)).join("");
    byId("thoughtContrasts").innerHTML = course.thoughtContrasts.map((item) => `
      <article class="thought-card">
        <h3 class="sr-only">${escapeHtml(item.word.text)}</h3>
        ${phraseCard(item.word)}
        <p class="thought-english">${escapeHtml(item.english)}</p>
        <p>${escapeHtml(item.note)}</p>
        <div class="thought-example">${renderSentenceRow(item.example, true)}</div>
      </article>`).join("");
    byId("adjectiveFamilies").innerHTML = course.adjectiveFamilies.map((group) => renderWordFamily(group)).join("");
    byId("adjectiveSentences").innerHTML = course.adjectiveSentences.map((item) => renderSentenceRow(item, false, 3)).join("");
    setupExclusiveDetails(byId("progressiveGroups"));
    setupExclusiveDetails(byId("verbFamilies"));
    setupExclusiveDetails(byId("adjectiveFamilies"));
  }

  function setupLessonNavigation() {
    const modules = [...document.querySelectorAll("[data-lesson-module]")];
    const outlineLinks = [...document.querySelectorAll("[data-module-link]")];
    const outline = byId("course-outline");
    const completion = document.querySelector("[data-lesson-completion]");

    function activateFromHash({ scroll = true } = {}) {
      const targetId = decodeURIComponent(location.hash.slice(1));
      const target = targetId ? byId(targetId) : null;
      const module = target?.matches("[data-lesson-module]") ? target : target?.closest("[data-lesson-module]");

      modules.forEach((item) => {
        item.hidden = item !== module;
      });
      if (outline) outline.hidden = Boolean(module);
      if (completion) completion.hidden = !module;
      outlineLinks.forEach((link) => {
        const linkTarget = byId(decodeURIComponent(link.hash.slice(1)));
        if (linkTarget && linkTarget === target) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });

      if (target?.tagName === "DETAILS") target.open = true;
      const focusTarget = target?.tagName === "DETAILS"
        ? target.querySelector("summary")
        : module
          ? module.querySelector("h2")
          : target === outline
            ? outline.querySelector("h2")
            : null;
      if (focusTarget && focusTarget.tagName !== "SUMMARY") focusTarget.setAttribute("tabindex", "-1");
      if (target || focusTarget) {
        window.requestAnimationFrame(() => {
          if (scroll && target) target.scrollIntoView({ block: "start", behavior: "auto" });
          focusTarget?.focus({ preventScroll: true });
        });
      }
    }

    document.addEventListener("click", (event) => {
      const link = event.target.closest("[data-module-link], .module-back");
      if (!link || !link.hash) return;
      event.preventDefault();
      if (location.hash === link.hash) activateFromHash();
      else location.hash = link.hash;
    });
    window.addEventListener("hashchange", () => activateFromHash());
    activateFromHash({ scroll: Boolean(location.hash) });
  }

  function renderTones() {
    const drill = course.phraseDrills[0];
    [byId("heroSixTone"), byId("phraseSixTone")].forEach((button) => {
      button.dataset.audio = drill.sentenceAudio;
      button.dataset.label = `${drill.text}：六调阶梯`;
    });
    byId("toneBoard").innerHTML = course.tones.map((tone) => `
      <button class="tone-card" type="button" data-number="${tone.tone}" data-audio="${escapeHtml(tone.audio)}" data-label="${escapeHtml(tone.char)} ${escapeHtml(tone.jyutping)}，${escapeHtml(tone.name)}" aria-label="播放 ${escapeHtml(tone.char)} ${escapeHtml(tone.jyutping)}，${escapeHtml(tone.name)}">
        <span class="tone-name">${tone.tone} · ${escapeHtml(tone.name)}</span>
        <span class="tone-word">${escapeHtml(tone.char)}</span>
        <span class="tone-jyutping">${escapeHtml(tone.jyutping)}</span>
        ${contourSvg(tone.contour)}
      </button>`).join("");

    byId("sixTonePhrase").innerHTML = drill.tokens.map((token) => tokenButton(token)).join("");
  }

  function renderContrasts() {
    byId("contrastList").innerHTML = course.contrastGroups.map((group) => {
      const pairData = group.pairAudio
        ? `data-audio="${escapeHtml(group.pairAudio)}"`
        : `data-sequence="${escapeHtml(group.sequence.join("|"))}"`;
      return `
        <article class="contrast-row">
          <div class="contrast-label">
            <strong>${escapeHtml(group.label)}</strong>
            <span>${escapeHtml(group.hint)}</span>
          </div>
          <div class="contrast-words">
            ${tokenButton(group.left, "example-word")}
            <span class="contrast-vs" aria-hidden="true">vs.</span>
            ${tokenButton(group.right, "example-word")}
          </div>
          <button class="pair-play" type="button" ${pairData} data-label="${escapeHtml(group.left.jyutping)} 对比 ${escapeHtml(group.right.jyutping)}" aria-label="播放 ${escapeHtml(group.left.jyutping)} 与 ${escapeHtml(group.right.jyutping)} 对比">▶ 听 A / B</button>
        </article>`;
    }).join("");

    byId("contrastList").addEventListener("click", (event) => {
      const button = event.target.closest("[data-sequence]");
      if (!button) return;
      beginPlayback(button.dataset.sequence.split("|"), button.dataset.label, button);
    });
  }

  function renderCheckedTones() {
    byId("checkedGrid").innerHTML = course.checkedGroups.map((group) => `
      <article class="checked-card">
        <span class="ending-mark">${escapeHtml(group.ending)}</span>
        <h3>${escapeHtml(group.action)}</h3>
        <p>${escapeHtml(group.detail)}</p>
        <div class="checked-examples">${group.examples.map((item) => tokenButton(item)).join("")}</div>
      </article>`).join("");
  }

  function renderSoundGroups() {
    byId("soundGroups").innerHTML = course.soundGroups.map((group) => `
      <article class="sound-group">
        <h3>${escapeHtml(group.title)}</h3>
        <span class="sound-hint">${escapeHtml(group.hint)}</span>
        <p>${escapeHtml(group.note)}</p>
        <div class="sound-examples">${group.examples.map((item) => tokenButton(item)).join("")}</div>
      </article>`).join("");
  }

  const BASELINE_KEY = "cantoToneBaseline.v1";
  const quizState = {
    queue: [],
    index: 0,
    correct: 0,
    locked: false,
    confusions: {},
  };

  function shuffle(items) {
    const result = [...items];
    for (let index = result.length - 1; index > 0; index -= 1) {
      const target = Math.floor(Math.random() * (index + 1));
      [result[index], result[target]] = [result[target], result[index]];
    }
    return result;
  }

  function buildQuizQueue() {
    const anchor = [];
    for (let tone = 1; tone <= 6; tone += 1) {
      const candidates = course.quizPool.filter((item) => item.tone === tone);
      anchor.push(candidates[Math.floor(Math.random() * candidates.length)]);
    }
    const anchorKeys = new Set(anchor.map((item) => `${item.family}:${item.tone}`));
    const extras = shuffle(course.quizPool.filter((item) => !anchorKeys.has(`${item.family}:${item.tone}`))).slice(0, 4);
    return shuffle([...anchor, ...extras]);
  }

  function renderLastBaseline() {
    let previous = null;
    try {
      previous = JSON.parse(readStored(BASELINE_KEY));
    } catch (_) {
      // Ignore malformed local data and start cleanly.
    }
    if (!previous || !Number.isFinite(previous.score) || !Number.isFinite(previous.total)) {
      byId("lastBaseline").textContent = "还没有基线记录；做完后会只保存在这台设备。";
      return;
    }
    const previousTime = Date.parse(previous.date);
    const date = Number.isFinite(previousTime)
      ? new Intl.DateTimeFormat("zh-HK", { month: "numeric", day: "numeric" }).format(new Date(previousTime))
      : "上次";
    const confusion = previous.primaryConfusion ? `；最需留意 ${previous.primaryConfusion}` : "；上次没有形成稳定混淆对";
    byId("lastBaseline").textContent = `${date === "上次" ? date : `上次 ${date}`}：${previous.score}/${previous.total}${confusion}`;
  }

  function startQuiz() {
    quizState.queue = buildQuizQueue();
    quizState.index = 0;
    quizState.correct = 0;
    quizState.locked = false;
    quizState.confusions = {};
    byId("quizIntro").hidden = true;
    byId("quizResult").hidden = true;
    byId("quizStage").hidden = false;
    renderQuestion();
  }

  function renderQuestion() {
    quizState.locked = false;
    const question = quizState.queue[quizState.index];
    byId("quizProgressText").textContent = `${quizState.index + 1} / ${quizState.queue.length}`;
    byId("quizProgressBar").style.width = `${((quizState.index + 1) / quizState.queue.length) * 100}%`;
    byId("quizFeedback").innerHTML = "";
    byId("nextQuestion").hidden = true;
    byId("answerGrid").innerHTML = course.tones.map((tone) => `
      <button class="answer-button" type="button" data-answer="${tone.tone}">
        ${tone.tone} · ${escapeHtml(tone.name)}
      </button>`).join("");
    byId("quizListen").dataset.audio = question.audio;
    byId("quizListen").dataset.label = `听辨题 ${quizState.index + 1}`;
  }

  function answerQuestion(selectedTone) {
    if (quizState.locked) return;
    quizState.locked = true;
    const question = quizState.queue[quizState.index];
    const isCorrect = selectedTone === question.tone;
    if (isCorrect) {
      quizState.correct += 1;
    } else {
      const pair = [selectedTone, question.tone].sort((a, b) => a - b).join("↔");
      quizState.confusions[pair] = (quizState.confusions[pair] || 0) + 1;
    }

    byId("answerGrid").querySelectorAll("button").forEach((button) => {
      const answer = Number(button.dataset.answer);
      button.disabled = true;
      if (answer === question.tone) button.classList.add("is-correct");
      if (!isCorrect && answer === selectedTone) button.classList.add("is-wrong");
    });

    const lead = isCorrect ? "听对了。" : `刚才选了 ${selectedTone} 调。`;
    byId("quizFeedback").innerHTML = `${lead} 答案是 <strong>${escapeHtml(question.char)} ${escapeHtml(question.jyutping)}</strong>：${question.tone} 调 ${toneNames[question.tone]}，${toneCues[question.tone]}。`;
    byId("nextQuestion").textContent = quizState.index === quizState.queue.length - 1 ? "查看结果" : "下一题";
    byId("nextQuestion").hidden = false;
    if (window.matchMedia("(max-width: 620px)").matches && !audioDock.hidden) {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.requestAnimationFrame(() => {
        byId("nextQuestion").scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "center" });
      });
    }
  }

  function primaryConfusion() {
    const entries = Object.entries(quizState.confusions).sort((a, b) => b[1] - a[1]);
    return entries[0]?.[0] || "";
  }

  function finishQuiz() {
    const primary = primaryConfusion();
    const result = {
      date: new Date().toISOString(),
      score: quizState.correct,
      total: quizState.queue.length,
      confusions: quizState.confusions,
      primaryConfusion: primary,
    };
    writeStored(BASELINE_KEY, JSON.stringify(result));
    byId("quizStage").hidden = true;
    byId("quizResult").hidden = false;
    const advice = primary
      ? `本轮最常混的是 <strong>${primary} 调</strong>。先回到“六调总览”分别重听，再用最接近的 A/B 对立各读三遍。`
      : "本轮没有形成固定混淆对。下次换一批字再测，比追求一次满分更有意义。";
    byId("quizResult").innerHTML = `
      <p class="section-index">本机个人基线</p>
      <h3>${quizState.correct} / ${quizState.queue.length}</h3>
      <p class="result-score">${advice}</p>
      <p>这只是今天在 18 个样音中的一次抽样，不代表完整粤语能力。</p>
      <button class="button button-primary" type="button" id="retryQuiz">换一组再测</button>`;
    byId("retryQuiz").addEventListener("click", startQuiz);
    renderLastBaseline();
  }

  if (course.meta.id === "lesson-01-pronunciation") {
    byId("startQuiz").addEventListener("click", startQuiz);
    byId("answerGrid").addEventListener("click", (event) => {
      const button = event.target.closest("[data-answer]");
      if (button) answerQuestion(Number(button.dataset.answer));
    });
    byId("nextQuestion").addEventListener("click", () => {
      if (quizState.index >= quizState.queue.length - 1) {
        finishQuiz();
        return;
      }
      quizState.index += 1;
      renderQuestion();
    });

    renderTones();
    renderContrasts();
    renderCheckedTones();
    renderSoundGroups();
    renderLastBaseline();
    setupLessonNavigation();
  } else if (course.meta.id === "lesson-02-pronouns-questions") {
    renderLessonTwo();
    setupLessonNavigation();
  } else if (course.meta.id === "lesson-03-actions-progressive") {
    renderLessonThree();
    setupLessonNavigation();
  }

  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch(() => {
        // Offline support is a convenience; the course stays usable online if registration fails.
      });
    });
  }
})();
