import React, { useState } from 'react';

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
  activeTab: string;
  children: React.ReactNode;
};

/**
 * @description 대시보드용 탭 컨테이너
 */
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

  const enhancedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) {
      return child;
    }

    // 탭 버튼 리스트에만 상태 주입
    if (child.type === DashboardTabsList) {
      return React.cloneElement(
        child as React.ReactElement<DashboardTabsListProps>,
        {
          activeTab,
          onTabChange: handleTabChange,
        },
      );
    }

    // 나머지 자식들은 그대로 렌더
    return child;
  });

  return <div className='flex flex-col gap-4'>{enhancedChildren}</div>;
};

/**
 * @description 탭 버튼 묶음
 */
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
        React.cloneElement(
          child as React.ReactElement<DashboardTabsTriggerProps>,
          {
            activeTab,
            onTabClick: handleChange,
          },
        ),
      )}
    </div>
  );
};

/**
 * @description 개별 탭 버튼
 */
export const DashboardTabsTrigger = ({
                                       className = '',
                                       value,
                                       activeTab,
                                       onTabClick,
                                       children,
                                     }: DashboardTabsTriggerProps) => {
  const isActive = activeTab === value;

  const baseClasses =
    'inline-flex items-center gap-2 rounded-full border px-4 py-2 ' +
    'text-sm font-medium transition-colors disabled:pointer-events-none ' +
    'disabled:opacity-50';

  const stateClasses = isActive
    ? 'border-border-strong bg-surface-elevated text-primary shadow-xs'
    : 'border-border-subtle bg-surface text-secondary hover:border-border-strong';

  const handleClick = (): void => {
    onTabClick?.(value);
  };

  return (
    <button
      type='button'
      onClick={handleClick}
      className={`${baseClasses} ${stateClasses} ${className}`}
    >
      {children}
    </button>
  );
};

/**
 * @description 탭 콘텐츠 컨테이너
 * - value === activeTab 일 때만 children 렌더
 */
export const DashboardTabsContent = ({
                                       className = '',
                                       value,
                                       activeTab,
                                       children,
                                     }: DashboardTabsContentProps) =>
  activeTab === value ? (
    <div className={`space-y-4 ${className}`}>{children}</div>
  ) : null;
