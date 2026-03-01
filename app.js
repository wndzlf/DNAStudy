const CATALOG_PATH = "./genes.json";
const CODON_PREVIEW_COUNT = 30;
const FLOW_PREVIEW_COUNT = 12;
const LONG_PROTEIN_THRESHOLD = 1300;
const COMPLEX_DISTANCE_THRESHOLD = 8;
const FLOW_PALETTE = [
  { bg: "rgba(56, 189, 248, 0.22)", line: "rgba(56, 189, 248, 0.7)" },
  { bg: "rgba(45, 212, 191, 0.22)", line: "rgba(45, 212, 191, 0.7)" },
  { bg: "rgba(129, 140, 248, 0.22)", line: "rgba(129, 140, 248, 0.7)" },
  { bg: "rgba(251, 191, 36, 0.24)", line: "rgba(251, 191, 36, 0.72)" },
  { bg: "rgba(244, 114, 182, 0.22)", line: "rgba(244, 114, 182, 0.72)" },
  { bg: "rgba(134, 239, 172, 0.24)", line: "rgba(134, 239, 172, 0.75)" }
];
const GAME_POINTS_PER_CLEAR = 10;
const INTERACTION_GAME_MISSIONS = [
  {
    id: "insulin-signal",
    label: "Mission A",
    title: "인슐린 도킹: 혈당 신호 시작",
    story:
      "식사 후 인슐린이 혈액에 나오면 세포 표면 수용체와 결합해 포도당 흡수를 시작시킵니다.",
    question: "인슐린(INS)이 직접 붙어 신호를 켜는 단백질은 무엇일까요?",
    options: [
      {
        id: "insr",
        text: "INSR (인슐린 수용체)",
        isCorrect: true,
        reason: "정답입니다. 인슐린은 INSR에 결합해 세포 내부 신호를 활성화합니다."
      },
      {
        id: "hbb",
        text: "HBB (헤모글로빈 베타)",
        isCorrect: false,
        reason: "HBB는 산소 운반 단백질로, 인슐린 수용체 역할을 하지 않습니다."
      },
      {
        id: "ace2",
        text: "ACE2 (막 수용체)",
        isCorrect: false,
        reason: "ACE2는 다른 생리 경로에 관여하며 인슐린 결합 수용체가 아닙니다."
      }
    ],
    learningPoints: [
      "인슐린은 혈당 조절 호르몬이고, 표적은 인슐린 수용체(INSR)입니다.",
      "리간드(인슐린)-수용체(INSR) 결합은 세포 신호 전달의 대표적인 시작 방식입니다.",
      "아래 3D는 실제 PDB 복합체(6PXV)이며 실험 구조 데이터를 기반으로 합니다."
    ],
    structure: {
      pdbId: "6PXV",
      mode: "insulin",
      sourceUrl: "https://www.rcsb.org/structure/6PXV",
      title: "PDB 6PXV | Insulin receptor-Insulin complex",
      hint: "청록: 인슐린 수용체(INSR), 주황: 인슐린(INS). stick은 결합 인터페이스 후보입니다."
    }
  },
  {
    id: "crispr-edit",
    label: "Mission B",
    title: "CRISPR 편집: Cas9-sgRNA-DNA",
    story:
      "CRISPR-Cas9은 가이드 RNA(sgRNA)가 표적 DNA를 안내해 Cas9이 특정 위치를 절단하도록 돕습니다.",
    question: "Cas9이 정확한 위치를 찾도록 안내하는 핵심 분자는 무엇일까요?",
    options: [
      {
        id: "sgrna",
        text: "sgRNA (가이드 RNA)",
        isCorrect: true,
        reason: "정답입니다. sgRNA가 Cas9에 표적 정보를 제공해 DNA 절단 위치를 결정합니다."
      },
      {
        id: "glucose",
        text: "포도당 (Glucose)",
        isCorrect: false,
        reason: "포도당은 에너지원이지 CRISPR 표적 안내 분자가 아닙니다."
      },
      {
        id: "hemoglobin",
        text: "헤모글로빈",
        isCorrect: false,
        reason: "헤모글로빈은 산소 운반 단백질로 CRISPR 편집 기전에 직접 관여하지 않습니다."
      }
    ],
    learningPoints: [
      "CRISPR 복합체는 단백질(Cas9), RNA(sgRNA), DNA(표적/비표적 가닥)가 함께 작동합니다.",
      "sgRNA 염기서열 상보성으로 Cas9이 원하는 DNA 위치를 찾습니다.",
      "아래 3D는 실제 PDB 복합체(5Y36)이며 구조 기반 편집 메커니즘 학습에 사용됩니다."
    ],
    structure: {
      pdbId: "5Y36",
      mode: "crispr",
      sourceUrl: "https://www.rcsb.org/structure/5Y36",
      title: "PDB 5Y36 | Cas9-sgRNA-DNA complex",
      hint: "청록: Cas9 단백질, 분홍: sgRNA, 노랑/주황: DNA 두 가닥입니다."
    }
  }
];

const CODON_TABLE = {
  UUU: "F", UUC: "F", UUA: "L", UUG: "L",
  UCU: "S", UCC: "S", UCA: "S", UCG: "S",
  UAU: "Y", UAC: "Y", UAA: "*", UAG: "*",
  UGU: "C", UGC: "C", UGA: "*", UGG: "W",

  CUU: "L", CUC: "L", CUA: "L", CUG: "L",
  CCU: "P", CCC: "P", CCA: "P", CCG: "P",
  CAU: "H", CAC: "H", CAA: "Q", CAG: "Q",
  CGU: "R", CGC: "R", CGA: "R", CGG: "R",

  AUU: "I", AUC: "I", AUA: "I", AUG: "M",
  ACU: "T", ACC: "T", ACA: "T", ACG: "T",
  AAU: "N", AAC: "N", AAA: "K", AAG: "K",
  AGU: "S", AGC: "S", AGA: "R", AGG: "R",

  GUU: "V", GUC: "V", GUA: "V", GUG: "V",
  GCU: "A", GCC: "A", GCA: "A", GCG: "A",
  GAU: "D", GAC: "D", GAA: "E", GAG: "E",
  GGU: "G", GGC: "G", GGA: "G", GGG: "G"
};

