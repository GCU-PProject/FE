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
  variant?: 'default' | 'secondary' | 'outline';
  children: React.ReactNode;
  className?: string;
};

export type DashboardTabsProps = {
  defaultValue: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
};

export type DashboardTabsListProps = {
  className?: string;
  activeTab?: string;
  onTabChange?: (value: string) => void;
  children: React.ReactNode;
};

export type DashboardTabsTriggerProps = {
  className?: string;
  value: string;
  activeTab?: string;
  onTabClick?: (value: string) => void;
  children: React.ReactNode;
};

export type DashboardTabsContentProps = {
  className?: string;
  value: string;
  activeTab?: string;
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
