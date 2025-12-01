import { ReactNode } from 'react';

export type HeaderNavItem = {
  id: string;
  label: string;
  href?: string;
  icon?: ReactNode;
};

export type HeaderProps = {
  navItems?: HeaderNavItem[];
  activeNavId?: string;
  onNavSelect?: (id: string) => void;
  rightAddon?: ReactNode;
  userLabel?: string;
  onLogoClick?: () => void;
  onUserClick?: () => void;
  className?: string;
};
