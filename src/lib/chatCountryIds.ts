import type { CountryCode } from '@/types/country';

const DEFAULT_COUNTRY_CODE: CountryCode = 'US';
const DEFAULT_COUNTRY_ID_MAP: Partial<Record<CountryCode, number>> = {
  US: 1,
  CA: 4,
  AU: 7,
};

const parseCountryIdMap = (): Partial<Record<CountryCode, number>> => {
  const value = import.meta.env.VITE_COUNTRY_ID_MAP;

  if (!value) {
    return DEFAULT_COUNTRY_ID_MAP;
  }

  try {
    const parsed = JSON.parse(value) as Partial<Record<CountryCode, unknown>>;

    return Object.entries(parsed).reduce<Partial<Record<CountryCode, number>>>(
      (acc, [countryCode, countryId]) => {
        if (typeof countryId === 'number' && Number.isFinite(countryId)) {
          acc[countryCode] = countryId;
        }

        return acc;
      },
      {},
    );
  } catch {
    return DEFAULT_COUNTRY_ID_MAP;
  }
};

const CHAT_COUNTRY_ID_MAP = parseCountryIdMap();

export const getChatCountryId = (
  countryCode?: CountryCode,
): number | null => {
  const targetCountryCode = countryCode ?? DEFAULT_COUNTRY_CODE;

  return CHAT_COUNTRY_ID_MAP[targetCountryCode] ?? null;
};
