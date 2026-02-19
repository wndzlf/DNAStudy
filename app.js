const CATALOG_PATH = "./genes.json";
const CODON_PREVIEW_COUNT = 30;
const LONG_PROTEIN_THRESHOLD = 1300;

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
  resizeObserver: null
};

const el = {
  select: document.getElementById("gene-select"),
  catalogMeta: document.getElementById("catalog-meta"),
  geneSummary: document.getElementById("gene-summary"),
  dnaMeta: document.getElementById("dna-meta"),
  dnaSeq: document.getElementById("dna-seq"),
  mrnaMeta: document.getElementById("mrna-meta"),
  mrnaSeq: document.getElementById("mrna-seq"),
  codonMeta: document.getElementById("codon-meta"),
  codonGrid: document.getElementById("codon-grid"),
  aaMeta: document.getElementById("aa-meta"),
  aaSeq: document.getElementById("aa-seq"),
  foldMeta: document.getElementById("fold-meta"),
  foldHint: document.getElementById("fold-hint"),
  sourceLinks: document.getElementById("source-links"),
  reloadBtn: document.getElementById("reload-structure"),
  viewerShell: document.getElementById("viewer-shell")
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

function setPipelineLoading(gene) {
  const stableTranscriptId = stripTranscriptVersion(gene.transcriptId);
  const predictedCodons = Math.floor((gene.cdsLength || 0) / 3);

  el.geneSummary.textContent = `${gene.id}: ${gene.functionNote}`;
  el.dnaMeta.textContent = `CDS 로딩 중... Transcript ${gene.transcriptId} | Ensembl gene ${gene.ensemblGeneId}`;
  el.mrnaMeta.textContent = `전사 단계 준비 중... 예상 mRNA 길이 약 ${gene.cdsLength} nt`;
  el.codonMeta.textContent = `번역 프레임 준비 중... 예상 코돈 수 약 ${predictedCodons}개`;
  el.aaMeta.textContent = `아미노산 서열 계산 전... (선택된 transcript: ${stableTranscriptId})`;

  el.dnaSeq.textContent = "DNA CDS를 가져오는 중...";
  el.mrnaSeq.textContent = "mRNA를 계산하는 중...";
  el.aaSeq.textContent = "번역 결과를 계산하는 중...";

  el.codonGrid.replaceChildren();
}

function renderPipeline(gene, dnaRaw) {
  const dna = sanitizeDna(dnaRaw);
  if (!dna) {
    throw new Error("유효한 CDS DNA 서열을 가져오지 못했습니다.");
  }

  const mrna = dna.replaceAll("T", "U");
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
    `CDS 길이 ${dna.length} nt | 시작코돈 ${startCodon} | 마지막 3nt ${stopCodon} | Transcript ${gene.transcriptId}`;

  el.mrnaMeta.textContent =
    `mRNA 길이 ${mrna.length} nt. 교육용 단순화: coding strand의 T를 U로 치환하여 표시.`;

  el.codonMeta.textContent =
    `총 ${codons.length}개 코돈(5' -> 3'). 아래에 앞 ${shownCodonCount}개를 표시합니다.`;

  el.aaMeta.textContent =
    `번역 결과 ${protein.length} aa, stop codon ${stopCount}개. canonical CDS에서는 보통 마지막에 1개 존재.`;

  el.dnaSeq.textContent = formatSequence(dna);
  el.mrnaSeq.textContent = formatSequence(mrna);
  el.aaSeq.textContent = formatAminoAcids(protein);

  el.codonGrid.replaceChildren();
  codons.slice(0, CODON_PREVIEW_COUNT).forEach((codon, idx) => {
    const chip = document.createElement("div");
    chip.className = "codon-chip";
    chip.textContent = `${idx + 1}. ${codon}\n-> ${aaList[idx]}`;
    el.codonGrid.appendChild(chip);
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

async function loadStructure(gene, requestToken) {
  const viewer = ensureViewer();

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
  } catch (error) {
    console.error(error);
    if (!currentRequestIs(requestToken)) return;
    el.foldMeta.textContent = "구조 로딩 실패: 네트워크 상태를 확인하고 다시 시도하세요.";
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

async function onGeneChange() {
  const gene = state.catalog.find((item) => item.id === el.select.value);
  if (!gene) return;

  state.currentGene = gene;
  const requestToken = ++state.requestToken;

  setPipelineLoading(gene);
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
    });

  const structurePromise = loadStructure(gene, requestToken);

  await Promise.allSettled([cdsPromise, structurePromise]);
}

function setupEvents() {
  el.select.addEventListener("change", onGeneChange);

  el.reloadBtn.addEventListener("click", () => {
    if (!state.currentGene) return;

    state.alphaFoldCache.delete(state.currentGene.uniprotAccession);
    const requestToken = ++state.requestToken;
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
    el.foldMeta.textContent = message;
  }
}

init();