const state = {
  catalog: [],
  currentGene: null,
  currentAlphaFold: null,
  viewer: null,
  requestToken: 0,
  cdsCache: new Map(),
  alphaFoldCache: new Map(),
  uniprotCache: new Map(),
  bestStructureCache: new Map(),
  resizeObserver: null,
  pinnedFlowIndex: null,
  structureMode: "alphafold",
  complexContext: null,
  game: {
    missionIndex: 0,
    score: 0,
    solved: new Set(),
    selectedOptionId: null,
    answered: false,
    lastAwardedPoints: 0
  }
};

const el = {
  select: document.getElementById("gene-select"),
  catalogMeta: document.getElementById("catalog-meta"),
  geneSummary: document.getElementById("gene-summary"),
  dnaMeta: document.getElementById("dna-meta"),
  dnaSeq: document.getElementById("dna-seq"),
  dnaFlow: document.getElementById("dna-flow"),
  mrnaMeta: document.getElementById("mrna-meta"),
  mrnaSeq: document.getElementById("mrna-seq"),
  mrnaFlow: document.getElementById("mrna-flow"),
  codonMeta: document.getElementById("codon-meta"),
  codonGrid: document.getElementById("codon-grid"),
  aaMeta: document.getElementById("aa-meta"),
  aaSeq: document.getElementById("aa-seq"),
  aaFlow: document.getElementById("aa-flow"),
  insightMeta: document.getElementById("insight-meta"),
  functionList: document.getElementById("function-list"),
  locationList: document.getElementById("location-list"),
  interactionList: document.getElementById("interaction-list"),
  pathwayList: document.getElementById("pathway-list"),
  foldMeta: document.getElementById("fold-meta"),
  foldHint: document.getElementById("fold-hint"),
  sourceLinks: document.getElementById("source-links"),
  reloadBtn: document.getElementById("reload-structure"),
  viewerShell: document.getElementById("viewer-shell"),
  gameMissionTabs: document.getElementById("game-mission-tabs"),
  gameProgress: document.getElementById("game-progress"),
  gameScore: document.getElementById("game-score"),
  gameMissionLabel: document.getElementById("game-mission-label"),
  gameTitle: document.getElementById("game-title"),
  gameStory: document.getElementById("game-story"),
  gameQuestion: document.getElementById("game-question"),
  gameOptions: document.getElementById("game-options"),
  gameFeedback: document.getElementById("game-feedback"),
  gamePoints: document.getElementById("game-learning-points"),
  gameLoad3d: document.getElementById("game-load-3d"),
  gameReset: document.getElementById("game-reset"),
  gameNext: document.getElementById("game-next")
};

function stripTranscriptVersion(transcriptId) {
  return String(transcriptId || "").split(".")[0];
}

function sanitizeDna(seq) {
  return String(seq || "").toUpperCase().replace(/[^ATGC]/g, "");
}

function splitIntoCodons(rna) {
  const codons = [];
  for (let i = 0; i < rna.length; i += 3) {
    const codon = rna.slice(i, i + 3);
    if (codon.length === 3) codons.push(codon);
  }
  return codons;
}

function flowColor(index) {
  return FLOW_PALETTE[index % FLOW_PALETTE.length];
}

function applyFlowColor(node, index) {
  const color = flowColor(index);
  node.style.setProperty("--flow-color-bg", color.bg);
  node.style.setProperty("--flow-color-soft", color.line);
}

function createFlowToken(text, index, className = "flow-token") {
  const token = document.createElement("span");
  token.className = className;
  token.dataset.flowIndex = String(index);
  token.textContent = text;
  applyFlowColor(token, index);
  return token;
}

function translateCodons(codons) {
  return codons.map((codon) => CODON_TABLE[codon] || "?");
}

function formatSequence(seq, lineLength = 72) {
  const lines = [];
  for (let i = 0; i < seq.length; i += lineLength) {
    lines.push(seq.slice(i, i + lineLength));
  }
  return lines.join("\n");
}

function formatAminoAcids(aa, chunk = 10, lineLength = 72) {
  const chunks = [];
  for (let i = 0; i < aa.length; i += chunk) {
    chunks.push(aa.slice(i, i + chunk));
  }
  return formatSequence(chunks.join(" "), lineLength);
}

function createSourceLink(label, url) {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.href = url;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.textContent = label;
  li.appendChild(a);
  return li;
}

function plddtColor(atom) {
  const plddt = Number(atom?.b ?? 0);
  if (plddt >= 90) return "#1f6feb";
  if (plddt >= 70) return "#2da44e";
  if (plddt >= 50) return "#d29922";
  return "#f85149";
}

function currentRequestIs(token) {
  return token === state.requestToken;
}

function clearFlowHighlight() {
  const tokens = document.querySelectorAll(".flow-token[data-flow-index]");
  tokens.forEach((token) => {
    token.classList.remove("is-focus", "is-dim");
  });
}

function highlightFlow(index) {
  const tokens = document.querySelectorAll(".flow-token[data-flow-index]");
  tokens.forEach((token) => {
    const same = Number(token.dataset.flowIndex) === index;
    token.classList.toggle("is-focus", same);
    token.classList.toggle("is-dim", !same);
  });
}

function resetFlowFocus() {
  state.pinnedFlowIndex = null;
  clearFlowHighlight();
}

function renderFlowStrips(dnaCodons, mrnaCodons, aaList) {
  const previewCount = Math.min(
    FLOW_PREVIEW_COUNT,
    dnaCodons.length,
    mrnaCodons.length,
    aaList.length
  );

  const dnaTokens = [];
  const mrnaTokens = [];
  const aaTokens = [];

  for (let i = 0; i < previewCount; i += 1) {
    dnaTokens.push(createFlowToken(`${i + 1}:${dnaCodons[i]}`, i));
    mrnaTokens.push(createFlowToken(`${i + 1}:${mrnaCodons[i]}`, i));
    aaTokens.push(createFlowToken(`${i + 1}:${aaList[i]}`, i));
  }

  el.dnaFlow.replaceChildren(...dnaTokens);
  el.mrnaFlow.replaceChildren(...mrnaTokens);
  el.aaFlow.replaceChildren(...aaTokens);
}

function renderTextList(container, items, fallback) {
  const values = Array.isArray(items)
    ? items.map((item) => String(item || "").trim()).filter(Boolean)
    : [];

  if (values.length === 0) {
    const li = document.createElement("li");
    li.textContent = fallback;
    container.replaceChildren(li);
    return;
  }

  const nodes = values.map((text) => {
    const li = document.createElement("li");
    li.textContent = text;
    return li;
  });
  container.replaceChildren(...nodes);
}

