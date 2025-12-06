import type { INTEREST_COUNTRIES } from '@/constants/interestCountries';

export type CountryCode = (typeof INTEREST_COUNTRIES)[number]['code'];
export type PreferredCountries = CountryCode[];
