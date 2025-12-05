import { Globe, User } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import {
  DashboardTabs,
  DashboardTabsList,
  DashboardTabsTrigger,
} from '@/components/common/DashboardTabs';
import { FilteredNewsList } from '@/components/dashboard/FilteredNewsList';
import { useTabsState } from '@/hooks/useTabsState';
import { useFilteredNews } from '@/hooks/useFilteredNews';
import { mockNews } from '@/mocks/news';
import type { NewsItem } from '@/types/news';

/**
 * @description 글로벌 정책/법률 변경 대시보드 메인 컴포넌트
 */
type MainDashboardPageProps = {
  preferredCountries: string[];
};

export const MainDashboardPage = ({
  preferredCountries,
}: MainDashboardPageProps) => {
  // 실제 API 연동 시 mockNews 대체
  const news: NewsItem[] = mockNews;
  const userInterests: string[] = preferredCountries;

  const { selectedTab, onChangeTab } = useTabsState(news);

  const { newsToShow, interestNews } = useFilteredNews(
    news,
    userInterests,
    selectedTab,
  );

  return (
    <div className="min-h-screen font-sans">
      {/* 공통 레이아웃 헤더 */}
      <Header />

      {/* 페이지 본문 */}
      <main className="pb-8">
        {/* 페이지 타이틀 영역 */}
        <header className="mt-6 sm:mt-8 mb-8 pl-4 sm:pl-6 lg:pl-8">
          <div className="flex items-center gap-3 mb-1">
            <Globe className="w-7 h-7 text-brand-primary" />
            <h1 className="text-[28px] font-medium leading-tight text-text-primary sm:text-[32px]">
              해외 이슈 대시보드
            </h1>
          </div>
          <p className="text-sm sm:text-base text-text-secondary">
            해외 주요 법률 및 정책 개정 소식을 확인하세요.
          </p>
        </header>

        {/* 회색 배경 전체 영역 */}
        <div className="bg-[#F2F4F6]">
          {/* 중앙 컨텐츠 영역 max-width 적용 */}
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
            {/* 탭 + 리스트 영역 */}
            <DashboardTabs
              defaultValue="all"
              value={selectedTab}
              onValueChange={onChangeTab}
            >
              {/* 전체 / 관심 국가 탭 */}
              <DashboardTabsList className="mb-6 flex flex-wrap">
                <DashboardTabsTrigger value="all">
                  <Globe className="w-4 h-4 mr-2" />
                  전체 이슈 ({news.length})
                </DashboardTabsTrigger>

                <DashboardTabsTrigger value="interests">
                  <User className="w-4 h-4 mr-2 text-[#6B7280]" />
                  관심 국가 이슈 ({interestNews.length})
                </DashboardTabsTrigger>
              </DashboardTabsList>

              {/* 전체 이슈 리스트 */}
              <FilteredNewsList
                value="all"
                activeTab={selectedTab}
                news={newsToShow}
                emptyMessage="선택하신 국가의 최신 이슈가 없습니다."
              />

              {/* 관심 국가 이슈 리스트 */}
              <FilteredNewsList
                value="interests"
                activeTab={selectedTab}
                news={interestNews}
                emptyMessage="설정한 관심 국가에 해당하는 최신 이슈가 없습니다."
              />
            </DashboardTabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainDashboardPage;
