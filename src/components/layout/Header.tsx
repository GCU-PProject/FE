import { useEffect, useMemo, useState } from 'react';
import {
  GitCompare,
  Menu,
  MessageSquare,
  Scale,
  UserRound,
  X,
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { MobileMenu } from './MobileMenu';
import { NavButton } from './NavButton';
import { HeaderNavItem, HeaderProps } from './types';

/** 상단 공통 헤더: 데스크톱은 로고/네비/유저, 모바일은 햄버거로 토글 */
const defaultNavItems: HeaderNavItem[] = [
  {
    id: 'law-collection',
    label: '법률 모아보기',
    href: '/law-collection',
    icon: <Scale className="h-5 w-5" strokeWidth={2.1} />,
  },
  {
    id: 'ai-consulting',
    label: 'AI 법률 상담',
    href: '/ai-consulting',
    icon: <MessageSquare className="h-5 w-5" strokeWidth={2} />,
  },
  {
    id: 'law-compare',
    label: '법률 비교',
    href: '/law-compare',
    icon: <GitCompare className="h-5 w-5" strokeWidth={2} />,
  },
];

export function Header({
  navItems = defaultNavItems,
  activeNavId,
  onNavSelect,
  rightAddon,
  userLabel = '마이페이지',
  onLogoClick,
  onUserClick,
  className,
}: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false); // 모바일 메뉴 토글 상태

  // 현재 경로와 일치하는 메뉴 id 찾기
  const isControlled = activeNavId !== undefined;
  const locationMatchedNavId = useMemo(() => {
    return navItems.find(
      (item) =>
        item.href &&
        (location.pathname === item.href ||
          (item.href !== '/' && location.pathname.startsWith(item.href))),
    )?.id;
  }, [location.pathname, navItems]);
  const [internalActiveNavId, setInternalActiveNavId] = useState<
    string | undefined
  >(activeNavId ?? locationMatchedNavId);

  useEffect(() => {
    if (isControlled) {
      setInternalActiveNavId(activeNavId);
    }
  }, [activeNavId, isControlled]);

  // 비제어 모드에서 경로가 변할 때 활성 메뉴를 자동 갱신
  useEffect(() => {
    if (!isControlled) {
      setInternalActiveNavId(locationMatchedNavId ?? undefined);
    }
  }, [isControlled, locationMatchedNavId, navItems]);

  const resolvedActiveNavId = isControlled ? activeNavId : internalActiveNavId;
  const closeMobile = () => setIsMobileOpen(false);
  const navigateTo = (href: string) => void navigate(href);

  return (
    <header
      className={cn('h-[72px] border-b border-border-base bg-white', className)}
    >
      <div className="mx-auto flex h-full max-w-[1184px] items-center justify-between px-4 sm:px-6 md:px-8">
        <div className="flex items-center gap-8">
          <button
            type="button"
            onClick={() => {
              if (onLogoClick) {
                onLogoClick();
              } else {
                navigateTo('/');
              }
              if (!isControlled) {
                setInternalActiveNavId(undefined);
              }
              closeMobile();
            }}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center text-brand-primary">
              <Scale className="h-6 w-6" strokeWidth={2.1} />
            </div>
            <span className="text-xl font-medium leading-tight text-text-primary">
              G.law
            </span>
          </button>

          <nav className="hidden items-center gap-4 text-sm md:flex">
            {navItems.map((item: HeaderNavItem) => {
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
                      setInternalActiveNavId(item.id);
                    }
                    onNavSelect?.(item.id);
                    closeMobile();
                  }}
                />
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {rightAddon ?? (
            <button
              type="button"
              onClick={() => {
                if (onUserClick) {
                  onUserClick();
                } else {
                  navigateTo('/mypage');
                }
                closeMobile();
              }}
              className="hidden items-center gap-2 text-base font-normal text-text-secondary transition-colors hover:text-text-primary md:flex"
            >
              <UserRound className="h-5 w-5" strokeWidth={2} />
              <span>{userLabel}</span>
            </button>
          )}

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-text-primary transition-colors hover:bg-bg-soft md:hidden"
            onClick={() => setIsMobileOpen((prev) => !prev)}
            aria-label="메뉴 열기"
          >
            {isMobileOpen ? (
              <X className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Menu className="h-6 w-6" strokeWidth={2} />
            )}
          </button>
        </div>
      </div>

      {isMobileOpen ? (
        <MobileMenu
          navItems={navItems}
          resolvedActiveNavId={resolvedActiveNavId}
          isControlled={isControlled}
          navigateTo={navigateTo}
          onSelectNav={(id) => onNavSelect?.(id)}
          onSelectUncontrolled={(id) => setInternalActiveNavId(id)}
          closeMobile={closeMobile}
          rightAddon={rightAddon}
          onUserClick={onUserClick}
          navigateUserFallback={() => navigateTo('/mypage')}
          userLabel={userLabel}
        />
      ) : null}
    </header>
  );
}

export default Header;
