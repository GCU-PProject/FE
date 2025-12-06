import { useCallback, useMemo, useState } from 'react';
import type { CountryCode, PreferredCountries } from '@/types/country';

const STORAGE_KEY = 'preferredCountries';

const getInitialPreferredCountries = (): PreferredCountries => {
  if (typeof window === 'undefined') return [];
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];

  try {
    const parsed = JSON.parse(stored) as unknown;
    if (Array.isArray(parsed)) {
      return parsed
        .filter((code): code is CountryCode => typeof code === 'string')
        .map((code) => code.toUpperCase());
    }
    return [];
  } catch {
    return [];
  }
};

export const usePreferredCountries = () => {
  const [preferredCountries, setPreferredCountries] = useState<PreferredCountries>(
    getInitialPreferredCountries,
  );

  const savePreferredCountries = useCallback((countries: CountryCode[]) => {
    const normalized = Array.from(new Set(countries));

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
