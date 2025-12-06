import type React from 'react';

export type DashboardTabsProps = {
  defaultValue: string;
  value?: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
};

export type DashboardTabsListProps = {
  className?: string;
  activeTab?: string;
  onTabChange?: (value: string) => void;
  tabsId?: string;
  children: React.ReactNode;
};

export type DashboardTabsTriggerProps = {
  className?: string;
  value: string;
  activeTab?: string;
  onTabClick?: (value: string) => void;
  tabId?: string;
  panelId?: string;
  children: React.ReactNode;
};

export type DashboardTabsContentProps = {
  className?: string;
  value: string;
  activeTab?: string;
  tabId?: string;
  panelId?: string;
  children: React.ReactNode;
};
