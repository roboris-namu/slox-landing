// ============================================================================
// SLOX 앱 카탈로그 자동 export (slox.co.kr → SLOX Hub)
// ----------------------------------------------------------------------------
// `src/components/Apps.tsx`에 박혀있는 528개 appsData + 다국어 appTexts를
// 파싱해서 `public/api/apps.json`으로 저장한다.
//
// Next.js의 prebuild hook으로 자동 실행되며, 결과 파일은 정적 자원으로 배포되어
// 다음 URL에서 접근 가능:
//   https://slox.co.kr/api/apps.json
//
// SLOX Hub 앱은 시작 시 이 URL을 fetch하여 최신 카탈로그를 동기화한다.
// (오프라인이거나 fetch 실패 시 번들된 정적 데이터로 폴백)
// ============================================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const APPS_TSX = path.join(ROOT, 'src/components/Apps.tsx');
const OUTPUT = path.join(ROOT, 'public/api/apps.json');

function extractBlock(source, declStart, openChar, closeChar) {
  const start = source.indexOf(declStart);
  if (start === -1) throw new Error(`선언 미발견: ${declStart}`);
  const eqIdx = source.indexOf('=', start);
  if (eqIdx === -1) throw new Error(`등호 미발견: ${declStart}`);
  const openIdx = source.indexOf(openChar, eqIdx);
  let depth = 0;
  let inString = false;
  let stringChar = null;
  let inBlockComment = false;
  let inLineComment = false;

  for (let i = openIdx; i < source.length; i++) {
    const ch = source[i];
    const next = source[i + 1];

    if (inLineComment) {
      if (ch === '\n') inLineComment = false;
      continue;
    }
    if (inBlockComment) {
      if (ch === '*' && next === '/') {
        inBlockComment = false;
        i++;
      }
      continue;
    }
    if (inString) {
      if (ch === '\\') {
        i++;
        continue;
      }
      if (ch === stringChar) inString = false;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') {
      inString = true;
      stringChar = ch;
      continue;
    }
    if (ch === '/' && next === '/') {
      inLineComment = true;
      i++;
      continue;
    }
    if (ch === '/' && next === '*') {
      inBlockComment = true;
      i++;
      continue;
    }
    if (ch === openChar) depth++;
    else if (ch === closeChar) {
      depth--;
      if (depth === 0) return source.slice(openIdx, i + 1);
    }
  }
  throw new Error(`닫는 ${closeChar} 미발견: ${declStart}`);
}

// TS 캐스트/타입 어노테이션 제거 (JS evaluator 호환)
function stripTs(src) {
  return src
    .replace(/\bas\s+[A-Za-z_$][\w$]*\b/g, '')
    .replace(/:\s*Record<[^>]+>/g, '')
    .replace(/:\s*[A-Z][\w$<>\[\], ]*\s*=/g, '=');
}

async function main() {
  if (!fs.existsSync(APPS_TSX)) {
    console.error(`❌ ${APPS_TSX} not found`);
    process.exit(1);
  }
  const src = fs.readFileSync(APPS_TSX, 'utf8');

  const appsBlock = stripTs(extractBlock(src, 'const appsData', '[', ']'));
  const textsBlock = stripTs(extractBlock(src, 'const appTexts', '{', '}'));
  const sectionTBlock = stripTs(extractBlock(src, 'const sectionT', '{', '}'));
  const categoryLabelsBlock = stripTs(
    extractBlock(src, 'const categoryLabels', '{', '}')
  );

  const evaluate = new Function(`
    const appsData = ${appsBlock};
    const appTexts = ${textsBlock};
    const sectionT = ${sectionTBlock};
    const categoryLabels = ${categoryLabelsBlock};
    return { appsData, appTexts, sectionT, categoryLabels };
  `);
  const { appsData, appTexts, sectionT, categoryLabels } = evaluate();

  if (!Array.isArray(appsData)) {
    throw new Error('appsData 가 배열이 아님');
  }

  const apps = appsData.map((a, i) => ({
    no: i + 1,
    emoji: a.emoji,
    cat: a.cat,
    ios: a.ios ?? null,
    android: a.android ?? null,
    pin: a.pin ?? null,
  }));

  const payload = {
    version: 1,
    total: apps.length,
    generatedAt: new Date().toISOString(),
    source: 'slox-landing/src/components/Apps.tsx',
    apps,
    texts: appTexts,
    sectionLabels: sectionT,
    categoryLabels,
  };

  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, JSON.stringify(payload));

  const sizeKb = (fs.statSync(OUTPUT).size / 1024).toFixed(1);
  console.log(
    `✅ apps.json exported → public/api/apps.json (${apps.length} apps, ${sizeKb} KB)`
  );

  // 카테고리별 카운트 검증 출력 (slox.co.kr 메인 카운트와 일치하는지)
  const counts = {};
  for (const a of apps) counts[a.cat] = (counts[a.cat] || 0) + 1;
  console.log(`📊 categories: ${JSON.stringify(counts)}`);

  // pin='last' 위치 검증
  const pinIdx = apps.findIndex((a) => a.pin === 'last');
  if (pinIdx >= 0) {
    const ko = appTexts.ko?.[pinIdx];
    console.log(`📌 pin='last' #${apps[pinIdx].no}: ${ko?.name ?? '?'}`);
  }
}

main().catch((err) => {
  console.error('❌ export-apps-json 실패:', err);
  process.exit(1);
});