function renderInteractionList(interactions) {
  const values = Array.isArray(interactions) ? interactions : [];

  if (values.length === 0) {
    renderInteractionMessage("현재 UniProt 주석에서 표시 가능한 상호작용 파트너가 없습니다.");
    return;
  }

  const nodes = values.map((item) => {
    const wrap = document.createElement("div");
    wrap.className = "interaction-item";

    const left = document.createElement("div");
    left.className = "interaction-left";

    const link = document.createElement("a");
    link.href = `https://www.uniprot.org/uniprotkb/${item.accession}/entry`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = item.gene
      ? `${item.gene} (${item.accession})`
      : item.accession;

    const subtitle = document.createElement("p");
    subtitle.textContent = item.organismDiffer
      ? "이종 생물 간 상호작용 보고 포함"
      : "인간 단백질 상호작용 보고";

    left.append(link, subtitle);

    const score = document.createElement("span");
    score.className = "interaction-score";
    score.textContent = `실험 ${item.experiments}건`;

    const action = document.createElement("button");
    action.type = "button";
    action.className = "interaction-btn";
    action.dataset.partnerAccession = item.accession;
    action.dataset.partnerGene = item.gene || "";
    action.textContent = "3D 상호작용 보기";

    wrap.append(left, score, action);
    return wrap;
  });

  el.interactionList.replaceChildren(...nodes);
}

function renderInteractionMessage(message) {
  const info = document.createElement("p");
  info.className = "meta";
  info.textContent = message;
  el.interactionList.replaceChildren(info);
}

function renderPathwayList(pathways) {
  const values = Array.isArray(pathways) ? pathways : [];
  if (values.length === 0) {
    renderTextList(el.pathwayList, [], "현재 공개 주석에서 Reactome 경로 정보를 찾지 못했습니다.");
    return;
  }

  const nodes = values.map((entry) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `https://reactome.org/content/detail/${entry.id}`;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.textContent = `${entry.name} (${entry.id})`;
    a.style.color = "#bdf6ef";
    li.appendChild(a);
    return li;
  });

  el.pathwayList.replaceChildren(...nodes);
}

function normalizeBestStructures(payload, accession) {
  if (!payload || typeof payload !== "object") return [];
  const key = Object.keys(payload).find((candidate) => candidate.toUpperCase() === accession.toUpperCase());
  const entries = key ? payload[key] : [];
  return Array.isArray(entries) ? entries : [];
}

async function fetchBestStructures(uniprotAccession) {
  if (state.bestStructureCache.has(uniprotAccession)) {
    return state.bestStructureCache.get(uniprotAccession);
  }

  try {
    const response = await fetch(`https://www.ebi.ac.uk/pdbe/api/mappings/best_structures/${uniprotAccession}`);
    if (!response.ok) throw new Error(`PDBe best_structures 실패 (${response.status})`);
    const payload = await response.json();
    const entries = normalizeBestStructures(payload, uniprotAccession);
    state.bestStructureCache.set(uniprotAccession, entries);
    return entries;
  } catch (error) {
    console.error(error);
    state.bestStructureCache.set(uniprotAccession, []);
    return [];
  }
}

function bestStructureByPdb(entries) {
  const map = new Map();
  entries.forEach((entry) => {
    if (!entry?.pdb_id || !entry?.chain_id) return;
    const key = String(entry.pdb_id).toLowerCase();
    const current = map.get(key);
    if (!current) {
      map.set(key, entry);
      return;
    }

    const covA = Number(entry.coverage || 0);
    const covB = Number(current.coverage || 0);
    const resA = Number.isFinite(entry.resolution) ? Number(entry.resolution) : 99;
    const resB = Number.isFinite(current.resolution) ? Number(current.resolution) : 99;

    if (covA > covB || (covA === covB && resA < resB)) {
      map.set(key, entry);
    }
  });
  return map;
}

async function findBestComplexPair(primaryAccession, partnerAccession) {
  const [primaryEntries, partnerEntries] = await Promise.all([
    fetchBestStructures(primaryAccession),
    fetchBestStructures(partnerAccession)
  ]);

  const primaryMap = bestStructureByPdb(primaryEntries);
  const partnerMap = bestStructureByPdb(partnerEntries);

  const candidates = [];
  primaryMap.forEach((primaryEntry, pdbId) => {
    const partnerEntry = partnerMap.get(pdbId);
    if (!partnerEntry) return;
    if (primaryEntry.chain_id === partnerEntry.chain_id) return;

    const primaryCoverage = Number(primaryEntry.coverage || 0);
    const partnerCoverage = Number(partnerEntry.coverage || 0);
    const resolution = Number.isFinite(primaryEntry.resolution)
      ? Number(primaryEntry.resolution)
      : Number.isFinite(partnerEntry.resolution)
        ? Number(partnerEntry.resolution)
        : 99;
    const score = primaryCoverage + partnerCoverage - resolution / 100;

    candidates.push({
      pdbId: pdbId.toUpperCase(),
      resolution,
      method: primaryEntry.experimental_method || partnerEntry.experimental_method || "Experimental",
      primary: {
        chain: primaryEntry.chain_id,
        coverage: primaryCoverage
      },
      partner: {
        chain: partnerEntry.chain_id,
        coverage: partnerCoverage
      },
      score
    });
  });

  candidates.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.resolution - b.resolution;
  });

  return candidates[0] || null;
}

function interfaceResidues(model, chainA, chainB, threshold = COMPLEX_DISTANCE_THRESHOLD) {
  const atomsA = model.selectedAtoms({ chain: chainA, atom: "CA" });
  const atomsB = model.selectedAtoms({ chain: chainB, atom: "CA" });

  if (!atomsA.length || !atomsB.length) {
    return { primaryResi: [], partnerResi: [] };
  }

  const primarySet = new Set();
  const partnerSet = new Set();

  atomsA.forEach((a) => {
    for (const b of atomsB) {
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dz = a.z - b.z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (dist <= threshold) {
        primarySet.add(a.resi);
        partnerSet.add(b.resi);
      }
    }
  });

  return {
    primaryResi: Array.from(primarySet),
    partnerResi: Array.from(partnerSet)
  };
}

function getCurrentGameMission() {
  return INTERACTION_GAME_MISSIONS[state.game.missionIndex] || null;
}

