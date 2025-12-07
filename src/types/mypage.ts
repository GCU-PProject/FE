import type { PreferredCountries } from '@/types/country';
import type { LawItem } from '@/types/law';

export type CompareSet = {
  id: number;
  title: string;
  countries: PreferredCountries;
  lastViewedAt?: string;
};

export type BookmarkItem = LawItem;

