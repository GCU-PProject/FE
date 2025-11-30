import { useCallback, useMemo, useState } from 'react';
import type { NewsItem } from '@/types/news';

export const useTabsState = (news: NewsItem[]) => {
  const [selectedTab, setSelectedTab] = useState<string>('all');

  const allCountryCodes: string[] = useMemo(
    () =>
      Array.from(new Set(news.map((item) => item.countryCode))).sort(),
    [news],
  );

  const handleChangeTab = useCallback((value: string): void => {
    setSelectedTab(value);
  }, []);

  return {
    selectedTab,
    onChangeTab: handleChangeTab,
    allCountryCodes,
  };
};