function resetGameMissionAttempt() {
  state.game.selectedOptionId = null;
  state.game.answered = false;
  state.game.lastAwardedPoints = 0;
}

function renderGameLearningPoints(points) {
  const values = Array.isArray(points) ? points : [];
  if (values.length === 0) {
    renderTextList(el.gamePoints, [], "학습 포인트가 아직 없습니다.");
    return;
  }

  const nodes = values.map((text) => {
    const li = document.createElement("li");
    li.textContent = text;
    return li;
  });
  el.gamePoints.replaceChildren(...nodes);
}

function renderGameStatus() {
  const total = INTERACTION_GAME_MISSIONS.length;
  const solved = state.game.solved.size;
  el.gameProgress.textContent = `완료 ${solved}/${total} | 정답을 맞히면 실제 3D 복합체를 확인할 수 있습니다.`;
  el.gameScore.textContent = `점수 ${state.game.score}점`;
}

function renderGameMissionTabs() {
  const nodes = INTERACTION_GAME_MISSIONS.map((mission, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "game-mission-tab";
    if (index === state.game.missionIndex) {
      button.classList.add("is-active");
    }
    if (state.game.solved.has(mission.id)) {
      button.classList.add("is-solved");
    }
    button.dataset.gameMissionIndex = String(index);
    button.innerHTML = `${mission.label}<br>${mission.title}<span class="small">${mission.structure.pdbId}</span>`;
    return button;
  });

  el.gameMissionTabs.replaceChildren(...nodes);
}

function renderGameOptions(mission) {
  const options = mission.options || [];
  const nodes = options.map((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "game-option";
    button.dataset.gameOptionId = option.id;
    button.textContent = option.text;

    if (state.game.selectedOptionId === option.id) {
      button.classList.add("is-selected");
    }

    if (state.game.answered && option.isCorrect) {
      button.classList.add("is-correct");
    }

    if (state.game.answered && state.game.selectedOptionId === option.id && !option.isCorrect) {
      button.classList.add("is-wrong");
    }

    return button;
  });

  el.gameOptions.replaceChildren(...nodes);
}

function renderGameMission() {
  const mission = getCurrentGameMission();
  if (!mission) return;

  el.gameMissionLabel.textContent = mission.label;
  el.gameTitle.textContent = mission.title;
  el.gameStory.textContent = mission.story;
  el.gameQuestion.textContent = mission.question;

  renderGameOptions(mission);
  renderGameLearningPoints(mission.learningPoints);

  const selected = mission.options.find((option) => option.id === state.game.selectedOptionId);
  const canLoad = Boolean(state.game.answered && selected?.isCorrect);
  el.gameLoad3d.disabled = !canLoad;

  if (!state.game.answered) {
    el.gameFeedback.textContent = "아래 보기 중 하나를 선택해 정답을 맞히면 3D 구조 버튼이 활성화됩니다.";
    return;
  }

  if (!selected) {
    el.gameFeedback.textContent = "선택을 다시 시도해 주세요.";
    return;
  }

  const alreadySolved = state.game.solved.has(mission.id);
  if (selected.isCorrect) {
    const scoreText = state.game.lastAwardedPoints > 0
      ? `+${state.game.lastAwardedPoints}점 획득`
      : alreadySolved
        ? "이미 클리어한 미션입니다."
        : "정답입니다.";
    el.gameFeedback.textContent = `${selected.reason} ${scoreText}`;
  } else {
    el.gameFeedback.textContent = selected.reason;
  }
}

function setGameMission(index) {
  const total = INTERACTION_GAME_MISSIONS.length;
  if (total === 0) return;
  const normalized = ((index % total) + total) % total;
  state.game.missionIndex = normalized;
  resetGameMissionAttempt();
  renderGameMissionTabs();
  renderGameMission();
  renderGameStatus();
}

function onGameOptionSelect(optionId) {
  const mission = getCurrentGameMission();
  if (!mission || state.game.answered) return;

  const selected = mission.options.find((option) => option.id === optionId);
  if (!selected) return;

  state.game.selectedOptionId = selected.id;
  state.game.answered = true;
  state.game.lastAwardedPoints = 0;

  if (selected.isCorrect && !state.game.solved.has(mission.id)) {
    state.game.solved.add(mission.id);
    state.game.score += GAME_POINTS_PER_CLEAR;
    state.game.lastAwardedPoints = GAME_POINTS_PER_CLEAR;
  }

  renderGameMissionTabs();
  renderGameMission();
  renderGameStatus();
}

function styleMissionStructure(viewer, mission) {
  const mode = mission.structure.mode;

  if (mode === "insulin") {
    viewer.setStyle({}, { cartoon: { color: "#2f3f56", opacity: 0.15 } });
    viewer.setStyle({ chain: "A" }, { cartoon: { color: "#22d3ee", opacity: 1, thickness: 0.32 } });
    viewer.setStyle({ chain: "D" }, { cartoon: { color: "#f59e0b", opacity: 1, thickness: 0.36 } });

    const model = viewer.getModel();
    const iface = interfaceResidues(model, "A", "D");
    if (iface.primaryResi.length > 0) {
      viewer.setStyle(
        { chain: "A", resi: iface.primaryResi },
        { stick: { color: "#67e8f9", radius: 0.18 } }
      );
    }
    if (iface.partnerResi.length > 0) {
      viewer.setStyle(
        { chain: "D", resi: iface.partnerResi },
        { stick: { color: "#fcd34d", radius: 0.18 } }
      );
    }

    return {
      or: [{ chain: "A" }, { chain: "D" }]
    };
  }

  if (mode === "crispr") {
    viewer.setStyle({}, { cartoon: { color: "#364153", opacity: 0.1 } });
    viewer.setStyle({ chain: "A" }, { cartoon: { color: "#22d3ee", opacity: 1, thickness: 0.32 } });
    viewer.setStyle({ chain: "B" }, { stick: { color: "#f472b6", radius: 0.16 } });
    viewer.setStyle({ chain: "C" }, { stick: { color: "#facc15", radius: 0.16 } });
    viewer.setStyle({ chain: "D" }, { stick: { color: "#fb923c", radius: 0.16 } });

    const model = viewer.getModel();
    const dnaIface = interfaceResidues(model, "A", "C");
    if (dnaIface.primaryResi.length > 0) {
      viewer.setStyle(
        { chain: "A", resi: dnaIface.primaryResi },
        { stick: { color: "#06b6d4", radius: 0.16 } }
      );
    }

    return {
      or: [{ chain: "A" }, { chain: "B" }, { chain: "C" }, { chain: "D" }]
    };
  }

  viewer.setStyle({}, { cartoon: { color: "#7f8ea6", opacity: 1 } });
  return {};
}

