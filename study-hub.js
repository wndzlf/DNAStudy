const SOURCE_BASE = "https://compgenomr.github.io/book";
const RAW_BASE = "https://raw.githubusercontent.com/compgenomr/book/master";

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
    status: "ready",
    subtitle:
      "유전체 데이터 분석을 R로 재현 가능하게 수행하는 기본기(데이터 구조, 입출력, 시각화, 함수)를 다룹니다."
  },
  {
    number: 3,
    title: "Statistics for Genomics",
    path: "stats.html",
    status: "ready",
    subtitle:
      "분포, 추정, 가설검정, 다중검정, 선형모형을 통해 유전체 데이터의 신호와 노이즈를 분리하는 통계 기초를 정리합니다."
  },
  {
    number: 4,
    title: "Exploratory Data Analysis with Unsupervised Machine Learning",
    path: "unsupervisedLearning.html",
    status: "ready",
    subtitle:
      "라벨 없이 구조를 찾는 클러스터링과 차원축소(PCA, MDS, t-SNE)의 해석 관점을 학습합니다."
  },
  {
    number: 5,
    title: "Predictive Modeling with Supervised Machine Learning",
    path: "supervisedLearning.html",
    status: "ready",
    subtitle:
      "학습/검증 분리, 전처리, 모델 학습, 성능평가(ROC, confusion matrix)로 예측 모델링 전 과정을 다룹니다."
  },
  {
    number: 6,
    title: "Operations on Genomic Intervals and Genome Arithmetic",
    path: "genomicIntervals.html",
    status: "ready",
    subtitle:
      "GRanges 기반으로 유전체 구간의 겹침, 거리, 집계, 요약 객체를 다루는 실무형 연산을 익힙니다."
  },
  {
    number: 7,
    title: "Quality Check, Processing and Alignment of High-throughput Sequencing Reads",
    path: "processingReads.html",
    status: "ready",
    subtitle:
      "FASTQ 품질 확인부터 trimming/filtering, 정렬(alignment)까지 read-level 전처리 파이프라인을 정리합니다."
  },
  {
    number: 8,
    title: "RNA-seq Analysis",
    path: "rnaseqanalysis.html",
    status: "ready",
    subtitle:
      "정량화/정규화, 탐색 분석, 차등발현, 기능 풍부도 분석까지 RNA-seq 분석 핵심 워크플로를 다룹니다."
  },
  {
    number: 9,
    title: "ChIP-seq analysis",
    path: "chipseq.html",
    status: "ready",
    subtitle:
      "단백질-DNA 결합 분석에서 실험 설계 품질요인과 매핑/QC/피크 해석의 핵심 포인트를 정리합니다."
  },
  {
    number: 10,
    title: "DNA methylation analysis using bisulfite sequencing data",
    path: "bsseq.html",
    status: "ready",
    subtitle:
      "메틸레이션 데이터의 QC, 필터링, 차등메틸화, 세그멘테이션, 주석화까지 전체 흐름을 다룹니다."
  },
  {
    number: 11,
    title: "Multi-omics Analysis",
    path: "multiomics.html",
    status: "ready",
    subtitle:
      "여러 omics를 잠재요인(latent factor)으로 통합해 하위군집과 생물학적 해석을 연결하는 방법을 학습합니다."
  }
];

const RMD_BY_CHAPTER = {
  1: "01-intro2Genomics.Rmd",
  2: "02-intro2R.Rmd",
  3: "03-StatsForGenomics.Rmd",
  4: "04-unsupervisedLearning.Rmd",
  5: "05-supervisedLearning.Rmd",
  6: "06-genomicIntervals.Rmd",
  7: "07-Read_Processing.Rmd",
  8: "08-rna-seq-analysis.Rmd",
  9: "09-chip-seq-analysis.Rmd",
  10: "10-bs-seq-analysis.Rmd",
  11: "11-multiomics-analysis.Rmd"
};

