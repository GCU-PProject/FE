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
  // Backend temporary policy: only country_id=1 is valid.
  if (codes.length > 0) {
    return {
      countryIds: [1],
      missingCodes: [],
    };
  }

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
