import React, {
  createContext,
  useContext,
  useId,
  useCallback,
  useMemo,
  useState,
} from 'react';
import type {
  DashboardTabsContentProps,
  DashboardTabsListProps,
  DashboardTabsProps,
  DashboardTabsTriggerProps,
} from '@/types/tabs';

type DashboardTabsContextValue = {
  activeTab: string;
  onTabChange: (value: string) => void;
  getTabId: (value: string) => string;
  getPanelId: (value: string) => string;
};

const DashboardTabsContext =
  createContext<DashboardTabsContextValue | null>(null);

const useDashboardTabsContext = () => useContext(DashboardTabsContext);

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
  const tabsId = useId();

  const handleTabChange = useCallback(
    (nextValue: string): void => {
      if (!isControlled) {
        setUncontrolledValue(nextValue);
      }
      onValueChange(nextValue);
    },
    [isControlled, onValueChange],
  );

  const contextValue = useMemo(
    () => ({
      activeTab,
      onTabChange: handleTabChange,
      getTabId: (val: string) => `${tabsId}-tab-${val}`,
      getPanelId: (val: string) => `${tabsId}-panel-${val}`,
    }),
    [activeTab, handleTabChange, tabsId],
  );

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
          tabsId,
        },
      );
    }

    return child;
  });

  return (
    <DashboardTabsContext.Provider value={contextValue}>
      <div className="flex flex-col gap-4">{enhancedChildren}</div>
    </DashboardTabsContext.Provider>
  );
};

DashboardTabs.displayName = 'DashboardTabs';

/* ------------------------------------------------------------
   Tabs List (Button Group)
------------------------------------------------------------ */
export const DashboardTabsList = ({
  className = '',
  activeTab,
  onTabChange,
  tabsId,
  children,
}: DashboardTabsListProps) => {
  const ctx = useDashboardTabsContext();
  const currentActiveTab = ctx?.activeTab ?? activeTab;
  const handleChange = ctx?.onTabChange ?? onTabChange ?? (() => {});

  return (
    <div
      className={`flex items-center gap-2 ${className}`}
      role="tablist"
      aria-label="대시보드 탭"
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;

        const childProps = child.props as DashboardTabsTriggerProps;
        const valueProp = childProps.value;

        const fallbackTabId = tabsId
          ? `${tabsId}-tab-${valueProp}`
          : undefined;
        const fallbackPanelId = tabsId
          ? `${tabsId}-panel-${valueProp}`
          : undefined;

        return React.cloneElement(
          child as React.ReactElement<DashboardTabsTriggerProps>,
          {
            activeTab: currentActiveTab,
            onTabClick: handleChange,
            tabId: ctx ? ctx.getTabId(valueProp) : fallbackTabId,
            panelId: ctx ? ctx.getPanelId(valueProp) : fallbackPanelId,
          },
        );
      })}
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
  tabId,
  panelId,
  children,
}: DashboardTabsTriggerProps) => {
  const ctx = useDashboardTabsContext();
  const currentActiveTab = ctx?.activeTab ?? activeTab;
  const isActive = currentActiveTab === value;

  const resolvedTabId = ctx ? ctx.getTabId(value) : tabId;
  const resolvedPanelId = ctx ? ctx.getPanelId(value) : panelId;

  const baseClasses =
    'inline-flex items-center gap-2 rounded-full border px-4 py-2 ' +
    'text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50';

  const stateClasses = isActive
    ? 'border-gray-300 bg-gray-100 text-gray-900 shadow-sm'
    : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-50';

  const handleClick = (): void => {
    ctx?.onTabChange?.(value);
    onTabClick?.(value);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${baseClasses} ${stateClasses} ${className}`}
      role="tab"
      aria-selected={isActive}
      id={resolvedTabId}
      aria-controls={resolvedPanelId}
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
  tabId,
  panelId,
  children,
}: DashboardTabsContentProps) => {
  const ctx = useDashboardTabsContext();
  const currentActiveTab = ctx?.activeTab ?? activeTab;
  if (currentActiveTab !== value) return null;

  const resolvedPanelId = ctx ? ctx.getPanelId(value) : panelId;
  const resolvedLabelId = ctx ? ctx.getTabId(value) : tabId;

  return (
    <div
      className={`space-y-4 ${className}`}
      role="tabpanel"
      id={resolvedPanelId}
      aria-labelledby={resolvedLabelId}
    >
      {children}
    </div>
  );
};

DashboardTabsContent.displayName = 'DashboardTabsContent';