const CHAPTER_LESSONS = {
  2: {
    summary:
      "유전체 분석 업무를 R로 시작할 때 필요한 분석 단계, 자료구조, 패키지 설치, 입출력, 시각화, 함수 작성 습관을 체계적으로 소개합니다.",
    goals: [
      "분석 전체 흐름(수집 -> QC -> 처리 -> 탐색/모델링 -> 보고)을 한 번에 그릴 수 있다.",
      "R의 핵심 자료구조(vector, matrix, data.frame, list, factor)를 데이터 성격에 맞게 선택할 수 있다.",
      "CRAN/Bioconductor 패키지와 도움말 체계를 활용해 재현 가능한 분석 스크립트를 만든다."
    ],
    sections: [
      {
        title: "2.1 Steps of genomic data analysis",
        desc: "데이터 수집부터 최종 보고까지의 표준 파이프라인을 정의합니다."
      },
      {
        title: "2.2 Getting started with R",
        desc: "패키지 설치, 도움말 검색, 실습 환경 설정을 다룹니다."
      },
      {
        title: "2.4 Data structures / 2.5 Data types",
        desc: "자료구조 선택이 이후 분석 효율과 오류율을 크게 좌우합니다."
      },
      {
        title: "2.6 Reading and writing data",
        desc: "텍스트/객체 파일 입출력과 대용량 데이터 처리 전략을 소개합니다."
      },
      {
        title: "2.7~2.9 Plotting / Functions",
        desc: "시각화와 사용자 정의 함수로 분석 자동화를 시작합니다."
      }
    ],
    terms: ["CRAN", "Bioconductor", "data.frame", "factor", "ggplot2", "reproducibility"],
    visual: {
      kind: "workflow",
      title: "R 기반 유전체 분석 워크플로",
      note: "단계를 클릭하면 해당 단계에서 자주 쓰는 R 객체/함수 포인트가 바뀝니다.",
      stages: [
        { label: "Data Collection", focus: "FASTQ/BED/count table 수집", tools: "readr, data.table" },
        { label: "QC & Cleaning", focus: "결측/이상치/품질 검토", tools: "summary, dplyr, plot" },
        { label: "Processing", focus: "정규화/변환/피처 선택", tools: "matrix 연산, scale" },
        { label: "EDA & Modeling", focus: "패턴 탐색과 모델 학습", tools: "stats, caret, ggplot2" },
        { label: "Reporting", focus: "결과 재현/공유", tools: "R Markdown, script" }
      ]
    },
    study: {
      pace: "권장 45~60분",
      path: [
        { title: "개념 읽기", minutes: 12, action: "2.1~2.2를 읽고 분석 단계 흐름을 그려본다." },
        { title: "자료구조 정리", minutes: 12, action: "vector/matrix/data.frame/list 차이를 예제로 정리한다." },
        { title: "시각화 확인", minutes: 10, action: "워크플로 단계 버튼을 눌러 도구 포인트를 비교한다." },
        { title: "손코딩", minutes: 12, action: "csv 입력 -> data.frame 변환 -> plot 출력 스크립트를 작성한다." }
      ],
      checklist: [
        "분석 단계 5단계를 순서대로 설명할 수 있다.",
        "data.frame과 matrix의 차이를 실제 코드로 보여줄 수 있다.",
        "CRAN/Bioconductor 패키지 설치 명령을 구분해 기억한다."
      ],
      quiz: [
        {
          question: "유전체 count table을 샘플 x 변수 형태로 다루고, 열 이름/형태가 섞인 데이터를 정리할 때 가장 기본이 되는 구조는?",
          choices: ["vector", "data.frame", "factor", "array"],
          answer: 1,
          explanation: "data.frame은 열별 자료형을 유지하면서 표 형식 데이터를 다루기 좋습니다."
        },
        {
          question: "재현 가능한 분석 보고를 위해 가장 직접적인 출력 방식은?",
          choices: ["스크린샷만 저장", "코드와 결과를 한 문서로 묶기", "결과 숫자만 수기로 정리", "그래프만 저장"],
          answer: 1,
          explanation: "코드+설명+결과를 함께 남겨야 재현성과 협업성이 올라갑니다."
        }
      ]
    }
  },
  3: {
    summary:
      "유전체 데이터 해석에 필요한 통계 핵심(분포, 신뢰구간, 검정, 회귀, 다중검정 보정)을 실제 분석 문맥에 맞게 연결합니다.",
    goals: [
      "평균/중앙값/분산/신뢰구간의 역할을 데이터 맥락에서 설명할 수 있다.",
      "두 집단 비교에서 randomization, t-test, 다중검정 보정을 구분해 적용할 수 있다.",
      "선형모형과 상관의 차이를 이해하고 회귀 결과를 과해석하지 않는다."
    ],
    sections: [
      {
        title: "3.1 Statistical distributions",
        desc: "중심 경향과 퍼짐으로 데이터를 요약하는 기본 언어를 학습합니다."
      },
      {
        title: "3.1.3 Confidence intervals",
        desc: "추정치의 불확실성을 구간으로 표현해 의사결정을 안정화합니다."
      },
      {
        title: "3.2 Testing between samples",
        desc: "무작위화 검정, t-test, 다중비교 보정 흐름을 비교합니다."
      },
      {
        title: "3.2.4 Moderated t-tests",
        desc: "유전자 단위 분산 추정 안정화(shrinkage) 개념을 다룹니다."
      },
      {
        title: "3.3 Linear models and correlation",
        desc: "연속 변수 관계를 모델링하고 계수/오차를 해석합니다."
      }
    ],
    terms: ["mean", "variance", "confidence interval", "t-test", "FDR", "linear model"],
    visual: {
      kind: "distribution",
      title: "분포와 임계값 해석",
      note: "평균과 표준편차를 바꾸면 분포 모양과 tail 확률이 어떻게 변하는지 확인합니다."
    },
    study: {
      pace: "권장 50~70분",
      path: [
        { title: "핵심 개념 읽기", minutes: 15, action: "중심 경향/분산/신뢰구간 개념을 먼저 정리한다." },
        { title: "시각화 조작", minutes: 12, action: "μ, σ를 바꿔 tail 확률이 어떻게 달라지는지 기록한다." },
        { title: "검정 흐름 정리", minutes: 12, action: "randomization vs t-test vs FDR 흐름을 한 장 표로 만든다." },
        { title: "해석 연습", minutes: 15, action: "예시 결과를 보고 '유의성'과 '효과크기'를 분리해 설명한다." }
      ],
      checklist: [
        "신뢰구간이 p-value와 다른 정보를 주는 이유를 설명할 수 있다.",
        "다중검정 보정이 필요한 상황을 예시로 말할 수 있다.",
        "상관계수와 인과관계를 혼동하지 않는다."
      ],
      quiz: [
        {
          question: "수천 개 유전자에서 동시에 검정을 수행할 때 반드시 고려해야 하는 것은?",
          choices: ["표본 수를 무조건 늘리기", "다중검정 보정(FDR 등)", "평균만 비교하기", "시각화 생략"],
          answer: 1,
          explanation: "동시 검정에서는 거짓양성 증가를 막기 위해 다중검정 보정이 필요합니다."
        },
        {
          question: "신뢰구간(Confidence Interval)의 주된 목적은?",
          choices: ["정답 하나를 확정", "추정치의 불확실성 범위 표현", "표본 수 계산 대체", "모형 선택 자동화"],
          answer: 1,
          explanation: "신뢰구간은 추정치 주변의 불확실성 범위를 제공합니다."
        }
      ]
    }
  },
  4: {
    summary:
      "라벨이 없는 오믹스 데이터를 탐색할 때 중요한 거리/클러스터링/차원축소 선택 기준과 해석 함정을 정리합니다.",
    goals: [
      "거리 지표가 군집 결과를 왜 바꾸는지 설명할 수 있다.",
      "hierarchical clustering과 k-means의 장단점을 구분한다.",
      "PCA/t-SNE/MDS 결과를 시각적으로 보고 과적합 해석을 피한다."
    ],
    sections: [
      {
        title: "4.1 Clustering",
        desc: "샘플 유사도를 기반으로 그룹 구조를 탐색합니다."
      },
      {
        title: "4.1.1 Distance metrics",
        desc: "거리 정의(Euclidean 등)에 따라 군집 경계가 달라집니다."
      },
      {
        title: "4.1.4 Choosing k",
        desc: "gap statistic 등으로 군집 수를 데이터 기반으로 선택합니다."
      },
      {
        title: "4.2 Dimensionality reduction",
        desc: "고차원 데이터를 2D/3D로 압축해 구조를 파악합니다."
      },
      {
        title: "4.2.1~4.2.4 PCA/MDS/t-SNE",
        desc: "기법별 목표와 해석 가능한 신호 범위를 비교합니다."
      }
    ],
    terms: ["distance metric", "k-means", "hierarchical", "PCA", "t-SNE", "gap statistic"],
    visual: {
      kind: "clustering",
      title: "k 값에 따른 군집 분할",
      note: "k를 바꾸면서 같은 데이터가 어떻게 다른 그룹 구조로 보이는지 확인합니다."
    },
    study: {
      pace: "권장 45~60분",
      path: [
        { title: "거리/유사도 복습", minutes: 10, action: "distance metric이 결과를 바꾸는 이유를 먼저 이해한다." },
        { title: "k 조절 실습", minutes: 12, action: "시각화에서 k를 바꿔 inertia와 군집 경계를 비교한다." },
        { title: "PCA/MDS/t-SNE 비교", minutes: 12, action: "각 기법이 보존하는 정보와 한계를 정리한다." },
        { title: "해석 노트 작성", minutes: 12, action: "클러스터 의미를 생물학 변수와 연결해 가설을 1개 만든다." }
      ],
      checklist: [
        "k를 키웠을 때 무조건 좋은 모델이 아님을 설명할 수 있다.",
        "PCA와 t-SNE의 목적 차이를 말할 수 있다.",
        "군집 결과를 반드시 외부 생물학 정보로 검증해야 함을 이해한다."
      ],
      quiz: [
        {
          question: "k-means에서 k를 계속 키우면 inertia는 일반적으로 어떻게 되나?",
          choices: ["증가한다", "감소하거나 유지된다", "항상 동일하다", "무작위로 바뀐다"],
          answer: 1,
          explanation: "클러스터 수가 늘면 각 점과 중심 간 제곱거리 합(inertia)은 줄어드는 방향입니다."
        },
        {
          question: "t-SNE 해석에서 가장 주의할 점은?",
          choices: ["축의 절대값 자체를 생물학 변수처럼 해석", "근접 이웃 구조 중심으로 해석", "표본 수와 무관하게 항상 안정", "거리 보존이 PCA보다 항상 우수"],
          answer: 1,
          explanation: "t-SNE는 지역 구조 보존에 강점이 있어 전역 거리 해석은 신중해야 합니다."
        }
      ]
    }
  },
  5: {
    summary:
      "지도학습에서 전처리, 데이터 분할, 학습, 평가를 한 사이클로 보고, 예측 성능을 신뢰할 수 있게 만드는 절차를 익힙니다.",
    goals: [
      "학습/검증/테스트 분리를 통해 과대평가를 피할 수 있다.",
      "전처리(스케일링, 결측치 처리, 상관 제거)가 모델에 미치는 영향을 이해한다.",
      "confusion matrix와 ROC를 함께 보고 모델 품질을 균형 있게 판단한다."
    ],
    sections: [
      {
        title: "5.1~5.2 ML setup",
        desc: "통계 추론과 예측 중심 ML의 목적 차이를 짚습니다."
      },
      {
        title: "5.3 Use case (disease subtype)",
        desc: "유전체 데이터로 실제 분류 문제를 구성합니다."
      },
      {
        title: "5.4 Data preprocessing",
        desc: "변환/필터링/결측치 처리가 모델 안정성을 좌우합니다."
      },
      {
        title: "5.5 Splitting",
        desc: "holdout, cross-validation, bootstrap 전략을 비교합니다."
      },
      {
        title: "5.7 Performance assessment",
        desc: "정확도 외에 ROC/AUC와 오류 유형을 함께 해석합니다."
      }
    ],
    terms: ["train/test split", "cross-validation", "k-NN", "confusion matrix", "ROC", "AUC"],
    visual: {
      kind: "classification",
      title: "임계값에 따른 분류 성능 변화",
      note: "threshold를 조절해 TP/FP/FN/TN이 어떻게 바뀌는지 확인합니다."
    },
    study: {
      pace: "권장 55~75분",
      path: [
        { title: "문제 정의", minutes: 12, action: "예측 타깃, 입력 피처, 성능 지표를 먼저 정의한다." },
        { title: "전처리 점검", minutes: 15, action: "스케일링/결측치/상관 제거 이유를 사례로 정리한다." },
        { title: "임계값 실습", minutes: 12, action: "시각화에서 threshold를 바꿔 confusion matrix 변화를 본다." },
        { title: "성능 해석", minutes: 15, action: "accuracy/precision/recall trade-off를 상황별로 해석한다." }
      ],
      checklist: [
        "훈련/검증/테스트 분리의 목적을 설명할 수 있다.",
        "accuracy가 높아도 recall이 낮으면 위험할 수 있음을 이해한다.",
        "ROC/AUC를 임계값 민감도와 함께 읽을 수 있다."
      ],
      quiz: [
        {
          question: "의료 스크리닝처럼 놓치면 위험한 문제에서 보통 우선 고려하는 지표는?",
          choices: ["Recall(민감도)", "Specificity만", "학습 시간", "모델 파라미터 수"],
          answer: 0,
          explanation: "위양성보다 위음성(놓침) 비용이 큰 경우 recall을 우선 관리하는 경우가 많습니다."
        },
        {
          question: "테스트셋을 반복적으로 모델 튜닝에 쓰면 생길 수 있는 문제는?",
          choices: ["모델이 더 일반화됨", "데이터 누수/성능 과대평가", "학습 속도 증가", "클래스 불균형 자동 보정"],
          answer: 1,
          explanation: "테스트셋은 최종 평가 전용이어야 하며 반복 튜닝에 쓰면 과대적합된 평가가 됩니다."
        }
      ]
    }
  },
  6: {
    summary:
      "유전체 좌표 기반 분석의 핵심인 interval 연산(겹침, 최근접 거리, read 카운팅, 요약 객체)을 실무 시나리오로 정리합니다.",
    goals: [
      "GRanges로 유전체 구간과 메타데이터를 일관되게 다룰 수 있다.",
      "overlap/nearest 연산으로 기능적 연관 구간을 찾을 수 있다.",
      "SummarizedExperiment로 구간+정량값을 통합 관리한다."
    ],
    sections: [
      {
        title: "6.1 GRanges fundamentals",
        desc: "유전체 구간 객체 생성/조작과 메타데이터 붙이기를 다룹니다."
      },
      {
        title: "6.1.2 Import genomic regions",
        desc: "BED/GTF 등 외부 구간 데이터를 R로 가져옵니다."
      },
      {
        title: "6.1.3 Overlap / nearest",
        desc: "구간 겹침과 거리 계산으로 기능적 후보를 좁힙니다."
      },
      {
        title: "6.2 Counting mapped reads",
        desc: "관심 구간별 read 집계를 수행합니다."
      },
      {
        title: "6.4 SummarizedExperiment",
        desc: "assay + annotation + sample metadata를 함께 관리합니다."
      }
    ],
    terms: ["GRanges", "overlap", "nearest", "BAM", "Rle", "SummarizedExperiment"],
    visual: {
      kind: "interval",
      title: "구간 이동에 따른 overlap 변화",
      note: "Track B를 이동시켜 Track A와 겹치는 길이가 어떻게 달라지는지 확인합니다."
    }
  },
  7: {
    summary:
      "시퀀싱 read를 분석 가능한 형태로 만들기 위한 품질 진단, trimming/filtering, 정렬 단계를 문제 원인 중심으로 정리합니다.",
    goals: [
      "FASTQ 품질 지표(per-base quality/content)를 읽고 품질 이슈를 진단한다.",
      "trimming/filtering 파라미터를 데이터 특성에 맞게 조절한다.",
      "alignment 전후 체크포인트를 만들어 downstream 오류를 줄인다."
    ],
    sections: [
      {
        title: "7.1 FASTA and FASTQ",
        desc: "서열/품질 정보 포맷을 구분하고 필드를 해석합니다."
      },
      {
        title: "7.2 Quality check",
        desc: "per-cycle 품질과 염기 조성 편향을 점검합니다."
      },
      {
        title: "7.3 Filtering and trimming",
        desc: "저품질 구간/어댑터 제거 전략을 다룹니다."
      },
      {
        title: "7.4 Mapping / alignment",
        desc: "참조 유전체 정렬과 지표 확인 절차를 학습합니다."
      },
      {
        title: "7.5 Duplicate and summary checks",
        desc: "중복률/커버리지 등 핵심 QC를 통합적으로 봅니다."
      }
    ],
    terms: ["FASTQ", "Phred score", "trimming", "adapter", "alignment", "duplicate rate"],
    visual: {
      kind: "quality",
      title: "per-cycle quality와 trim threshold",
      note: "품질 임계값을 움직이며 유지되는 read 길이(usable cycle)를 확인합니다."
    }
  },
  8: {
    summary:
      "RNA-seq 분석에서 정량화부터 차등발현, 기능 풍부도, 추가 변이요인 보정까지 실무에서 자주 겪는 의사결정 포인트를 다룹니다.",
    goals: [
      "정량화/정규화(TPM/RPKM/size factor)의 목적 차이를 설명할 수 있다.",
      "탐색 분석(PCA, clustering)으로 배치효과/이상 샘플을 탐지한다.",
      "차등발현 결과를 volcano/enrichment와 연결해 생물학적 가설로 확장한다."
    ],
    sections: [
      {
        title: "8.1 Gene expression concepts",
        desc: "발현량 측정의 단위와 해석 전제를 정리합니다."
      },
      {
        title: "8.3 Processing/Alignment/Quantification",
        desc: "raw read에서 count table까지의 처리 단계를 연결합니다."
      },
      {
        title: "8.4 Normalization schemes",
        desc: "샘플 간 비교 가능하도록 스케일을 맞춥니다."
      },
      {
        title: "8.5 Differential expression",
        desc: "조건 간 변화 유전자를 통계적으로 판별합니다."
      },
      {
        title: "8.6 Functional enrichment / unwanted variation",
        desc: "결과 해석과 교란요인 보정을 함께 수행합니다."
      }
    ],
    terms: ["TPM", "RPKM", "DESeq2", "log2 fold change", "adjusted p-value", "enrichment"],
    visual: {
      kind: "volcano",
      title: "Volcano plot 임계값 탐색",
      note: "|log2FC|와 -log10(p) 컷오프를 조절하며 up/down gene 수 변화를 확인합니다."
    }
  },
  9: {
    summary:
      "ChIP-seq는 실험 품질과 분석 품질이 강하게 연결됩니다. 항체 특이성, 깊이, 중복, 대조군 설계가 결과를 어떻게 바꾸는지 학습합니다.",
    goals: [
      "실험 설계 요인(antibody, depth, replicate, control)이 peak 품질에 미치는 영향을 이해한다.",
      "매핑 후 샘플 간 유사도/클러스터링으로 QC 문제를 조기에 찾는다.",
      "enrichment threshold 기반으로 peak 해석 민감도를 점검한다."
    ],
    sections: [
      {
        title: "9.1 Regulatory protein-DNA interactions",
        desc: "결합 신호가 어떤 생물학적 질문과 연결되는지 정리합니다."
      },
      {
        title: "9.2 ChIP-seq experiment",
        desc: "실험 단계와 시퀀싱 기반 정량 원리를 복습합니다."
      },
      {
        title: "9.3 Quality factors",
        desc: "항체 특이성/깊이/중복/replicate/control의 영향을 비교합니다."
      },
      {
        title: "9.4 Pre-processing",
        desc: "매핑과 초기 필터링 품질 체크를 수행합니다."
      },
      {
        title: "9.5 ChIP quality control",
        desc: "샘플 간 상관/클러스터링으로 데이터 신뢰도를 진단합니다."
      }
    ],
    terms: ["peak", "control input", "sequencing depth", "PCR duplicate", "replicate", "enrichment"],
    visual: {
      kind: "chippeaks",
      title: "Enrichment threshold와 peak 개수",
      note: "fold-enrichment 기준을 바꾸면 검출 peak 수와 구간이 어떻게 바뀌는지 확인합니다."
    }
  },
  10: {
    summary:
      "bisulfite sequencing 기반 메틸레이션 분석의 전 과정(호출 파일 처리, QC, DMR 추출, 세그멘테이션, 주석화)을 실습 관점으로 연결합니다.",
    goals: [
      "메틸레이션 측정 원리와 beta value 해석을 이해한다.",
      "샘플 통합/필터링/PCA로 품질과 배치 구조를 점검한다.",
      "DMR/세그멘트 결과를 유전자 주석과 연결해 해석한다."
    ],
    sections: [
      {
        title: "10.1 DNA methylation basics",
        desc: "메틸레이션의 설정과 측정 원리를 설명합니다."
      },
      {
        title: "10.3 Processing raw data",
        desc: "호출 파일을 읽어 분석 가능한 객체로 변환합니다."
      },
      {
        title: "10.4 Filtering and exploratory analysis",
        desc: "Coverage/SNP/샘플 구조 필터링을 적용합니다."
      },
      {
        title: "10.5 Differential methylation / segmentation",
        desc: "차등 메틸레이션과 구간 분할로 신호를 추출합니다."
      },
      {
        title: "10.6 Annotation",
        desc: "DMR/DMC를 promoter/exon/intron 등 기능 구간에 매핑합니다."
      }
    ],
    terms: ["bisulfite", "beta value", "DMC", "DMR", "segmentation", "annotation"],
    visual: {
      kind: "methylation",
      title: "집단 간 methylation heatmap",
      note: "delta threshold를 조절해 차등 메틸레이션(후보 DMR) 개수를 확인합니다."
    }
  },
  11: {
    summary:
      "multi-omics 통합 분석에서 잠재요인 기반 접근(MFA, JNMF, iCluster)을 통해 하위아형과 기능 해석을 연결하는 구조를 다룹니다.",
    goals: [
      "서로 다른 omics 스케일을 맞추고 통합할 때 필요한 전처리 논리를 이해한다.",
      "잠재요인 기반 통합(MFA/JNMF/iCluster)의 공통점과 차이를 구분한다.",
      "latent factor를 군집/생물학 해석과 연결해 스토리를 만든다."
    ],
    sections: [
      {
        title: "11.1 Multi-omics use case",
        desc: "colorectal cancer 데이터로 통합 분석 입력을 구성합니다."
      },
      {
        title: "11.2 Latent variable models",
        desc: "여러 데이터층의 공통 구조를 저차원 요인으로 압축합니다."
      },
      {
        title: "11.3 Matrix factorization",
        desc: "MFA/JNMF/iCluster로 통합 좌표를 계산합니다."
      },
      {
        title: "11.4 Clustering with latent factors",
        desc: "잠재공간에서 아형 분리를 안정적으로 수행합니다."
      },
      {
        title: "11.5 Biological interpretation",
        desc: "요인 가중치와 enrichment를 이용해 생물학적 의미를 해석합니다."
      }
    ],
    terms: ["multi-omics", "latent factor", "MFA", "NMF", "iCluster", "integration"],
    visual: {
      kind: "multiomics",
      title: "아형별 omics 기여도 비교",
      note: "서브타입을 바꿔가며 요인별 RNA/CNV/Methylation 기여 구조를 비교합니다."
    }
  }
};

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

