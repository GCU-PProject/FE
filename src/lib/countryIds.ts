import type { CountryCode } from '@/types/country';

type CountryIdMap = Record<string, number>;

export type CountryIdMappingResult = {
  countryIds: number[];
  missingCodes: CountryCode[];
};

export const mapCountryCodesToIds = (
  codes: CountryCode[],
  countryIdMap: CountryIdMap,
): CountryIdMappingResult => {
  const countryIds: number[] = [];
  const missingCodes: CountryCode[] = [];

  codes.forEach((code) => {
    const countryId = countryIdMap[code];
    if (typeof countryId === 'number') {
      countryIds.push(countryId);
      return;
    }
    missingCodes.push(code);
  });

  return {
    countryIds,
    missingCodes,
  };
};

