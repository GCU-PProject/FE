import type React from 'react';

export type NewsItem = {
  id: number;
  title: string;
  country: string;
  countryCode: string; // US, JP, DE, SG, FR, TH
  source: string;
  sourceUrl: string;
  publishedAt: string;
  category: string;
};

export type CardProps = {
  className?: string;
  children: React.ReactNode;
};

export type BadgeProps = {
  variant?: 'default' | 'secondary' | 'outline' | 'tag';
  className?: string;
  children: React.ReactNode;
};

export type NewsCardProps = {
  news: NewsItem;
};

export type EmptyStateProps = {
  message: string;
};

export type FilteredNewsListProps = {
  value: string;
  activeTab: string;
  news: NewsItem[];
  emptyMessage: string;
};
