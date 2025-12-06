import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'savedLaws';

const getInitialSavedIds = (): number[] => {
  if (typeof window === 'undefined') return [];
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed)
      ? parsed
          .filter((id): id is number => typeof id === 'number')
          .map((id) => Number(id))
      : [];
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
