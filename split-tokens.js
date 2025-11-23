import * as fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// 현재 파일의 절대 경로 가져오기
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// tokens.json 파일 읽기 (절대 경로 사용)
const tokensPath = path.join(__dirname, 'src/tokens/design-tokens.json');
const outputDir = path.join(__dirname, 'tokens');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

let tokens;
try {
  tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf-8'));
} catch (e) {
  console.log(`${tokensPath} 파일을 읽거나 파싱하는 데 실패했습니다.`, e);
  process.exit(1);
}

// `$metadata.tokenSetOrder`에 정의된 키들을 가져오기
const tokenSets = tokens.$metadata.tokenSetOrder || [];

// 각 키에 따라 파일 생성
for (const set of tokenSets) {
  // tokenSetOrder 의 키가 'comp'인 경우, 해당 키는 파일로 생성하지 않음
  // Tokens Studio for Figma에서 comp 를 inactive 했는데도 파일이 생성되는 이슈가 있어서 추가
  if (set === 'comp') continue;

  if (tokens[set]) {
    const safe = set.replace(/\//g, '-'); // "global/typography" -> "global-typography"
    const data = JSON.stringify(tokens[set], null, 2);
    const outputPath = path.join(outputDir, `sd-${safe}.json`);
    fs.writeFileSync(outputPath, data);
    console.log(`sd-${safe}.json 파일이 생성되었습니다.`);
  }
}

console.log('토큰 분리 완료!');