async function loadMissionStructure(mission, requestToken) {
  const viewer = ensureViewer();
  if (!currentRequestIs(requestToken)) return;

  const { pdbId, title, hint } = mission.structure;
  el.foldMeta.textContent = `${title} 로딩 중...`;
  el.foldHint.textContent = "PDB 복합체 파일을 내려받아 표시하는 중입니다.";

  try {
    const url = `https://files.rcsb.org/download/${pdbId}.cif`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`PDB 복합체 다운로드 실패 (${response.status})`);
    const cifText = await response.text();
    if (!currentRequestIs(requestToken)) return;

    viewer.clear();
    viewer.addModel(cifText, "cif");

    const zoomSelection = styleMissionStructure(viewer, mission);
    viewer.zoomTo(zoomSelection);
    viewer.resize();
    viewer.render();

    state.structureMode = "complex";
    state.complexContext = {
      missionId: mission.id,
      pdbId
    };

    el.foldMeta.textContent = title;
    el.foldHint.textContent = `${hint} 출처: ${mission.structure.sourceUrl}`;
  } catch (error) {
    console.error(error);
    if (!currentRequestIs(requestToken)) return;
    el.foldMeta.textContent = "미션 구조 로딩 실패";
    el.foldHint.textContent = "PDB 네트워크 연결 또는 파일 로딩 상태를 확인하고 다시 시도하세요.";
  }
}

function setupGameEvents() {
  if (!el.gameMissionTabs || !el.gameOptions) return;

  renderGameMissionTabs();
  renderGameMission();
  renderGameStatus();

  el.gameMissionTabs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-game-mission-index]");
    if (!button) return;
    const index = Number(button.dataset.gameMissionIndex);
    if (!Number.isFinite(index)) return;
    setGameMission(index);
  });

  el.gameOptions.addEventListener("click", (event) => {
    const button = event.target.closest("[data-game-option-id]");
    if (!button) return;
    const optionId = button.dataset.gameOptionId;
    if (!optionId) return;
    onGameOptionSelect(optionId);
  });

  el.gameLoad3d.addEventListener("click", () => {
    const mission = getCurrentGameMission();
    if (!mission) return;

    const selected = mission.options.find((option) => option.id === state.game.selectedOptionId);
    if (!state.game.answered || !selected?.isCorrect) {
      el.gameFeedback.textContent = "먼저 정답 보기를 선택해 주세요.";
      return;
    }

    const requestToken = ++state.requestToken;
    loadMissionStructure(mission, requestToken);
  });

  el.gameReset.addEventListener("click", () => {
    resetGameMissionAttempt();
    renderGameMission();
    renderGameStatus();
  });

  el.gameNext.addEventListener("click", () => {
    setGameMission(state.game.missionIndex + 1);
  });
}

function setPipelineLoading(gene) {
  const stableTranscriptId = stripTranscriptVersion(gene.transcriptId);
  const predictedCodons = Math.floor((gene.cdsLength || 0) / 3);

  resetFlowFocus();
  el.geneSummary.textContent = `${gene.id}: ${gene.functionNote}`;
  el.dnaMeta.textContent = `CDS 로딩 중... Transcript ${gene.transcriptId} | Ensembl gene ${gene.ensemblGeneId}`;
  el.mrnaMeta.textContent = `전사 단계 준비 중... 예상 mRNA 길이 약 ${gene.cdsLength} nt`;
  el.codonMeta.textContent = `번역 프레임 준비 중... 예상 코돈 수 약 ${predictedCodons}개`;
  el.aaMeta.textContent = `아미노산 서열 계산 전... (선택된 transcript: ${stableTranscriptId})`;

  el.dnaSeq.textContent = "DNA CDS를 가져오는 중...";
  el.mrnaSeq.textContent = "mRNA를 계산하는 중...";
  el.aaSeq.textContent = "번역 결과를 계산하는 중...";

  el.codonGrid.replaceChildren();
  el.dnaFlow.replaceChildren();
  el.mrnaFlow.replaceChildren();
  el.aaFlow.replaceChildren();
}

function renderPipeline(gene, dnaRaw) {
  const dna = sanitizeDna(dnaRaw);
  if (!dna) {
    throw new Error("유효한 CDS DNA 서열을 가져오지 못했습니다.");
  }

  const mrna = dna.replaceAll("T", "U");
  const dnaCodons = splitIntoCodons(dna);
  const codons = splitIntoCodons(mrna);
  const aaList = translateCodons(codons);
  const proteinWithStop = aaList.join("");
  const hasTerminalStop = proteinWithStop.endsWith("*");
  const protein = hasTerminalStop ? proteinWithStop.slice(0, -1) : proteinWithStop;
  const stopCount = aaList.filter((aa) => aa === "*").length;

  const startCodon = dna.slice(0, 3);
  const stopCodon = dna.slice(-3);
  const shownCodonCount = Math.min(CODON_PREVIEW_COUNT, codons.length);

  el.dnaMeta.textContent =
    `DNA 설계도 길이 ${dna.length}글자 | 시작 신호 ${startCodon} | 끝 신호 후보 ${stopCodon}`;

  el.mrnaMeta.textContent =
    `mRNA 복사본 길이 ${mrna.length}글자 | 이 화면에서는 DNA의 T를 U로 바꿔 보여줍니다.`;

  el.codonMeta.textContent =
    `코돈은 3글자 단어입니다. 총 ${codons.length}개 단어 중 앞 ${shownCodonCount}개를 표시합니다.`;

  el.aaMeta.textContent =
    `결과적으로 ${protein.length}개의 아미노산 블록이 연결됩니다. (종결 신호 ${stopCount}개)`;

  el.dnaSeq.textContent = formatSequence(dna);
  el.mrnaSeq.textContent = formatSequence(mrna);
  el.aaSeq.textContent = formatAminoAcids(protein);

  renderFlowStrips(dnaCodons, codons, aaList);

  el.codonGrid.replaceChildren();
  codons.slice(0, CODON_PREVIEW_COUNT).forEach((codon, idx) => {
    const chip = createFlowToken(`${idx + 1}. ${codon}\n-> ${aaList[idx]}`, idx, "codon-chip flow-token");
    el.codonGrid.append(chip);
  });

  if (codons.length > CODON_PREVIEW_COUNT) {
    const more = document.createElement("div");
    more.className = "codon-chip";
    more.textContent = `+${codons.length - CODON_PREVIEW_COUNT}개 더`;
    el.codonGrid.appendChild(more);
  }
}

