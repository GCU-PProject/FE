import { useMemo } from 'react';
import type { NewsItem } from '@/types/news';

export const useFilteredNews = (
  news: NewsItem[],
  userInterests: string[],
  selectedTab: string,
) => {
  const filteredNewsByCountry: NewsItem[] = useMemo(
    () =>
      news.filter(
        (item) =>
          selectedTab === 'all' || item.countryCode === selectedTab,
      ),
    [news, selectedTab],
  );

  const interestNews: NewsItem[] = useMemo(
    () => news.filter((item) => userInterests.includes(item.countryCode)),
    [news, userInterests],
  );

  const newsToShow: NewsItem[] = useMemo(
    () =>
      selectedTab === 'interests'
        ? interestNews
        : filteredNewsByCountry,
    [filteredNewsByCountry, interestNews, selectedTab],
  );

  return {
    filteredNewsByCountry,
    interestNews,
    newsToShow,
  };
};
