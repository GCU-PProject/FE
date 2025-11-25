import { makeSdTailwindConfig } from 'sd-tailwindcss-transformer';
import StyleDictionary from 'style-dictionary';

const sd = new StyleDictionary(
  makeSdTailwindConfig({
    type: 'all',
    source: ['tokens/build/tokens.json'],
    buildPath: 'tokens/build/tw',
  }),
);

try {
  await sd.hasInitialized;
  await sd.buildAllPlatforms();
  console.log('Tailwind  토큰 빌드 완료!');
} catch (error) {
  console.error('Tailwind 토큰 빌드 실패:', error);
  process.exit(1);
}
