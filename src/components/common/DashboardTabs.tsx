import React, { useState } from 'react';
import type {
  DashboardTabsProps,
  DashboardTabsListProps,
  DashboardTabsTriggerProps,
  DashboardTabsContentProps,
} from '@/types/news';

export const DashboardTabs = ({
                                defaultValue,
                                onValueChange,
                                children,
                              }: DashboardTabsProps) => {
  const [activeTab, setActiveTab] = useState<string>(defaultValue);

  const handleTabChange = (value: string): void => {
    setActiveTab(value);
    onValueChange(value);
  };

  const childArray = React.Children.toArray(children);

  const tabsList = childArray.find(
    (child): child is React.ReactElement<DashboardTabsListProps> =>
      React.isValidElement(child) && child.type === DashboardTabsList,
  );

  const tabsContents = childArray.filter(
    (child): child is React.ReactElement<DashboardTabsContentProps> =>
      React.isValidElement(child) && child.type === DashboardTabsContent,
  );

  return (
    <div className='flex flex-col'>
      {tabsList &&
        React.cloneElement(tabsList, {
          activeTab,
          onTabChange: handleTabChange,
        })}
      {tabsContents.map((content) =>
        React.cloneElement(content, {
          activeTab,
        }),
      )}
    </div>
  );
};

export const DashboardTabsList = ({
                                    className = '',
                                    activeTab,
                                    onTabChange,
                                    children,
                                  }: DashboardTabsListProps) => {
  const handleChange = onTabChange ?? (() => {});

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child as React.ReactElement<DashboardTabsTriggerProps>, {
          activeTab,
          onTabClick: handleChange,
        }),
      )}
    </div>
  );
};

export const DashboardTabsTrigger = ({
                                       className = '',
                                       value,
                                       activeTab,
                                       onTabClick,
                                       children,
                                     }: DashboardTabsTriggerProps) => {
  const isActive = activeTab === value;

  const handleClickTabButton = (): void => {
    onTabClick?.(value);
  };

  const baseClasses =
    'inline-flex items-center gap-2 rounded-full border px-4 py-2 ' +
    'text-sm font-medium transition-colors disabled:pointer-events-none ' +
    'disabled:opacity-50';

  const stateClasses = isActive
    ? 'border-brand-primary text-brand-primary bg-surface-elevated'
    : 'border-border-subtle text-secondary bg-surface hover:border-border-strong';

  return (
    <button
      type='button'
      onClick={handleClickTabButton}
      className={`${baseClasses} ${stateClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export const DashboardTabsContent = ({
                                       className = '',
                                       value,
                                       activeTab,
                                       children,
                                     }: DashboardTabsContentProps) =>
  activeTab === value ? (
    <div className={`mt-4 ${className}`}>{children}</div>
  ) : null;
