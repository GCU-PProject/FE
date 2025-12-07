import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'savedLaws';

const getInitialSavedIds = (): number[] => {
  if (typeof window === 'undefined') return [];
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    const raw = JSON.parse(stored) as unknown;
    if (!Array.isArray(raw)) return [];

    return raw
      .filter((id): id is number | string => {
        const t = typeof id;
        return t === 'number' || t === 'string';
      })
      .filter((id): id is number => Number.isFinite(id));
  } catch {
    return [];
  }
};

export const useSavedLaws = () => {
  const [savedIds, setSavedIds] = useState<number[]>(getInitialSavedIds);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(savedIds));
  }, [savedIds]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const raw = JSON.parse(e.newValue) as unknown;
          if (!Array.isArray(raw)) return;

          const next = raw
            .filter((id): id is number | string => {
              const t = typeof id;
              return t === 'number' || t === 'string';
            })
            .map((id) => Number(id))
            .filter((id): id is number => Number.isFinite(id));

          setSavedIds(next);
        } catch (error) {
          console.warn('Failed to sync saved laws from storage', error);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const toggleSaved = useCallback((id: number) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  }, []);

  return {
    savedIds,
    toggleSaved,
  };
};

export default useSavedLaws;