const COLOR_SET = ["#61d7ff", "#7cf9b3", "#ffd277", "#ff8e9a", "#bda9ff", "#9ce5ff"];

const el = {
  list: document.getElementById("chapter-list"),
  chapterTag: document.getElementById("chapter-tag"),
  chapterTitle: document.getElementById("chapter-title"),
  chapterSubtitle: document.getElementById("chapter-subtitle"),
  chapter1: document.getElementById("chapter-1-content"),
  chapterDynamic: document.getElementById("chapter-dynamic"),
  expressionBar: document.getElementById("expression-bar"),
  expressionValue: document.getElementById("expression-value"),
  expressionNote: document.getElementById("expression-note"),
  mutationType: document.getElementById("mutation-type"),
  mutationBefore: document.getElementById("mutation-before"),
  mutationAfter: document.getElementById("mutation-after"),
  mutationNote: document.getElementById("mutation-note")
};

let activeChapter = 1;

const VISUAL_DATA = {
  clusteringPoints: generateClusterPoints(),
  classificationSamples: generateClassificationSamples(),
  volcanoGenes: generateVolcanoGenes(),
  chipSignals: generateChipSignals(),
  methylationRows: generateMethylationRows(),
  qualityByCycle: generateQualityCurve()
};

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
  const nodes = CHAPTERS.map((chapter) => {
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

  el.list.replaceChildren(...nodes);
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
  el.chapterSubtitle.textContent = chapter.subtitle || "";

  if (chapter.number === 1) {
    el.chapter1.hidden = false;
    el.chapterDynamic.hidden = true;
    setActivePart("part-11");
  } else {
    el.chapter1.hidden = true;
    el.chapterDynamic.hidden = false;
    renderDynamicChapter(chapter);
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

  window.addEventListener("hashchange", () => {
    const target = chapterFromHash();
    if (target !== activeChapter) {
      setActiveChapter(target, false);
    }
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

function renderDynamicChapter(chapter) {
  const lesson = CHAPTER_LESSONS[chapter.number];

  if (!lesson) {
    const fallback = document.createElement("article");
    fallback.className = "panel lesson-overview";
    fallback.innerHTML = `<h3>콘텐츠 준비 중</h3><p>이 장의 시각화 콘텐츠는 다음 업데이트에서 추가됩니다.</p>`;
    el.chapterDynamic.replaceChildren(fallback);
    return;
  }

  const nodes = [createOverviewPanel(lesson), createSectionsPanel(lesson), createTermsPanel(lesson)];
  const studyPanel = createStudyPanel(chapter, lesson);
  if (studyPanel) nodes.push(studyPanel);
  nodes.push(createVisualPanel(chapter, lesson));
  const quizPanel = createQuizPanel(chapter, lesson);
  if (quizPanel) nodes.push(quizPanel);
  nodes.push(createSourcePanel(chapter, lesson));

  el.chapterDynamic.replaceChildren(...nodes);
}

function createOverviewPanel(lesson) {
  const panel = document.createElement("article");
  panel.className = "panel lesson-overview";

  const h3 = document.createElement("h3");
  h3.textContent = "이 장 요약";

  const summary = document.createElement("p");
  summary.className = "lesson-summary";
  summary.textContent = lesson.summary;

  const sub = document.createElement("h4");
  sub.textContent = "학습 목표";

  const ul = document.createElement("ul");
  ul.className = "goal-list";
  lesson.goals.forEach((goal) => {
    const li = document.createElement("li");
    li.textContent = goal;
    ul.appendChild(li);
  });

  panel.append(h3, summary, sub, ul);
  return panel;
}

function createSectionsPanel(lesson) {
  const panel = document.createElement("article");
  panel.className = "panel lesson-sections";

  const h3 = document.createElement("h3");
  h3.textContent = "핵심 섹션";

  const grid = document.createElement("div");
  grid.className = "lesson-section-grid";

  lesson.sections.forEach((section) => {
    const card = document.createElement("article");
    card.className = "lesson-section-card";

    const title = document.createElement("h4");
    title.textContent = section.title;

    const desc = document.createElement("p");
    desc.textContent = section.desc;

    card.append(title, desc);
    grid.appendChild(card);
  });

  panel.append(h3, grid);
  return panel;
}

function createTermsPanel(lesson) {
  const panel = document.createElement("article");
  panel.className = "panel lesson-terms";

  const h3 = document.createElement("h3");
  h3.textContent = "핵심 용어";

  const wrap = document.createElement("div");
  wrap.className = "term-chip-list";

  lesson.terms.forEach((term) => {
    const chip = document.createElement("span");
    chip.className = "term-chip";
    chip.textContent = term;
    wrap.appendChild(chip);
  });

  panel.append(h3, wrap);
  return panel;
}

function createStudyPanel(chapter, lesson) {
  const study = lesson.study;
  if (!study) return null;

  const panel = document.createElement("article");
  panel.className = "panel lesson-study";

  const head = document.createElement("div");
  head.className = "study-head";

  const h3 = document.createElement("h3");
  h3.textContent = `Chapter ${chapter.number} 스터디 플랜`;

  const pace = document.createElement("p");
  pace.className = "study-kicker";
  pace.textContent = study.pace;

  head.append(h3, pace);

  const pathWrap = document.createElement("div");
  pathWrap.className = "study-path-grid";

  (study.path || []).forEach((step, idx) => {
    const card = document.createElement("article");
    card.className = "study-step-card";
    card.innerHTML = `
      <h4>${idx + 1}. ${step.title}</h4>
      <p class="study-min mono">${step.minutes}분</p>
      <p>${step.action}</p>
    `;
    pathWrap.appendChild(card);
  });

  const checklistWrap = document.createElement("div");
  checklistWrap.className = "study-checklist";

  const checkTitle = document.createElement("h4");
  checkTitle.textContent = "완료 체크";

  const progress = document.createElement("p");
  progress.className = "study-progress mono";

  const checks = document.createElement("div");
  checks.className = "study-check-items";

  const boxes = (study.checklist || []).map((item, idx) => {
    const label = document.createElement("label");
    label.className = "study-check";

    const input = document.createElement("input");
    input.type = "checkbox";
    input.dataset.studyCheck = `${chapter.number}-${idx}`;

    const span = document.createElement("span");
    span.textContent = item;

    input.addEventListener("change", () => {
      label.classList.toggle("is-checked", input.checked);
      updateProgress();
    });

    label.append(input, span);
    checks.appendChild(label);
    return input;
  });

  function updateProgress() {
    const total = boxes.length;
    const done = boxes.filter((box) => box.checked).length;
    progress.textContent = `진행률 ${done}/${total}`;
  }

  updateProgress();
  checklistWrap.append(checkTitle, progress, checks);

  panel.append(head, pathWrap, checklistWrap);
  return panel;
}

function createQuizPanel(chapter, lesson) {
  const quizList = lesson.study?.quiz;
  if (!Array.isArray(quizList) || quizList.length === 0) return null;

  const panel = document.createElement("article");
  panel.className = "panel lesson-quiz";

  const h3 = document.createElement("h3");
  h3.textContent = `Chapter ${chapter.number} 미니퀴즈`;

  const note = document.createElement("p");
  note.className = "viz-note";
  note.textContent = "보기 버튼을 눌러 즉시 정답/해설을 확인할 수 있습니다.";

  const quizGrid = document.createElement("div");
  quizGrid.className = "quiz-grid";

  quizList.forEach((quiz, qIdx) => {
    const card = document.createElement("article");
    card.className = "quiz-card";

    const q = document.createElement("h4");
    q.textContent = `Q${qIdx + 1}. ${quiz.question}`;

    const options = document.createElement("div");
    options.className = "quiz-options";

    const feedback = document.createElement("p");
    feedback.className = "quiz-feedback";

    (quiz.choices || []).forEach((choice, cIdx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "quiz-option";
      btn.textContent = choice;

      btn.addEventListener("click", () => {
        const all = options.querySelectorAll(".quiz-option");
        all.forEach((node, idx) => {
          node.classList.remove("is-correct", "is-wrong");
          if (idx === quiz.answer) node.classList.add("is-correct");
        });

        if (cIdx !== quiz.answer) btn.classList.add("is-wrong");

        const correctText = quiz.choices?.[quiz.answer] || "";
        const result = cIdx === quiz.answer ? "정답" : `오답 (정답: ${correctText})`;
        feedback.textContent = `${result} - ${quiz.explanation}`;
      });

      options.appendChild(btn);
    });

    card.append(q, options, feedback);
    quizGrid.appendChild(card);
  });

  panel.append(h3, note, quizGrid);
  return panel;
}

function createVisualPanel(chapter, lesson) {
  const panel = document.createElement("article");
  panel.className = "panel lesson-visual";

  const head = document.createElement("div");
  head.className = "lesson-visual-head";

  const h3 = document.createElement("h3");
  h3.textContent = `시각화 학습: ${lesson.visual.title}`;

  const note = document.createElement("p");
  note.className = "viz-note";
  note.textContent = lesson.visual.note;

  head.append(h3, note);

  const controls = document.createElement("div");
  controls.className = "lesson-visual-controls";

  const canvas = document.createElement("div");
  canvas.className = "lesson-visual-canvas";

  const metrics = document.createElement("div");
  metrics.className = "lesson-visual-metrics";

  panel.append(head, controls, canvas, metrics);

  renderVisualByKind(lesson.visual.kind, {
    chapter,
    lesson,
    controls,
    canvas,
    metrics
  });

  return panel;
}

function createSourcePanel(chapter, lesson) {
  const panel = document.createElement("article");
  panel.className = "panel chapter-source";

  const h3 = document.createElement("h3");
  h3.textContent = `Chapter ${chapter.number} 출처`;

  const ul = document.createElement("ul");
  ul.className = "source-list";

  const chapterUrl = `${SOURCE_BASE}/${chapter.path}`;
  const rmd = RMD_BY_CHAPTER[chapter.number];
  const rmdUrl = rmd ? `${RAW_BASE}/${rmd}` : null;

  const links = [
    {
      label: "원문 TOC",
      url: `${SOURCE_BASE}/who-is-this-book-for.html#what-will-you-get-out-of-this`
    },
    {
      label: `원문 Chapter ${chapter.number}`,
      url: chapterUrl
    }
  ];

  if (rmdUrl) {
    links.push({ label: `원본 Rmd (${rmd})`, url: rmdUrl });
  }

  links.forEach((item) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = item.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.textContent = item.label;
    li.appendChild(a);
    ul.appendChild(li);
  });

  const note = document.createElement("p");
  note.className = "small-note";
  note.textContent =
    "본 페이지는 원문을 복제하지 않고 학습용으로 재구성한 요약 시각화입니다. CompGenomR 기반 콘텐츠는 CC BY-NC-SA 4.0 조건을 따릅니다.";

  panel.append(h3, ul, note);
  return panel;
}

function renderVisualByKind(kind, mounts) {
  switch (kind) {
    case "workflow":
      renderWorkflowVisual(mounts);
      break;
    case "distribution":
      renderDistributionVisual(mounts);
      break;
    case "clustering":
      renderClusteringVisual(mounts);
      break;
    case "classification":
      renderClassificationVisual(mounts);
      break;
    case "interval":
      renderIntervalVisual(mounts);
      break;
    case "quality":
      renderQualityVisual(mounts);
      break;
    case "volcano":
      renderVolcanoVisual(mounts);
      break;
    case "chippeaks":
      renderChipPeaksVisual(mounts);
      break;
    case "methylation":
      renderMethylationVisual(mounts);
      break;
    case "multiomics":
      renderMultiomicsVisual(mounts);
      break;
    default:
      mounts.canvas.innerHTML = "<p class='viz-note'>시각화 준비 중입니다.</p>";
      mounts.metrics.textContent = "";
  }
}

function renderWorkflowVisual({ lesson, controls, canvas, metrics }) {
  const stages = lesson.visual.stages;
  const controlRow = document.createElement("div");
  controlRow.className = "viz-button-row";

  const map = document.createElement("div");
  map.className = "workflow-map";

  const detail = document.createElement("div");
  detail.className = "workflow-detail";

  let active = 0;

  const stageButtons = stages.map((stage, index) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "viz-toggle-btn";
    btn.textContent = `${index + 1}. ${stage.label}`;
    btn.addEventListener("click", () => {
      active = index;
      update();
    });
    controlRow.appendChild(btn);
    return btn;
  });

  const stageCards = stages.map((stage, index) => {
    const card = document.createElement("article");
    card.className = "workflow-step";

    const title = document.createElement("h4");
    title.textContent = `${index + 1}. ${stage.label}`;

    const focus = document.createElement("p");
    focus.textContent = stage.focus;

    card.append(title, focus);
    map.appendChild(card);
    return card;
  });

  function update() {
    stageButtons.forEach((btn, idx) => {
      btn.classList.toggle("is-active", idx === active);
    });

    stageCards.forEach((card, idx) => {
      card.classList.toggle("is-active", idx === active);
    });

    const stage = stages[active];
    detail.innerHTML = `<p><strong>${stage.label}</strong></p><p>${stage.focus}</p><p class="mono">주요 도구: ${stage.tools}</p>`;
    metrics.textContent = `현재 포커스: ${stage.label}`;
  }

  controls.appendChild(controlRow);
  canvas.append(map, detail);
  update();
}

function renderDistributionVisual({ controls, canvas, metrics }) {
  const meanInput = createRangeControl(controls, {
    label: "평균 (μ)",
    min: -2,
    max: 2,
    step: 0.1,
    value: 0
  });

  const sdInput = createRangeControl(controls, {
    label: "표준편차 (σ)",
    min: 0.6,
    max: 2.4,
    step: 0.1,
    value: 1
  });

  function pdf(x, mean, sd) {
    const z = (x - mean) / sd;
    return Math.exp(-0.5 * z * z) / (sd * Math.sqrt(2 * Math.PI));
  }

  function update() {
    const mean = Number(meanInput.value);
    const sd = Number(sdInput.value);

    const points = [];
    const yMax = pdf(mean, mean, sd);

    for (let i = 0; i <= 240; i += 1) {
      const x = -4 + (8 * i) / 240;
      const y = pdf(x, mean, sd);
      const sx = 36 + ((x + 4) / 8) * 460;
      const sy = 188 - (y / yMax) * 142;
      points.push([sx, sy]);
    }

    const linePath = points.map((p, idx) => `${idx === 0 ? "M" : "L"}${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join(" ");
    const areaPath = `${linePath} L 496 188 L 36 188 Z`;

    const meanX = 36 + ((mean + 4) / 8) * 460;

    let tail = 0;
    for (let x = 1.5; x <= 8; x += 0.01) {
      tail += pdf(x, mean, sd) * 0.01;
    }

    const safeTail = Math.max(0, Math.min(1, tail));

    canvas.innerHTML = `
      <svg class="edu-svg" viewBox="0 0 540 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="정규분포 시각화">
        <rect x="0" y="0" width="540" height="230" fill="rgba(4,11,23,0.7)" rx="12"/>
        <line x1="36" y1="188" x2="496" y2="188" stroke="rgba(200,220,255,0.4)" stroke-width="1"/>
        <line x1="36" y1="36" x2="36" y2="188" stroke="rgba(200,220,255,0.24)" stroke-width="1"/>
        <path d="${areaPath}" fill="rgba(77,231,211,0.22)"/>
        <path d="${linePath}" fill="none" stroke="#67ecda" stroke-width="2.4"/>
        <line x1="${meanX.toFixed(2)}" y1="44" x2="${meanX.toFixed(2)}" y2="188" stroke="#ffd277" stroke-width="2" stroke-dasharray="5 4"/>
        <text x="${(meanX + 6).toFixed(2)}" y="56" fill="#ffe3b3" font-size="12">μ = ${mean.toFixed(1)}</text>
      </svg>
    `;

    metrics.innerHTML = `
      <div class="viz-metric-grid">
        <div><span>μ</span><strong>${mean.toFixed(1)}</strong></div>
        <div><span>σ</span><strong>${sd.toFixed(1)}</strong></div>
        <div><span>P(X &gt; 1.5)</span><strong>${(safeTail * 100).toFixed(2)}%</strong></div>
      </div>
    `;
  }

  meanInput.addEventListener("input", update);
  sdInput.addEventListener("input", update);
  update();
}

function renderClusteringVisual({ controls, canvas, metrics }) {
  const kInput = createRangeControl(controls, {
    label: "클러스터 수 (k)",
    min: 2,
    max: 5,
    step: 1,
    value: 3
  });

  function update() {
    const k = Number(kInput.value);
    const result = runKMeans(VISUAL_DATA.clusteringPoints, k, 10);

    const circles = VISUAL_DATA.clusteringPoints
      .map((point, idx) => {
        const cx = 40 + ((point.x + 4) / 8) * 470;
        const cy = 220 - ((point.y + 4) / 8) * 190;
        const cluster = result.assignments[idx];
        const color = COLOR_SET[cluster % COLOR_SET.length];
        return `<circle cx="${cx.toFixed(2)}" cy="${cy.toFixed(2)}" r="3.2" fill="${color}" opacity="0.9"/>`;
      })
      .join("");

    const centroids = result.centroids
      .map((c, idx) => {
        const x = 40 + ((c.x + 4) / 8) * 470;
        const y = 220 - ((c.y + 4) / 8) * 190;
        const color = COLOR_SET[idx % COLOR_SET.length];
        return `
          <line x1="${(x - 6).toFixed(2)}" y1="${y.toFixed(2)}" x2="${(x + 6).toFixed(2)}" y2="${y.toFixed(2)}" stroke="${color}" stroke-width="2.6"/>
          <line x1="${x.toFixed(2)}" y1="${(y - 6).toFixed(2)}" x2="${x.toFixed(2)}" y2="${(y + 6).toFixed(2)}" stroke="${color}" stroke-width="2.6"/>
        `;
      })
      .join("");

    canvas.innerHTML = `
      <svg class="edu-svg" viewBox="0 0 560 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="k-means 군집화">
        <rect x="0" y="0" width="560" height="260" rx="12" fill="rgba(4,11,23,0.72)"/>
        <line x1="40" y1="220" x2="510" y2="220" stroke="rgba(200,220,255,0.26)"/>
        <line x1="40" y1="30" x2="40" y2="220" stroke="rgba(200,220,255,0.26)"/>
        ${circles}
        ${centroids}
      </svg>
    `;

    metrics.innerHTML = `
      <div class="viz-metric-grid">
        <div><span>k</span><strong>${k}</strong></div>
        <div><span>Inertia</span><strong>${result.inertia.toFixed(2)}</strong></div>
        <div><span>샘플 수</span><strong>${VISUAL_DATA.clusteringPoints.length}</strong></div>
      </div>
    `;
  }

  kInput.addEventListener("input", update);
  update();
}

function renderClassificationVisual({ controls, canvas, metrics }) {
  const thresholdInput = createRangeControl(controls, {
    label: "분류 임계값",
    min: 0.1,
    max: 0.9,
    step: 0.01,
    value: 0.5
  });

  const samples = [...VISUAL_DATA.classificationSamples].sort((a, b) => a.score - b.score);

  function update() {
    const threshold = Number(thresholdInput.value);

    let tp = 0;
    let tn = 0;
    let fp = 0;
    let fn = 0;

    const dots = samples
      .map((sample) => {
        const pred = sample.score >= threshold ? 1 : 0;
        if (sample.label === 1 && pred === 1) tp += 1;
        if (sample.label === 0 && pred === 0) tn += 1;
        if (sample.label === 0 && pred === 1) fp += 1;
        if (sample.label === 1 && pred === 0) fn += 1;

        const x = 40 + sample.score * 470;
        const y = sample.label === 1 ? 68 : 148;
        const fill = pred === 1 ? "#61e8d3" : "#8ca1bf";
        const stroke = pred === sample.label ? "transparent" : "#ff7082";
        return `<circle cx="${x.toFixed(2)}" cy="${y}" r="3.2" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>`;
      })
      .join("");

    const tX = 40 + threshold * 470;

    canvas.innerHTML = `
      <svg class="edu-svg" viewBox="0 0 560 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="분류 임계값 시각화">
        <rect x="0" y="0" width="560" height="210" fill="rgba(4,11,23,0.72)" rx="12"/>
        <line x1="40" y1="180" x2="510" y2="180" stroke="rgba(200,220,255,0.28)"/>
        <line x1="40" y1="32" x2="40" y2="180" stroke="rgba(200,220,255,0.22)"/>
        <line x1="40" y1="68" x2="510" y2="68" stroke="rgba(130,228,200,0.2)"/>
        <line x1="40" y1="148" x2="510" y2="148" stroke="rgba(180,200,235,0.2)"/>
        ${dots}
        <line x1="${tX.toFixed(2)}" y1="34" x2="${tX.toFixed(2)}" y2="180" stroke="#ffd277" stroke-width="2" stroke-dasharray="5 4"/>
        <text x="44" y="58" fill="#8ff4cf" font-size="12">Actual Positive</text>
        <text x="44" y="138" fill="#c9d9f4" font-size="12">Actual Negative</text>
      </svg>
    `;

    const total = tp + tn + fp + fn;
    const accuracy = total ? (tp + tn) / total : 0;
    const precision = tp + fp > 0 ? tp / (tp + fp) : 0;
    const recall = tp + fn > 0 ? tp / (tp + fn) : 0;

    metrics.innerHTML = `
      <div class="viz-matrix-grid">
        <div><span>TP</span><strong>${tp}</strong></div>
        <div><span>FP</span><strong>${fp}</strong></div>
        <div><span>FN</span><strong>${fn}</strong></div>
        <div><span>TN</span><strong>${tn}</strong></div>
        <div><span>Accuracy</span><strong>${(accuracy * 100).toFixed(1)}%</strong></div>
        <div><span>Precision</span><strong>${(precision * 100).toFixed(1)}%</strong></div>
        <div><span>Recall</span><strong>${(recall * 100).toFixed(1)}%</strong></div>
        <div><span>Threshold</span><strong>${threshold.toFixed(2)}</strong></div>
      </div>
    `;
  }

  thresholdInput.addEventListener("input", update);
  update();
}

function renderIntervalVisual({ controls, canvas, metrics }) {
  const shiftInput = createRangeControl(controls, {
    label: "Track B 이동 (bp)",
    min: -100,
    max: 100,
    step: 1,
    value: 0
  });

  const intervalsA = [
    [45, 125],
    [168, 238],
    [270, 350]
  ];

  const intervalsBBase = [
    [72, 144],
    [208, 286],
    [320, 378]
  ];

  function update() {
    const shift = Number(shiftInput.value);
    const intervalsB = intervalsBBase.map((range) => [range[0] + shift, range[1] + shift]);

    const overlapLengths = [];
    intervalsA.forEach((a) => {
      intervalsB.forEach((b) => {
        const overlap = Math.max(0, Math.min(a[1], b[1]) - Math.max(a[0], b[0]));
        if (overlap > 0) overlapLengths.push(overlap);
      });
    });

    const totalOverlap = overlapLengths.reduce((sum, value) => sum + value, 0);

    const rectsA = intervalsA
      .map((range) => {
        const x = 50 + range[0];
        const w = range[1] - range[0];
        return `<rect x="${x}" y="56" width="${w}" height="24" rx="6" fill="rgba(97,215,255,0.7)"/>`;
      })
      .join("");

    const rectsB = intervalsB
      .map((range) => {
        const x = 50 + range[0];
        const w = range[1] - range[0];
        return `<rect x="${x}" y="120" width="${w}" height="24" rx="6" fill="rgba(255,210,119,0.72)"/>`;
      })
      .join("");

    canvas.innerHTML = `
      <svg class="edu-svg" viewBox="0 0 560 190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="interval overlap">
        <rect x="0" y="0" width="560" height="190" rx="12" fill="rgba(4,11,23,0.72)"/>
        <line x1="50" y1="68" x2="430" y2="68" stroke="rgba(190,212,248,0.28)"/>
        <line x1="50" y1="132" x2="430" y2="132" stroke="rgba(190,212,248,0.28)"/>
        <text x="452" y="73" fill="#99dcff" font-size="12">Track A</text>
        <text x="452" y="137" fill="#ffe3aa" font-size="12">Track B</text>
        ${rectsA}
        ${rectsB}
      </svg>
    `;

    metrics.innerHTML = `
      <div class="viz-metric-grid">
        <div><span>이동량</span><strong>${shift} bp</strong></div>
        <div><span>겹침 구간 수</span><strong>${overlapLengths.length}</strong></div>
        <div><span>총 overlap</span><strong>${totalOverlap.toFixed(0)} bp</strong></div>
      </div>
    `;
  }

  shiftInput.addEventListener("input", update);
  update();
}

function renderQualityVisual({ controls, canvas, metrics }) {
  const thresholdInput = createRangeControl(controls, {
    label: "최소 품질 임계값 (Phred)",
    min: 18,
    max: 34,
    step: 1,
    value: 26
  });

  const quality = VISUAL_DATA.qualityByCycle;

  function update() {
    const threshold = Number(thresholdInput.value);

    let cutIndex = quality.length;
    for (let i = 0; i < quality.length; i += 1) {
      if (quality[i] < threshold) {
        cutIndex = i;
        break;
      }
    }

    const points = quality.map((q, idx) => {
      const x = 42 + (idx / (quality.length - 1)) * 470;
      const y = 186 - ((q - 10) / 28) * 148;
      return [x, y];
    });

    const linePath = points
      .map((point, idx) => `${idx === 0 ? "M" : "L"}${point[0].toFixed(2)} ${point[1].toFixed(2)}`)
      .join(" ");

    const thresholdY = 186 - ((threshold - 10) / 28) * 148;

    const trimX = 42 + ((cutIndex === quality.length ? quality.length - 1 : cutIndex) / (quality.length - 1)) * 470;

    canvas.innerHTML = `
      <svg class="edu-svg" viewBox="0 0 560 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="read quality per cycle">
        <rect x="0" y="0" width="560" height="220" rx="12" fill="rgba(4,11,23,0.72)"/>
        <rect x="${trimX.toFixed(2)}" y="34" width="${(512 - trimX).toFixed(2)}" height="152" fill="rgba(255,112,130,0.12)"/>
        <line x1="42" y1="186" x2="512" y2="186" stroke="rgba(190,212,248,0.28)"/>
        <line x1="42" y1="34" x2="42" y2="186" stroke="rgba(190,212,248,0.28)"/>
        <line x1="42" y1="${thresholdY.toFixed(2)}" x2="512" y2="${thresholdY.toFixed(2)}" stroke="#ffd277" stroke-width="2" stroke-dasharray="6 4"/>
        <path d="${linePath}" fill="none" stroke="#6ce7d9" stroke-width="2.5"/>
        <text x="48" y="${(thresholdY - 6).toFixed(2)}" fill="#ffe0aa" font-size="12">Threshold ${threshold}</text>
      </svg>
    `;

    const keptCycles = Math.max(0, cutIndex);
    const trimmed = quality.length - keptCycles;

    metrics.innerHTML = `
      <div class="viz-metric-grid">
        <div><span>총 cycle</span><strong>${quality.length}</strong></div>
        <div><span>유지 cycle</span><strong>${keptCycles}</strong></div>
        <div><span>trim cycle</span><strong>${trimmed}</strong></div>
      </div>
    `;
  }

  thresholdInput.addEventListener("input", update);
  update();
}

function renderVolcanoVisual({ controls, canvas, metrics }) {
  const lfcInput = createRangeControl(controls, {
    label: "|log2FC| cutoff",
    min: 0.5,
    max: 2.5,
    step: 0.1,
    value: 1
  });

  const pInput = createRangeControl(controls, {
    label: "-log10(p) cutoff",
    min: 1,
    max: 5,
    step: 0.1,
    value: 1.3
  });

  const genes = VISUAL_DATA.volcanoGenes;

  function update() {
    const lfcCut = Number(lfcInput.value);
    const pCut = Number(pInput.value);

    let up = 0;
    let down = 0;

    const circles = genes
      .map((gene) => {
        const x = 40 + ((gene.lfc + 4) / 8) * 470;
        const y = 206 - (Math.min(gene.negLogP, 8) / 8) * 168;

        const isSig = Math.abs(gene.lfc) >= lfcCut && gene.negLogP >= pCut;
        let color = "rgba(145,165,196,0.42)";

        if (isSig && gene.lfc > 0) {
          color = "rgba(255,117,131,0.9)";
          up += 1;
        }

        if (isSig && gene.lfc < 0) {
          color = "rgba(100,189,255,0.9)";
          down += 1;
        }

        return `<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="2.1" fill="${color}"/>`;
      })
      .join("");

    const xPos = 40 + ((lfcCut + 4) / 8) * 470;
    const xNeg = 40 + ((-lfcCut + 4) / 8) * 470;
    const yCut = 206 - (pCut / 8) * 168;

    canvas.innerHTML = `
      <svg class="edu-svg" viewBox="0 0 560 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="volcano plot">
        <rect x="0" y="0" width="560" height="230" rx="12" fill="rgba(4,11,23,0.72)"/>
        <line x1="40" y1="206" x2="510" y2="206" stroke="rgba(190,212,248,0.28)"/>
        <line x1="275" y1="30" x2="275" y2="206" stroke="rgba(190,212,248,0.18)"/>
        <line x1="40" y1="30" x2="40" y2="206" stroke="rgba(190,212,248,0.28)"/>
        <line x1="${xNeg.toFixed(2)}" y1="30" x2="${xNeg.toFixed(2)}" y2="206" stroke="#ffd277" stroke-dasharray="5 4"/>
        <line x1="${xPos.toFixed(2)}" y1="30" x2="${xPos.toFixed(2)}" y2="206" stroke="#ffd277" stroke-dasharray="5 4"/>
        <line x1="40" y1="${yCut.toFixed(2)}" x2="510" y2="${yCut.toFixed(2)}" stroke="#ffd277" stroke-dasharray="5 4"/>
        ${circles}
      </svg>
    `;

    const totalSig = up + down;

    metrics.innerHTML = `
      <div class="viz-metric-grid">
        <div><span>Up genes</span><strong>${up}</strong></div>
        <div><span>Down genes</span><strong>${down}</strong></div>
        <div><span>Total significant</span><strong>${totalSig}</strong></div>
      </div>
    `;
  }

  lfcInput.addEventListener("input", update);
  pInput.addEventListener("input", update);
  update();
}

function renderChipPeaksVisual({ controls, canvas, metrics }) {
  const foldInput = createRangeControl(controls, {
    label: "Fold-enrichment cutoff",
    min: 1.2,
    max: 3.5,
    step: 0.1,
    value: 2
  });

  const signals = VISUAL_DATA.chipSignals;

  function update() {
    const cutoff = Number(foldInput.value);

    const chipMax = Math.max(...signals.map((v) => v.chip));
    const ctrlMax = Math.max(...signals.map((v) => v.control));
    const maxY = Math.max(chipMax, ctrlMax) * 1.1;

    const chipPath = signals
      .map((row, idx) => {
        const x = 42 + (idx / (signals.length - 1)) * 470;
        const y = 190 - (row.chip / maxY) * 145;
        return `${idx === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
      })
      .join(" ");

    const controlPath = signals
      .map((row, idx) => {
        const x = 42 + (idx / (signals.length - 1)) * 470;
        const y = 190 - (row.control / maxY) * 145;
        return `${idx === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
      })
      .join(" ");

    const peakMask = signals.map((row) => row.chip / Math.max(0.5, row.control) >= cutoff);
    const segments = findSegments(peakMask);

    const highlights = segments
      .map((segment) => {
        const x1 = 42 + (segment.start / (signals.length - 1)) * 470;
        const x2 = 42 + (segment.end / (signals.length - 1)) * 470;
        return `<rect x="${x1.toFixed(2)}" y="36" width="${Math.max(4, x2 - x1).toFixed(2)}" height="154" fill="rgba(97,215,255,0.17)"/>`;
      })
      .join("");

    canvas.innerHTML = `
      <svg class="edu-svg" viewBox="0 0 560 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="chip-seq peak">
        <rect x="0" y="0" width="560" height="230" rx="12" fill="rgba(4,11,23,0.72)"/>
        ${highlights}
        <line x1="42" y1="190" x2="512" y2="190" stroke="rgba(190,212,248,0.28)"/>
        <line x1="42" y1="36" x2="42" y2="190" stroke="rgba(190,212,248,0.28)"/>
        <path d="${chipPath}" fill="none" stroke="#68e8d8" stroke-width="2.2"/>
        <path d="${controlPath}" fill="none" stroke="#f4c477" stroke-width="2"/>
        <text x="435" y="48" fill="#85f1df" font-size="12">ChIP</text>
        <text x="435" y="66" fill="#ffd999" font-size="12">Control</text>
      </svg>
    `;

    metrics.innerHTML = `
      <div class="viz-metric-grid">
        <div><span>Cutoff</span><strong>${cutoff.toFixed(1)}x</strong></div>
        <div><span>Peak segments</span><strong>${segments.length}</strong></div>
        <div><span>Bins above cutoff</span><strong>${peakMask.filter(Boolean).length}</strong></div>
      </div>
    `;
  }

  foldInput.addEventListener("input", update);
  update();
}

function renderMethylationVisual({ controls, canvas, metrics }) {
  const deltaInput = createRangeControl(controls, {
    label: "|Δ beta| cutoff",
    min: 0.05,
    max: 0.35,
    step: 0.01,
    value: 0.12
  });

  const rows = VISUAL_DATA.methylationRows;

  function update() {
    const cutoff = Number(deltaInput.value);

    const cellW = 24;
    const cellH = 12;
    const startX = 130;
    const startY = 28;

    const colLabels = ["N1", "N2", "N3", "T1", "T2", "T3"];

    const cells = [];
    const highlightRows = [];
    const sigRows = [];

    rows.forEach((row, rowIdx) => {
      const values = [...row.groupA, ...row.groupB];

      const meanA = average(row.groupA);
      const meanB = average(row.groupB);
      const delta = meanB - meanA;

      if (Math.abs(delta) >= cutoff) {
        sigRows.push({ name: row.region, delta });
        const y = startY + rowIdx * (cellH + 3) - 1;
        highlightRows.push(
          `<rect x="${startX - 4}" y="${y}" width="${cellW * 6 + 8}" height="${cellH + 2}" fill="none" stroke="rgba(255,210,119,0.85)" stroke-width="1.4"/>`
        );
      }

      values.forEach((value, colIdx) => {
        const x = startX + colIdx * cellW;
        const y = startY + rowIdx * (cellH + 3);
        cells.push(
          `<rect x="${x}" y="${y}" width="${cellW - 2}" height="${cellH}" fill="${betaColor(value)}" rx="2"/>`
        );
      });
    });

    const labels = rows
      .map((row, idx) => {
        const y = startY + idx * (cellH + 3) + 9;
        return `<text x="14" y="${y}" fill="rgba(200,219,248,0.88)" font-size="9">${row.region}</text>`;
      })
      .join("");

    const colText = colLabels
      .map((label, idx) => {
        const x = startX + idx * cellW + 4;
        return `<text x="${x}" y="18" fill="rgba(209,226,251,0.9)" font-size="10">${label}</text>`;
      })
      .join("");

    canvas.innerHTML = `
      <svg class="edu-svg" viewBox="0 0 560 430" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="methylation heatmap">
        <rect x="0" y="0" width="560" height="430" rx="12" fill="rgba(4,11,23,0.72)"/>
        ${colText}
        ${labels}
        ${cells.join("")}
        ${highlightRows.join("")}
      </svg>
    `;

    metrics.innerHTML = `
      <div class="viz-metric-grid">
        <div><span>Cutoff</span><strong>${cutoff.toFixed(2)}</strong></div>
        <div><span>DMR 후보 행</span><strong>${sigRows.length}</strong></div>
        <div><span>Top Δbeta</span><strong>${sigRows.length ? sigRows[0].delta.toFixed(2) : "0.00"}</strong></div>
      </div>
    `;
  }

  deltaInput.addEventListener("input", update);
  update();
}

function renderMultiomicsVisual({ controls, canvas, metrics }) {
  const profiles = {
    CMS1: [
      { factor: "Factor 1 (Immune)", RNA: 0.52, CNV: 0.16, Methylation: 0.32 },
      { factor: "Factor 2 (Stromal)", RNA: 0.38, CNV: 0.24, Methylation: 0.38 },
      { factor: "Factor 3 (Mutation)", RNA: 0.27, CNV: 0.48, Methylation: 0.25 }
    ],
    CMS2: [
      { factor: "Factor 1 (Proliferation)", RNA: 0.56, CNV: 0.29, Methylation: 0.15 },
      { factor: "Factor 2 (Metabolism)", RNA: 0.42, CNV: 0.33, Methylation: 0.25 },
      { factor: "Factor 3 (WNT/MYC)", RNA: 0.49, CNV: 0.39, Methylation: 0.12 }
    ],
    CMS3: [
      { factor: "Factor 1 (Metabolic)", RNA: 0.47, CNV: 0.19, Methylation: 0.34 },
      { factor: "Factor 2 (Stress)", RNA: 0.37, CNV: 0.21, Methylation: 0.42 },
      { factor: "Factor 3 (Heterogeneity)", RNA: 0.34, CNV: 0.35, Methylation: 0.31 }
    ],
    CMS4: [
      { factor: "Factor 1 (Mesenchymal)", RNA: 0.39, CNV: 0.22, Methylation: 0.39 },
      { factor: "Factor 2 (TGF-beta)", RNA: 0.31, CNV: 0.18, Methylation: 0.51 },
      { factor: "Factor 3 (Invasion)", RNA: 0.36, CNV: 0.37, Methylation: 0.27 }
    ]
  };

  const notes = {
    CMS1: "면역 관련 신호가 강하고 methylation 기여가 비교적 큽니다.",
    CMS2: "증식/세포주기 성향이 강하며 RNA와 CNV 기여가 큽니다.",
    CMS3: "대사/스트레스 축이 혼합되고 3개 omics 기여가 비교적 균형적입니다.",
    CMS4: "기질/침윤 관련 신호에서 methylation 영향이 상대적으로 큽니다."
  };

  const selectWrap = document.createElement("label");
  selectWrap.className = "viz-select-wrap";
  selectWrap.textContent = "Subtype";

  const select = document.createElement("select");
  ["CMS1", "CMS2", "CMS3", "CMS4"].forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    select.appendChild(option);
  });

  selectWrap.appendChild(select);
  controls.appendChild(selectWrap);

  function update() {
    const subtype = select.value;
    const rows = profiles[subtype];

    const bars = rows
      .map((row, idx) => {
        const y = 48 + idx * 52;
        const barX = 200;
        const barW = 300;

        const rnaW = row.RNA * barW;
        const cnvW = row.CNV * barW;
        const methW = row.Methylation * barW;

        return `
          <text x="24" y="${y + 16}" fill="rgba(211,227,252,0.92)" font-size="12">${row.factor}</text>
          <rect x="${barX}" y="${y}" width="${rnaW.toFixed(2)}" height="18" fill="#67e9d7" rx="4"/>
          <rect x="${(barX + rnaW).toFixed(2)}" y="${y}" width="${cnvW.toFixed(2)}" height="18" fill="#ffd27c"/>
          <rect x="${(barX + rnaW + cnvW).toFixed(2)}" y="${y}" width="${methW.toFixed(2)}" height="18" fill="#8ab2ff" rx="4"/>
        `;
      })
      .join("");

    canvas.innerHTML = `
      <svg class="edu-svg" viewBox="0 0 560 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="multi-omics contribution">
        <rect x="0" y="0" width="560" height="240" rx="12" fill="rgba(4,11,23,0.72)"/>
        ${bars}
        <rect x="22" y="196" width="14" height="10" fill="#67e9d7" rx="2"/>
        <text x="42" y="205" fill="rgba(206,224,252,0.92)" font-size="11">RNA</text>
        <rect x="92" y="196" width="14" height="10" fill="#ffd27c" rx="2"/>
        <text x="112" y="205" fill="rgba(206,224,252,0.92)" font-size="11">CNV</text>
        <rect x="158" y="196" width="14" height="10" fill="#8ab2ff" rx="2"/>
        <text x="178" y="205" fill="rgba(206,224,252,0.92)" font-size="11">Methylation</text>
      </svg>
    `;

    metrics.innerHTML = `
      <div class="viz-metric-grid">
        <div><span>Subtype</span><strong>${subtype}</strong></div>
        <div><span>요인 수</span><strong>${rows.length}</strong></div>
        <div><span>해석 포인트</span><strong>${notes[subtype]}</strong></div>
      </div>
    `;
  }

  select.addEventListener("change", update);
  update();
}

function createRangeControl(container, { label, min, max, step, value }) {
  const wrap = document.createElement("label");
  wrap.className = "viz-control";

  const title = document.createElement("span");
  title.className = "viz-control-label";
  title.textContent = label;

  const input = document.createElement("input");
  input.type = "range";
  input.min = String(min);
  input.max = String(max);
  input.step = String(step);
  input.value = String(value);

  const out = document.createElement("output");
  out.className = "viz-control-value";
  out.textContent = String(value);

  input.addEventListener("input", () => {
    out.textContent = String(input.value);
  });

  wrap.append(title, input, out);
  container.appendChild(wrap);

  return input;
}

function runKMeans(points, k, iterations = 8) {
  const centroids = [];
  for (let i = 0; i < k; i += 1) {
    const pick = points[Math.floor((i * points.length) / k)];
    centroids.push({ x: pick.x, y: pick.y });
  }

  const assignments = new Array(points.length).fill(0);

  for (let iter = 0; iter < iterations; iter += 1) {
    for (let i = 0; i < points.length; i += 1) {
      let bestIdx = 0;
      let bestDist = Number.POSITIVE_INFINITY;

      for (let c = 0; c < centroids.length; c += 1) {
        const dx = points[i].x - centroids[c].x;
        const dy = points[i].y - centroids[c].y;
        const dist = dx * dx + dy * dy;
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = c;
        }
      }

      assignments[i] = bestIdx;
    }

    for (let c = 0; c < centroids.length; c += 1) {
      const clusterPoints = points.filter((_, idx) => assignments[idx] === c);
      if (clusterPoints.length === 0) continue;
      centroids[c] = {
        x: average(clusterPoints.map((p) => p.x)),
        y: average(clusterPoints.map((p) => p.y))
      };
    }
  }

  let inertia = 0;
  points.forEach((point, idx) => {
    const c = centroids[assignments[idx]];
    const dx = point.x - c.x;
    const dy = point.y - c.y;
    inertia += dx * dx + dy * dy;
  });

  return { centroids, assignments, inertia };
}

function findSegments(mask) {
  const segments = [];
  let start = null;

  for (let i = 0; i < mask.length; i += 1) {
    if (mask[i] && start === null) {
      start = i;
    }

    if ((!mask[i] || i === mask.length - 1) && start !== null) {
      const end = mask[i] && i === mask.length - 1 ? i : i - 1;
      segments.push({ start, end });
      start = null;
    }
  }

  return segments;
}

function betaColor(value) {
  const v = clamp(value, 0, 1);
  const hue = 220 - v * 200;
  const sat = 70;
  const light = 55 - Math.abs(v - 0.5) * 18;
  return `hsl(${hue.toFixed(0)} ${sat}% ${light.toFixed(0)}%)`;
}

function generateClusterPoints() {
  const centers = [
    [-2.2, -1.6],
    [2.1, -1.3],
    [-1.3, 1.9],
    [2.3, 1.7]
  ];
  const rng = createRng(42);
  const points = [];

  centers.forEach((center) => {
    for (let i = 0; i < 34; i += 1) {
      points.push({
        x: center[0] + randomNormal(rng) * 0.42,
        y: center[1] + randomNormal(rng) * 0.4
      });
    }
  });

  return points;
}

function generateClassificationSamples() {
  const rng = createRng(7);
  const samples = [];

  for (let i = 0; i < 170; i += 1) {
    const latent = randomNormal(rng) * 1.12 + (rng() - 0.5) * 0.9;
    const score = clamp(1 / (1 + Math.exp(-latent)), 0.01, 0.99);
    const signal = score * 0.82 + 0.09;
    const label = rng() < signal ? 1 : 0;
    samples.push({ score, label });
  }

  return samples;
}

function generateVolcanoGenes() {
  const rng = createRng(88);
  const genes = [];

  for (let i = 0; i < 420; i += 1) {
    const lfc = randomNormal(rng) * 1.25;
    const negLogP = Math.max(0.01, Math.abs(lfc) * 1.25 + randomNormal(rng) * 0.8 + rng() * 2.3);
    genes.push({ lfc, negLogP });
  }

  return genes;
}

function generateChipSignals() {
  const rng = createRng(131);
  const bins = [];
  const peakRanges = [
    [9, 14],
    [23, 29],
    [41, 47],
    [56, 61]
  ];

  for (let i = 0; i < 70; i += 1) {
    let chip = 9 + rng() * 2.2;
    let control = 7.2 + rng() * 1.6;

    peakRanges.forEach((peak) => {
      if (i >= peak[0] && i <= peak[1]) {
        chip += 9 + rng() * 4;
        control += 0.8 + rng() * 1.1;
      }
    });

    bins.push({ index: i, chip, control });
  }

  return bins;
}

function generateMethylationRows() {
  const rng = createRng(602);
  const rows = [];

  for (let i = 0; i < 24; i += 1) {
    const base = 0.25 + rng() * 0.5;
    const spike = i % 5 === 0 ? (rng() < 0.5 ? -0.18 : 0.2) : (rng() - 0.5) * 0.08;

    const groupA = [
      clamp(base + randomNormal(rng) * 0.03, 0.02, 0.98),
      clamp(base + randomNormal(rng) * 0.03, 0.02, 0.98),
      clamp(base + randomNormal(rng) * 0.03, 0.02, 0.98)
    ];

    const groupB = [
      clamp(base + spike + randomNormal(rng) * 0.03, 0.02, 0.98),
      clamp(base + spike + randomNormal(rng) * 0.03, 0.02, 0.98),
      clamp(base + spike + randomNormal(rng) * 0.03, 0.02, 0.98)
    ];

    rows.push({ region: `Region ${String(i + 1).padStart(2, "0")}`, groupA, groupB });
  }

  return rows;
}

function generateQualityCurve() {
  const rng = createRng(901);
  const values = [];

  for (let i = 0; i < 96; i += 1) {
    const base = 36 - i * 0.17 + Math.sin(i / 7) * 0.9 + randomNormal(rng) * 0.35;
    values.push(clamp(base, 12, 40));
  }

  return values;
}

function createRng(seed) {
  let t = seed;
  return function next() {
    t += 0x6d2b79f5;
    let x = t;
    x = Math.imul(x ^ (x >>> 15), x | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

function randomNormal(rng) {
  const u = Math.max(1e-7, rng());
  const v = Math.max(1e-7, rng());
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

function average(values) {
  if (!values || values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
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
