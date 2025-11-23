import { register } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';

register(StyleDictionary);

const sd = new StyleDictionary({
  source: ['tokens/sd-*.json'], // split-tokens.js로 분리된 토큰 입력
  preprocessors: ['tokens-studio'],
  platforms: {
    css: {
      transformGroup: 'tokens-studio', // <- apply the tokens-studio transformGroup to apply all transforms
      transforms: ['name/kebab'], // 생성될 토큰 이름
      buildPath: 'tokens/build/', // 생성될 파일 경로
      files: [{ destination: 'tokens.json', format: 'json' }],
    },
  },
});

await sd.cleanAllPlatforms();
await sd.buildAllPlatforms();
