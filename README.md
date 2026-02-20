# DNAStudy Learning Hub

교육용 웹앱입니다.

- `/` : CompGenomR 기반 목차형 학습 허브 (현재 Chapter 1~11 시각화 학습 제공)
- `/explorer.html` : 기존 DNA -> mRNA -> codon -> amino acid -> 3D folding 탐색기

기존 탐색기는 실제 인간 유전자의 canonical CDS를 기반으로 `DNA -> mRNA -> codon -> amino acid -> 3D folding` 흐름을 시각화합니다.

## 포함 데이터
검증된 인간 유전자 32개를 제공합니다.

- `HBB`, `INS`, `TP53`, `EGFR`, `BRCA1`, `CFTR`, `APOE`, `ALB`
- `ACTB`, `GAPDH`, `ACE2`, `TNF`, `IL6`, `PCSK9`, `LDLR`, `APP`
- `KRAS`, `BRAF`, `VEGFA`, `G6PD`, `SOD1`, `MAPT`, `SNCA`, `LMNA`
- `TTR`, `PAH`, `LEP`, `LEPR`, `FTO`, `MC4R`, `MYC`, `COL1A1`

데이터 출처:
- Ensembl REST (`canonical transcript` CDS)
- AlphaFold DB API (`/api/prediction/{UniProt}`)
- UniProt

## 라이선스 준수 (CompGenomR 기반 콘텐츠)
- 원문: https://compgenomr.github.io/book/
- 원저작자: Altuna Akalin
- 원문 라이선스: CC BY-NC-SA 4.0 (https://creativecommons.org/licenses/by-nc-sa/4.0/)
- 본 프로젝트의 CompGenomR 기반 챕터 요약/시각화 콘텐츠도 동일하게 CC BY-NC-SA 4.0 조건을 따릅니다.
- 비상업(NonCommercial) 용도만 허용하며, 재배포/수정 시 저작자 표시와 동일 라이선스 유지가 필요합니다.
- 상세 문구: `/Users/user/DNA/CONTENT-LICENSE.md`

## 실행
1. 터미널에서 프로젝트 루트로 이동
2. 정적 서버 실행

```bash
cd /Users/user/DNA
python3 -m http.server 8080
```

3. 브라우저에서 `http://localhost:8080` 접속
4. 기존 탐색기 직접 진입: `http://localhost:8080/explorer.html`

## 구현 포인트
- 사용자는 임의 서열 입력이 아니라 검증된 리스트에서 선택
- 선택한 유전자의 CDS를 Ensembl에서 가져와 전사/번역하여 코돈/아미노산 표시
- 1~4단계(DNA, mRNA, Codon, Amino acid)에 학습용 설명 블록 제공
- AlphaFold API에서 최신 모델 URL을 우선 사용하고, 실패 시 `v6` fallback URL 사용
- 3Dmol.js로 접힘 구조 시각화 (B-factor 기반 pLDDT 컬러)
- `ResizeObserver` 기반으로 3D 뷰어를 리사이즈해 UI 깨짐을 줄임