function renderSourceLinks(gene) {
  el.sourceLinks.replaceChildren(
    createSourceLink(`Ensembl transcript (${gene.transcriptId})`, gene.ensemblUrl),
    createSourceLink(`UniProt (${gene.uniprotAccession})`, gene.uniprotUrl),
    createSourceLink(`AlphaFold entry (${gene.uniprotAccession})`, gene.alphaFoldEntryUrl)
  );
}

function ensureViewer() {
  if (state.viewer) return state.viewer;
  if (!window.$3Dmol) {
    throw new Error("3Dmol.js가 로드되지 않았습니다.");
  }

  state.viewer = window.$3Dmol.createViewer("viewer", {
    backgroundColor: "#060d15"
  });

  bindViewerResize();
  return state.viewer;
}

function bindViewerResize() {
  if (!el.viewerShell || state.resizeObserver || !window.ResizeObserver) return;

  state.resizeObserver = new ResizeObserver(() => {
    if (!state.viewer) return;
    state.viewer.resize();
    state.viewer.render();
  });

  state.resizeObserver.observe(el.viewerShell);

  window.addEventListener("resize", () => {
    if (!state.viewer) return;
    state.viewer.resize();
    state.viewer.render();
  });
}

async function fetchCatalog() {
  const response = await fetch(CATALOG_PATH);
  if (!response.ok) {
    throw new Error(`유전자 카탈로그 로딩 실패 (${response.status})`);
  }

  const payload = await response.json();
  if (!Array.isArray(payload) || payload.length === 0) {
    throw new Error("유전자 카탈로그가 비어 있습니다.");
  }

  return payload;
}

async function fetchCds(gene) {
  if (state.cdsCache.has(gene.id)) {
    return state.cdsCache.get(gene.id);
  }

  const stableTranscriptId = stripTranscriptVersion(gene.transcriptStableId || gene.transcriptId);
  const url = `https://rest.ensembl.org/sequence/id/${stableTranscriptId}?type=cds;content-type=application/json`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Ensembl CDS 조회 실패 (${response.status})`);
  }

  const payload = await response.json();
  const cds = sanitizeDna(payload?.seq || "");
  if (!cds) {
    throw new Error("Ensembl에서 CDS를 가져왔지만 서열이 비어 있습니다.");
  }

  state.cdsCache.set(gene.id, cds);
  return cds;
}

async function fetchAlphaFoldMeta(uniprotAccession) {
  if (state.alphaFoldCache.has(uniprotAccession)) {
    return state.alphaFoldCache.get(uniprotAccession);
  }

  const url = `https://alphafold.ebi.ac.uk/api/prediction/${uniprotAccession}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`AlphaFold API 실패 (${response.status})`);
    const payload = await response.json();
    const data = Array.isArray(payload) && payload.length > 0 ? payload[0] : null;
    state.alphaFoldCache.set(uniprotAccession, data);
    return data;
  } catch (error) {
    console.error(error);
    state.alphaFoldCache.set(uniprotAccession, null);
    return null;
  }
}

function extractBioInsights(payload, uniprotAccession) {
  const comments = Array.isArray(payload?.comments) ? payload.comments : [];

  const functionTexts = comments
    .filter((comment) => comment.commentType === "FUNCTION")
    .flatMap((comment) => comment.texts || [])
    .map((textObj) => textObj?.value)
    .filter(Boolean)
    .slice(0, 3);

  const locationTexts = comments
    .filter((comment) => comment.commentType === "SUBCELLULAR LOCATION")
    .flatMap((comment) => comment.subcellularLocations || [])
    .map((entry) => entry?.location?.value)
    .filter(Boolean)
    .slice(0, 4);

  const rawInteractions = comments
    .filter((comment) => comment.commentType === "INTERACTION")
    .flatMap((comment) => comment.interactions || []);

  const dedup = new Map();
  rawInteractions.forEach((entry) => {
    const a = entry?.interactantOne;
    const b = entry?.interactantTwo;
    const partner = a?.uniProtKBAccession === uniprotAccession ? b : a;
    const accession = partner?.uniProtKBAccession;
    if (!accession || accession === uniprotAccession) return;

    const current = dedup.get(accession);
    const experiments = Number(entry?.numberOfExperiments || 0);
    const data = {
      accession,
      gene: partner?.geneName || current?.gene || null,
      experiments: Math.max(current?.experiments || 0, experiments),
      organismDiffer: Boolean(entry?.organismDiffer || current?.organismDiffer)
    };
    dedup.set(accession, data);
  });

  const interactions = Array.from(dedup.values())
    .sort((a, b) => b.experiments - a.experiments)
    .slice(0, 8);

  const pathways = (payload?.uniProtKBCrossReferences || [])
    .filter((ref) => ref?.database === "Reactome")
    .map((ref) => {
      const pathwayName = (ref.properties || []).find((prop) => prop.key === "PathwayName")?.value;
      if (!ref.id || !pathwayName) return null;
      return {
        id: ref.id,
        name: pathwayName
      };
    })
    .filter(Boolean)
    .slice(0, 8);

  return {
    proteinName: payload?.proteinDescription?.recommendedName?.fullName?.value || payload?.uniProtkbId || "",
    functionTexts,
    locationTexts,
    interactions,
    pathways
  };
}

async function fetchBioInsights(uniprotAccession) {
  if (state.uniprotCache.has(uniprotAccession)) {
    return state.uniprotCache.get(uniprotAccession);
  }

  try {
    const response = await fetch(`https://rest.uniprot.org/uniprotkb/${uniprotAccession}.json`);
    if (!response.ok) throw new Error(`UniProt 조회 실패 (${response.status})`);
    const payload = await response.json();
    const insights = extractBioInsights(payload, uniprotAccession);
    state.uniprotCache.set(uniprotAccession, insights);
    return insights;
  } catch (error) {
    console.error(error);
    const fallback = {
      proteinName: "",
      functionTexts: [],
      locationTexts: [],
      interactions: [],
      pathways: []
    };
    state.uniprotCache.set(uniprotAccession, fallback);
    return fallback;
  }
}

