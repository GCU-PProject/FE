import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const tokensPath = path.resolve('./tokens/build/tokens.json');
const rawTokens = fs.existsSync(tokensPath) ? require(tokensPath) : {};

const getValue = (token, fallback) =>
  token && typeof token === 'object' && 'value' in token
    ? token.value
    : fallback;

const spacingEntries = Object.entries(rawTokens.spacing ?? {}).map(
  ([key, token]) => {
    const value = getValue(token, undefined);
    // 토큰이 없으면 0px로 대체
    return [key, value != null ? value : '0px'];
  },
);

const radiusEntries = Object.entries(rawTokens.radius ?? {}).map(
  ([key, token]) => {
    const value = getValue(token, undefined);
    // 토큰이 없거나 값이 비어 있으면 기본 8px 등으로 fallback
    return [key, value != null ? value : '8px'];
  },
);

export const tailwindTokens = {
  colors: {
    brand: {
      primary: getValue(rawTokens.color?.brand?.primary, '#155dfc'),
      light: getValue(rawTokens.color?.primary?.light, '#eff6ff'),
    },
    text: {
      primary: getValue(rawTokens.color?.text?.primary, '#0A0A0A'),
      secondary: getValue(rawTokens.color?.text?.secondary, '#4A5565'),
      tertiary: getValue(rawTokens.color?.text?.tertiary, '#6A7282'),
      title: getValue(rawTokens.color?.text?.title, '#101828'),
      placeholder: getValue(rawTokens.color?.text?.placeholder, '#717182'),
      body: getValue(rawTokens.color?.text?.['modal-body'], '#364153'),
    },
    border: {
      base: getValue(rawTokens.color?.border?.base, '#E5E7EB'),
      selected: getValue(rawTokens.color?.state?.selected?.border, '#2b7fff'),
    },
    state: {
      selected: {
        black: getValue(rawTokens.color?.state?.selected?.black, '#030213'),
        border: getValue(rawTokens.color?.state?.selected?.border, '#2b7fff'),
      },
    },
    bg: {
      soft: getValue(rawTokens.color?.bg?.soft, '#F3F3F5'),
    },
    danger: {
      base: getValue(rawTokens.color?.danger?.base, '#e7000b'),
    },
  },
  borderRadius: Object.fromEntries(radiusEntries),
  fontFamily: {
    sans: [
      getValue(rawTokens.typography?.button?.md?.fontFamily, 'Arimo'),
      'system-ui',
      'sans-serif',
    ],
  },
  spacing: Object.fromEntries(spacingEntries),
};
