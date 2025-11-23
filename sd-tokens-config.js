import { register } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';

register(StyleDictionary);

const sd = new StyleDictionary({
  source: ['tokens/sd-*.json'], // split-tokens.js로 분리된 토큰 입력
  preprocessors: ['tokens-studio'],
  platforms: {
    css: {
      transformGroup: 'tokens-studio', // <- apply the tokens-studio transformGroup to apply all transforms
      buildPath: 'tokens/build/', // 생성될 파일 경로
      files: [{ destination: 'tokens.json', format: 'json' }],
    },
  },
});

try {
  await sd.cleanAllPlatforms();
  await sd.buildAllPlatforms();
  console.log('Style Dictionary 토큰 빌드 완료!');
} catch (error) {
  console.error('Style Dictionary 토큰 빌드 실패:', error);
  process.exit(1);
}