function setInsightsLoading(gene) {
  el.insightMeta.textContent = `${gene.id} (${gene.uniprotAccession}) 정보를 불러오는 중...`;
  renderTextList(el.functionList, [], "기능 주석을 불러오는 중...");
  renderTextList(el.locationList, [], "세포 위치 정보를 불러오는 중...");
  renderTextList(el.pathwayList, [], "경로 정보를 불러오는 중...");
  renderInteractionMessage("상호작용 파트너를 불러오는 중...");
}

function renderInsights(gene, insights) {
  const proteinLabel = insights.proteinName || gene.uniprotDescription || gene.id;
  el.insightMeta.textContent =
    `${proteinLabel} | UniProt ${gene.uniprotAccession} | 상호작용 상위 ${insights.interactions.length}개 표시 (버튼으로 3D 복합체 시도)`;

  renderTextList(
    el.functionList,
    insights.functionTexts,
    "현재 공개 주석에서 요약 가능한 기능 설명을 찾지 못했습니다."
  );

  renderTextList(
    el.locationList,
    insights.locationTexts,
    "현재 공개 주석에서 세포 내 위치 정보를 찾지 못했습니다."
  );

  renderPathwayList(insights.pathways);

  renderInteractionList(insights.interactions);
}

async function loadStructure(gene, requestToken) {
  const viewer = ensureViewer();
  state.structureMode = "alphafold";
  state.complexContext = null;

  if (!currentRequestIs(requestToken)) return;
  el.foldMeta.textContent = "AlphaFold 구조를 불러오는 중...";

  if (gene.proteinLength > LONG_PROTEIN_THRESHOLD) {
    el.foldHint.textContent = "긴 단백질이어서 구조 로딩/렌더링이 수 초 이상 걸릴 수 있습니다.";
  } else {
    el.foldHint.textContent = "마우스로 회전/이동/확대할 수 있습니다.";
  }

  const af = await fetchAlphaFoldMeta(gene.uniprotAccession);
  if (!currentRequestIs(requestToken)) return;

  state.currentAlphaFold = af;

  const pdbUrl = af?.pdbUrl || gene.alphaFoldFallbackPdbUrl;
  const modelLabel = af?.modelEntityId || `AF-${gene.uniprotAccession}-F1`;
  const version = af?.latestVersion ? `v${af.latestVersion}` : `v${gene.alphaFoldLatestVersion || "?"}`;
  const globalMetricRaw = af?.globalMetricValue ?? gene.alphaFoldGlobalMetric;
  const globalMetric = typeof globalMetricRaw === "number"
    ? `, global pLDDT ${globalMetricRaw.toFixed(2)}`
    : "";

  try {
    const response = await fetch(pdbUrl);
    if (!response.ok) throw new Error(`PDB 다운로드 실패 (${response.status})`);

    const pdbText = await response.text();
    if (!currentRequestIs(requestToken)) return;

    viewer.clear();
    viewer.addModel(pdbText, "pdb");
    viewer.setStyle({}, {
      cartoon: {
        colorfunc: plddtColor,
        thickness: 0.32
      }
    });

    viewer.resize();
    viewer.zoomTo();
    viewer.render();

    el.foldMeta.textContent = `${modelLabel} ${version}${globalMetric}`;
    el.foldHint.textContent = `${gene.id} 단일 단백질 예측 구조입니다.`;
  } catch (error) {
    console.error(error);
    if (!currentRequestIs(requestToken)) return;
    el.foldMeta.textContent = "구조 로딩 실패: 네트워크 상태를 확인하고 다시 시도하세요.";
  }
}

async function loadInteractionComplex(gene, partnerAccession, partnerGene, requestToken) {
  const viewer = ensureViewer();

  if (!currentRequestIs(requestToken)) return;
  el.foldMeta.textContent = "상호작용 복합체 구조를 탐색하는 중...";
  el.foldHint.textContent = `${gene.id}와 ${partnerGene || partnerAccession}의 공통 PDB 구조를 찾는 중입니다.`;

  const bestPair = await findBestComplexPair(gene.uniprotAccession, partnerAccession);
  if (!currentRequestIs(requestToken)) return;

  if (!bestPair) {
    el.foldMeta.textContent = "상호작용 복합체를 찾지 못했습니다.";
    el.foldHint.textContent = "현재 공개 PDB 데이터에서 두 단백질이 함께 측정된 구조가 없거나 자동 매칭에 실패했습니다.";
    return;
  }

  try {
    const cifUrl = `https://files.rcsb.org/download/${bestPair.pdbId}.cif`;
    const response = await fetch(cifUrl);
    if (!response.ok) throw new Error(`PDB 복합체 다운로드 실패 (${response.status})`);
    const cifText = await response.text();
    if (!currentRequestIs(requestToken)) return;

    viewer.clear();
    viewer.addModel(cifText, "cif");
    viewer.setStyle({}, { cartoon: { color: "#39424e", opacity: 0.15 } });
    viewer.setStyle({ chain: bestPair.primary.chain }, { cartoon: { color: "#22d3ee", opacity: 1, thickness: 0.32 } });
    viewer.setStyle({ chain: bestPair.partner.chain }, { cartoon: { color: "#f59e0b", opacity: 1, thickness: 0.32 } });

    const model = viewer.getModel();
    const iface = interfaceResidues(model, bestPair.primary.chain, bestPair.partner.chain);
    if (iface.primaryResi.length > 0) {
      viewer.setStyle(
        { chain: bestPair.primary.chain, resi: iface.primaryResi },
        { stick: { color: "#67e8f9", radius: 0.18 } }
      );
    }
    if (iface.partnerResi.length > 0) {
      viewer.setStyle(
        { chain: bestPair.partner.chain, resi: iface.partnerResi },
        { stick: { color: "#fcd34d", radius: 0.18 } }
      );
    }

    viewer.zoomTo({
      or: [
        { chain: bestPair.primary.chain },
        { chain: bestPair.partner.chain }
      ]
    });
    viewer.resize();
    viewer.render();

    state.structureMode = "complex";
    state.complexContext = {
      partnerAccession,
      partnerGene: partnerGene || partnerAccession
    };

    const resolutionLabel = Number.isFinite(bestPair.resolution) && bestPair.resolution < 99
      ? `${bestPair.resolution.toFixed(2)}A`
      : "N/A";
    el.foldMeta.textContent =
      `PDB ${bestPair.pdbId} | ${gene.id} chain ${bestPair.primary.chain} + ${partnerGene || partnerAccession} chain ${bestPair.partner.chain} | ${bestPair.method}, ${resolutionLabel}`;
    el.foldHint.textContent =
      "청록/주황 카툰이 각 단백질 체인입니다. 막대(stick)는 두 체인이 가까운 인터페이스 후보 부위입니다.";
  } catch (error) {
    console.error(error);
    if (!currentRequestIs(requestToken)) return;
    el.foldMeta.textContent = "복합체 구조 로딩 실패";
    el.foldHint.textContent = "네트워크 또는 PDB 파일 포맷 문제로 복합체를 표시하지 못했습니다.";
  }
}

