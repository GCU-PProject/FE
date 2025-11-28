import React, { useState } from 'react';
import { Calendar, ExternalLink, Globe, Newspaper, User } from 'lucide-react';

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
};

export type TabsProps = {
  defaultValue: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
};

export type TabsListProps = {
  className?: string;
  activeTab?: string;
  onTabChange?: (value: string) => void;
  children: React.ReactNode;
};

export type TabsTriggerProps = {
  className?: string;
  value: string;
  activeTab?: string;
  onTabClick?: (value: string) => void;
  children: React.ReactNode;
};

export type TabsContentProps = {
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
