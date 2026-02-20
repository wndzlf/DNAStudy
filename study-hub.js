const CHAPTERS = [
  {
    number: 1,
    title: "Introduction to Genomics",
    path: "intro.html",
    status: "ready",
    subtitle:
      "유전체, 유전자, 조절, 돌연변이, high-throughput 실험, 데이터 브라우저를 연결해 기초 개념을 잡는 장입니다."
  },
  {
    number: 2,
    title: "Introduction to R for Genomic Data Analysis",
    path: "Rintro.html",
    status: "pending"
  },
  {
    number: 3,
    title: "Statistics for Genomics",
    path: "stats.html",
    status: "pending"
  },
  {
    number: 4,
    title: "Exploratory Data Analysis with Unsupervised Machine Learning",
    path: "unsupervisedLearning.html",
    status: "pending"
  },
  {
    number: 5,
    title: "Predictive Modeling with Supervised Machine Learning",
    path: "supervisedLearning.html",
    status: "pending"
  },
  {
    number: 6,
    title: "Operations on Genomic Intervals and Genome Arithmetic",
    path: "genomicIntervals.html",
    status: "pending"
  },
  {
    number: 7,
    title: "Quality Check, Processing and Alignment of High-throughput Sequencing Reads",
    path: "processingReads.html",
    status: "pending"
  },
  {
    number: 8,
    title: "RNA-seq Analysis",
    path: "rnaseqanalysis.html",
    status: "pending"
  },
  {
    number: 9,
    title: "ChIP-seq analysis",
    path: "chipseq.html",
    status: "pending"
  },
  {
    number: 10,
    title: "DNA methylation analysis using bisulfite sequencing data",
    path: "bsseq.html",
    status: "pending"
  },
  {
    number: 11,
    title: "Multi-omics Analysis",
    path: "multiomics.html",
    status: "pending"
  }
];

const REG_EFFECT = {
  enhancer: { delta: 22, label: "Enhancer가 전사를 올립니다" },
  silencer: { delta: -20, label: "Silencer가 전사를 낮춥니다" },
  methylation: { delta: -30, label: "Promoter methylation이 접근성을 낮춥니다" },
  mirna: { delta: -18, label: "miRNA가 mRNA 안정성을 줄입니다" }
};

const MUTATION_EXAMPLES = {
  substitution: {
    before: "Before: ATG CCA TTT GGA CCT",
    after: "After : ATG CCA TAT GGA CCT",
    note: "치환(substitution): 한 염기가 다른 염기로 바뀝니다."
  },
  deletion: {
    before: "Before: ATG CCA TTT GGA CCT",
    after: "After : ATG CCA TTG GAC CT",
    note: "결실(deletion): 염기가 빠져 reading frame이 바뀔 수 있습니다."
  },
  insertion: {
    before: "Before: ATG CCA TTT GGA CCT",
    after: "After : ATG CCA TTT AGG ACC T",
    note: "삽입(insertion): 염기가 추가되어 프레임이 이동할 수 있습니다."
  },
  inversion: {
    before: "Before: ATG CCA [TTT GGA] CCT",
    after: "After : ATG CCA [AGG TTT] CCT",
    note: "역위(inversion): 구간이 뒤집혀 배치됩니다."
  },
  translocation: {
    before: "Chr1: ... ATG CCA | TTT GGA ...",
    after: "Chr1: ... ATG CCA ...   Chr3: ... TTT GGA ...",
    note: "전좌(translocation): DNA 구간이 다른 위치 또는 다른 염색체로 이동합니다."
  }
};

const el = {
  list: document.getElementById("chapter-list"),
  chapterTag: document.getElementById("chapter-tag"),
  chapterTitle: document.getElementById("chapter-title"),
  chapterSubtitle: document.getElementById("chapter-subtitle"),
  chapter1: document.getElementById("chapter-1-content"),
  placeholder: document.getElementById("chapter-placeholder"),
  placeholderTitle: document.getElementById("placeholder-title"),
  placeholderCopy: document.getElementById("placeholder-copy"),
  placeholderLink: document.getElementById("placeholder-link"),
  expressionBar: document.getElementById("expression-bar"),
  expressionValue: document.getElementById("expression-value"),
  expressionNote: document.getElementById("expression-note"),
  mutationType: document.getElementById("mutation-type"),
  mutationBefore: document.getElementById("mutation-before"),
  mutationAfter: document.getElementById("mutation-after"),
  mutationNote: document.getElementById("mutation-note")
};

const SOURCE_BASE = "https://compgenomr.github.io/book";

let activeChapter = 1;

function chapterHash(chapterNumber) {
  return `chapter-${chapterNumber}`;
}

function chapterFromHash() {
  const hash = String(window.location.hash || "").replace("#", "").trim();
  if (!hash.startsWith("chapter-")) return 1;
  const parsed = Number(hash.replace("chapter-", ""));
  if (!Number.isFinite(parsed)) return 1;
  const found = CHAPTERS.find((chapter) => chapter.number === parsed);
  return found ? found.number : 1;
}

