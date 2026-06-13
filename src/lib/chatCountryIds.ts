import type { CountryCode } from '@/types/country';
import env from '@/lib/env';

const DEFAULT_COUNTRY_CODE: CountryCode = 'US';

export const getChatCountryId = (
  countryCode?: CountryCode,
): number | null => {
  const targetCountryCode = countryCode ?? DEFAULT_COUNTRY_CODE;

  return env.countryIdMap[targetCountryCode] ?? null;
};
