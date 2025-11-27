import fs from 'node:fs';
import path from 'node:path';
import { makeSdTailwindConfig } from 'sd-tailwindcss-transformer';
import StyleDictionary from 'style-dictionary';

const sd = new StyleDictionary(
  makeSdTailwindConfig({
    type: 'all',
    source: ['tokens/build/tokens.json'],
    buildPath: 'tokens/build/tw',
  }),
);

const cjsOutputPath = path.resolve('tokens/build/tw/tailwind.config.cjs');
const jsOutputPath = path.resolve('tokens/build/tw/tailwind.config.js');

try {
  await sd.hasInitialized;
  await sd.buildAllPlatforms();
  if (fs.existsSync(jsOutputPath)) {
    fs.renameSync(jsOutputPath, cjsOutputPath);
  }
  console.log('Tailwind 토큰 빌드 완료!');
} catch (error) {
  console.error('Tailwind 토큰 빌드 실패:', error);
  process.exit(1);
}