function renderCatalogOptions() {
  const options = state.catalog.map((gene) => {
    const option = document.createElement("option");
    option.value = gene.id;
    option.textContent = `${gene.id} | ${gene.uniprotDescription} | ${gene.uniprotAccession}`;
    return option;
  });
  el.select.replaceChildren(...options);
}

function setupFlowInteractions() {
  const pipelineRoot = document.querySelector(".pipeline-grid");
  if (!pipelineRoot) return;

  pipelineRoot.addEventListener("mouseover", (event) => {
    if (state.pinnedFlowIndex !== null) return;
    const token = event.target.closest(".flow-token[data-flow-index]");
    if (!token || !pipelineRoot.contains(token)) return;
    highlightFlow(Number(token.dataset.flowIndex));
  });

  pipelineRoot.addEventListener("mouseleave", () => {
    if (state.pinnedFlowIndex !== null) return;
    clearFlowHighlight();
  });

  pipelineRoot.addEventListener("click", (event) => {
    const token = event.target.closest(".flow-token[data-flow-index]");
    if (!token || !pipelineRoot.contains(token)) return;
    const index = Number(token.dataset.flowIndex);
    if (state.pinnedFlowIndex === index) {
      resetFlowFocus();
      return;
    }
    state.pinnedFlowIndex = index;
    highlightFlow(index);
  });

  document.addEventListener("click", (event) => {
    const token = event.target.closest(".flow-token[data-flow-index]");
    if (token) return;
    if (state.pinnedFlowIndex !== null) {
      resetFlowFocus();
    }
  });
}

async function onGeneChange() {
  const gene = state.catalog.find((item) => item.id === el.select.value);
  if (!gene) return;

  state.currentGene = gene;
  const requestToken = ++state.requestToken;

  setPipelineLoading(gene);
  setInsightsLoading(gene);
  renderSourceLinks(gene);

  const cdsPromise = fetchCds(gene)
    .then((cds) => {
      if (!currentRequestIs(requestToken)) return;
      renderPipeline(gene, cds);
    })
    .catch((error) => {
      console.error(error);
      if (!currentRequestIs(requestToken)) return;
      const message = "CDS 로딩 실패: Ensembl 응답을 확인하세요.";
      el.dnaMeta.textContent = message;
      el.mrnaMeta.textContent = message;
      el.codonMeta.textContent = message;
      el.aaMeta.textContent = message;
      el.dnaSeq.textContent = message;
      el.mrnaSeq.textContent = message;
      el.aaSeq.textContent = message;
      el.codonGrid.replaceChildren();
      el.dnaFlow.replaceChildren();
      el.mrnaFlow.replaceChildren();
      el.aaFlow.replaceChildren();
    });

  const insightPromise = fetchBioInsights(gene.uniprotAccession)
    .then((insights) => {
      if (!currentRequestIs(requestToken)) return;
      renderInsights(gene, insights);
    })
    .catch((error) => {
      console.error(error);
      if (!currentRequestIs(requestToken)) return;
      el.insightMeta.textContent = "기능/상호작용 정보를 불러오지 못했습니다.";
      renderTextList(el.functionList, [], "정보를 가져오지 못했습니다.");
      renderTextList(el.locationList, [], "정보를 가져오지 못했습니다.");
      renderTextList(el.pathwayList, [], "정보를 가져오지 못했습니다.");
      renderInteractionMessage("상호작용 정보를 가져오지 못했습니다.");
    });

  const structurePromise = loadStructure(gene, requestToken);

  await Promise.allSettled([cdsPromise, insightPromise, structurePromise]);
}

function setupEvents() {
  el.select.addEventListener("change", onGeneChange);
  setupFlowInteractions();
  setupGameEvents();

  el.interactionList.addEventListener("click", (event) => {
    const button = event.target.closest(".interaction-btn[data-partner-accession]");
    if (!button || !state.currentGene) return;

    const partnerAccession = button.dataset.partnerAccession;
    if (!partnerAccession) return;

    const partnerGene = button.dataset.partnerGene || partnerAccession;
    const requestToken = ++state.requestToken;
    loadInteractionComplex(state.currentGene, partnerAccession, partnerGene, requestToken);
  });

  el.reloadBtn.addEventListener("click", () => {
    if (!state.currentGene) return;

    const requestToken = ++state.requestToken;
    state.structureMode = "alphafold";
    state.complexContext = null;
    loadStructure(state.currentGene, requestToken);
  });
}

function setCatalogMeta() {
  const count = state.catalog.length;
  const heavy = state.catalog.filter((g) => g.proteinLength > LONG_PROTEIN_THRESHOLD).length;

  el.catalogMeta.textContent =
    `검증된 인간 유전자 ${count}개를 제공합니다. (${heavy}개는 긴 단백질이라 3D 로딩이 느릴 수 있음)`;
}

async function init() {
  try {
    state.catalog = await fetchCatalog();
    renderCatalogOptions();
    setCatalogMeta();
    setupEvents();

    if (state.catalog.length > 0) {
      el.select.value = state.catalog[0].id;
      onGeneChange();
    }
  } catch (error) {
    console.error(error);
    const message = "앱 초기화 실패: genes.json 또는 네트워크를 확인하세요.";

    el.catalogMeta.textContent = message;
    el.geneSummary.textContent = message;
    el.dnaMeta.textContent = message;
    el.mrnaMeta.textContent = message;
    el.codonMeta.textContent = message;
    el.aaMeta.textContent = message;
    el.insightMeta.textContent = message;
    renderTextList(el.functionList, [], message);
    renderTextList(el.locationList, [], message);
    renderTextList(el.pathwayList, [], message);
    renderInteractionMessage(message);
    el.foldMeta.textContent = message;
  }
}

init();
