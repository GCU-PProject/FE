import { ReactNode } from 'react';
import { UserRound } from 'lucide-react';
import { NavButton } from './NavButton';
import { HeaderNavItem } from './types';

interface MobileMenuProps {
  navItems: HeaderNavItem[];
  resolvedActiveNavId?: string;
  isControlled: boolean;
  navigateTo: (href: string) => void;
  onSelectNav: (id: string) => void;
  onSelectUncontrolled: (id: string) => void;
  closeMobile: () => void;
  rightAddon?: ReactNode;
  onUserClick?: () => void;
  navigateUserFallback: () => void;
  userLabel: string;
}

/** 모바일 메뉴 드로어 (햄버거 토글 시 표시) */
export function MobileMenu({
  navItems,
  resolvedActiveNavId,
  isControlled,
  navigateTo,
  onSelectNav,
  onSelectUncontrolled,
  closeMobile,
  rightAddon,
  onUserClick,
  navigateUserFallback,
  userLabel,
}: MobileMenuProps) {
  const handleUserClick = () => {
    if (onUserClick) {
      onUserClick();
    } else {
      navigateUserFallback();
    }
    closeMobile();
  };

  return (
    <div className="md:hidden border-t border-border-base">
      <div className="mx-auto flex max-w-[1184px] flex-col gap-2 px-4 py-3 sm:px-6">
        <div className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const isActive = item.id === resolvedActiveNavId;
            return (
              <NavButton
                key={item.id}
                item={item}
                isActive={isActive}
                onSelect={() => {
                  if (item.href) {
                    navigateTo(item.href);
                  }
                  if (!isControlled) {
                    onSelectUncontrolled(item.id);
                  }
                  onSelectNav(item.id);
                  closeMobile();
                }}
              />
            );
          })}
          {rightAddon ?? (
            <NavButton
              item={{
                id: 'user',
                label: userLabel,
                icon: <UserRound className="h-5 w-5" strokeWidth={2} />,
              }}
              isActive={false}
              onSelect={handleUserClick}
              className="font-normal hover:font-medium"
            />
          )}
        </div>
      </div>
    </div>
  );
}
