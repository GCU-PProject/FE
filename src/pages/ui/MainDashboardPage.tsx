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
import { mockNews, mockUserInterests } from '@/mocks/news';
import type { NewsItem } from '@/types/news';

/**
 * @description 글로벌 정책/법률 변경 대시보드 메인 컴포넌트
 */
export const MainDashboardPage = () => {
  // 실제 API 연동 시 mockNews, mockUserInterests 대체
  const news: NewsItem[] = mockNews;
  const userInterests: string[] = mockUserInterests;

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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 페이지 타이틀 영역 */}
        <header className="mb-8">

          <h1 className="text-2xl sm:text-3xl font-extrabold text-primary mb-1">
            <Globe className="inline-block w-6 h-6 mr-3 text-brand-primary" />
            해외 이슈 대시보드
          </h1>
          <p className="text-sm sm:text-base text-secondary">
            해외 주요 법률 및 정책 개정 소식을 확인하세요.
          </p>
        </header>

        {/* 탭 + 리스트 영역 */}

        <DashboardTabs defaultValue="all" onValueChange={onChangeTab}>
          {/* 전체 / 관심 국가 탭 */}
          <DashboardTabsList className="mb-6 flex flex-wrap">
            <DashboardTabsTrigger value="all">
              <Globe className="w-4 h-4 mr-2" />
              전체 이슈 ({news.length})
            </DashboardTabsTrigger>

            <DashboardTabsTrigger value="interests">
              <User className="w-4 h-4 mr-2 text-brand-primary" />
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
      </main>
      </div>
  );
};

export default MainDashboardPage;
