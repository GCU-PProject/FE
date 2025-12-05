import React, { useState } from 'react';

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

/* ------------------------------------------------------------
   DashboardTabs (Container)
------------------------------------------------------------ */
export const DashboardTabs = ({
                                defaultValue,
                                value,
                                onValueChange,
                                children,
                              }: DashboardTabsProps) => {
  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] =
    useState<string>(defaultValue);

  const activeTab = isControlled ? value ?? defaultValue : uncontrolledValue;

  const handleTabChange = (value: string): void => {
    if (!isControlled) {
      setUncontrolledValue(value);
    }
    onValueChange(value);
  };

  const enhancedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;

    const childType = child.type as { displayName?: string };
    const isTabsList =
      child.type === DashboardTabsList ||
      childType?.displayName === 'DashboardTabsList';

    if (isTabsList) {
      return React.cloneElement(
        child as React.ReactElement<DashboardTabsListProps>,
        {
          activeTab,
          onTabChange: handleTabChange,
        }
      );
    }

    return child;
  });

  return <div className="flex flex-col gap-4">{enhancedChildren}</div>;
};

DashboardTabs.displayName = 'DashboardTabs';

/* ------------------------------------------------------------
   Tabs List (Button Group)
------------------------------------------------------------ */
export const DashboardTabsList = ({
                                    className = '',
                                    activeTab,
                                    onTabChange,
                                    children,
                                  }: DashboardTabsListProps) => {
  const handleChange = onTabChange ?? (() => {});

  return (
    <div
      className={`flex items-center gap-2 ${className}`}
      role="tablist"
      aria-label="대시보드 탭"
    >
      {React.Children.map(children, (child) =>
        React.cloneElement(
          child as React.ReactElement<DashboardTabsTriggerProps>,
          {
            activeTab,
            onTabClick: handleChange,
          }
        )
      )}
    </div>
  );
};

DashboardTabsList.displayName = 'DashboardTabsList';

/* ------------------------------------------------------------
   Tabs Trigger (Each Button)
------------------------------------------------------------ */
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
    'text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50';

  // ⭐ 클릭 시 회색 배경 적용된 버전
  const stateClasses = isActive
    ? 'border-gray-300 bg-gray-100 text-gray-900 shadow-sm'
    : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-50';

  const handleClick = (): void => {
    onTabClick?.(value);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${baseClasses} ${stateClasses} ${className}`}
      role="tab"
      aria-selected={isActive}
      aria-pressed={isActive}
    >
      {children}
    </button>
  );
};

DashboardTabsTrigger.displayName = 'DashboardTabsTrigger';

/* ------------------------------------------------------------
   Tabs Content (Tab Panel)
------------------------------------------------------------ */
export const DashboardTabsContent = ({
                                       className = '',
                                       value,
                                       activeTab,
                                       children,
                                     }: DashboardTabsContentProps) =>
  activeTab === value ? (
    <div className={`space-y-4 ${className}`}>{children}</div>
  ) : null;

DashboardTabsContent.displayName = 'DashboardTabsContent';
