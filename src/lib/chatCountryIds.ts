import type { CountryCode } from '@/types/country';

const CHAT_COUNTRY_ID_MAP: Partial<Record<CountryCode, number>> = {
  US: 1,
  CA: 2,
};

export const getChatCountryId = (countryCode?: CountryCode): number =>
  CHAT_COUNTRY_ID_MAP[countryCode ?? 'US'] ?? CHAT_COUNTRY_ID_MAP.US ?? 1;
