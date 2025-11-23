import { makeSdTailwindConfig } from 'sd-tailwindcss-transformer';
import StyleDictionary from 'style-dictionary';

const sd = new StyleDictionary(
  makeSdTailwindConfig({
    type: 'all',
    source: ['tokens/build/tokens.json'],
    buildPath: 'tokens/build/tw',
  }),
);

await sd.hasInitialized;
await sd.buildAllPlatforms();