function renderChapterList() {
  const buttons = CHAPTERS.map((chapter) => {
    const li = document.createElement("li");
    li.className = "chapter-item";

    const button = document.createElement("button");
    button.type = "button";
    button.dataset.chapter = String(chapter.number);

    const number = document.createElement("span");
    number.className = "chapter-number";
    number.textContent = `Chapter ${chapter.number}`;

    const name = document.createElement("span");
    name.className = "chapter-name";
    name.textContent = chapter.title;

    const status = document.createElement("span");
    status.className = "chapter-status";
    status.textContent = chapter.status === "ready" ? "학습 페이지 제공 중" : "준비 중";

    button.append(number, name, status);
    li.append(button);
    return li;
  });

  el.list.replaceChildren(...buttons);
}

function setActiveChapter(number, pushHash = true) {
  const chapter = CHAPTERS.find((item) => item.number === number);
  if (!chapter) return;

  activeChapter = number;

  const buttons = el.list.querySelectorAll("button[data-chapter]");
  buttons.forEach((button) => {
    const current = Number(button.dataset.chapter) === number;
    button.classList.toggle("is-active", current);
  });

  el.chapterTag.textContent = `Chapter ${chapter.number}`;
  el.chapterTitle.textContent = chapter.title;

  if (chapter.number === 1) {
    el.chapterSubtitle.textContent = chapter.subtitle || "";
    el.chapter1.hidden = false;
    el.placeholder.hidden = true;
  } else {
    el.chapterSubtitle.textContent = "해당 챕터는 다음 단계에서 같은 구조로 확장됩니다.";
    el.chapter1.hidden = true;
    el.placeholder.hidden = false;
    el.placeholderTitle.textContent = `Chapter ${chapter.number} 준비 중`;
    el.placeholderCopy.textContent =
      `현재는 원문으로 이동해 학습할 수 있습니다. 이후 동일한 방식으로 ${chapter.title} 장도 시각화합니다.`;
    el.placeholderLink.href = `${SOURCE_BASE}/${chapter.path}`;
    el.placeholderLink.textContent = `원문 Chapter ${chapter.number} 열기`;
  }

  if (pushHash) {
    history.replaceState(null, "", `#${chapterHash(number)}`);
  }
}

function setupChapterSelection() {
  el.list.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-chapter]");
    if (!button) return;

    const target = Number(button.dataset.chapter);
    if (!Number.isFinite(target)) return;
    setActiveChapter(target, true);
  });
}

function setActivePart(partId) {
  const tabs = document.querySelectorAll(".part-tab[data-part]");
  const panels = document.querySelectorAll(".part-panel[id]");

  tabs.forEach((tab) => {
    const active = tab.dataset.part === partId;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", String(active));
  });

  panels.forEach((panel) => {
    const active = panel.id === partId;
    panel.classList.toggle("is-active", active);
    panel.hidden = !active;
  });
}

function setupPartTabs() {
  const root = document.querySelector(".chapter1-tabs");
  if (!root) return;

  root.addEventListener("click", (event) => {
    const button = event.target.closest(".part-tab[data-part]");
    if (!button) return;
    setActivePart(button.dataset.part);
  });
}

function updateExpressionMeter() {
  const controls = document.querySelectorAll("[data-reg]");
  let value = 46;
  const notes = [];

  controls.forEach((control) => {
    const key = control.dataset.reg;
    const config = REG_EFFECT[key];
    if (!config) return;

    if (control.checked) {
      value += config.delta;
      notes.push(config.label);
    }
  });

  value = Math.max(0, Math.min(100, value));

  el.expressionBar.style.width = `${value}%`;
  el.expressionValue.textContent = `${value}%`;
  el.expressionNote.textContent =
    notes.length > 0 ? notes.join(" · ") : "활성 조절 요소가 없어 기본 발현 상태입니다.";
}

function setupRegulationSimulator() {
  const controls = document.querySelectorAll("[data-reg]");
  controls.forEach((control) => {
    control.addEventListener("change", updateExpressionMeter);
  });
  updateExpressionMeter();
}

function updateMutationExample() {
  const selected = el.mutationType.value;
  const data = MUTATION_EXAMPLES[selected] || MUTATION_EXAMPLES.substitution;

  el.mutationBefore.textContent = data.before;
  el.mutationAfter.textContent = data.after;
  el.mutationNote.textContent = data.note;
}

function setupMutationDemo() {
  el.mutationType.addEventListener("change", updateMutationExample);
  updateMutationExample();
}

function init() {
  renderChapterList();
  setupChapterSelection();
  setupPartTabs();
  setupRegulationSimulator();
  setupMutationDemo();

  const fromHash = chapterFromHash();
  setActiveChapter(fromHash, false);
}

init();
