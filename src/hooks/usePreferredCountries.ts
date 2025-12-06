import { useCallback, useMemo, useState } from 'react';
import type { CountryCode, PreferredCountries } from '@/types/country';
import { INTEREST_COUNTRIES } from '@/constants/interestCountries';

const STORAGE_KEY = 'preferredCountries';
const VALID_CODES = new Set(INTEREST_COUNTRIES.map((c) => c.code));

const isValidCountryCode = (code: unknown): code is CountryCode =>
  typeof code === 'string' && VALID_CODES.has(code.toUpperCase());

const getInitialPreferredCountries = (): PreferredCountries => {
  if (typeof window === 'undefined') return [];
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];

  try {
    const parsed = JSON.parse(stored) as unknown;
    if (Array.isArray(parsed)) {
      return parsed.filter(isValidCountryCode).map((code) => code);
    }
    return [];
  } catch {
    return [];
  }
};

export const usePreferredCountries = () => {
  const [preferredCountries, setPreferredCountries] =
    useState<PreferredCountries>(getInitialPreferredCountries);

  const savePreferredCountries = useCallback((countries: CountryCode[]) => {
    const normalized = Array.from(
      new Set(countries.map((c) => c.toUpperCase())),
    );

    setPreferredCountries(normalized);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    }
  }, []);

  const clearPreferredCountries = useCallback(() => {
    setPreferredCountries([]);
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const hasPreferredCountries = useMemo(
    () => preferredCountries.length > 0,
    [preferredCountries],
  );

  return {
    preferredCountries,
    savePreferredCountries,
    clearPreferredCountries,
    hasPreferredCountries,
  };
};

export default usePreferredCountries;
