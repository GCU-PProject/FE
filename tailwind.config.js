import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { tailwindTokens } from './src/styles/tokens.js';

const require = createRequire(import.meta.url);
const tokenConfigPath = path.resolve('./tokens/build/tw/tailwind.config.cjs');

const tokenThemeExtend =
  (fs.existsSync(tokenConfigPath) &&
    (require(tokenConfigPath)?.theme?.extend ?? {})) ||
  {};

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      ...tokenThemeExtend,
      colors: tailwindTokens.colors,
      borderRadius: tailwindTokens.borderRadius,
      fontFamily: tailwindTokens.fontFamily,
      spacing: tailwindTokens.spacing,
    },
  },
  plugins: [],
};
