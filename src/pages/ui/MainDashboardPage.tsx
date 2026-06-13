import { Globe } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { EmptyState } from '@/components/dashboard/EmptyState';
import { NewsCard } from '@/components/dashboard/NewsCard';
import { mockNews } from '@/mocks/news';
import type { NewsItem } from '@/types/news';

export const MainDashboardPage = () => {
  const news: NewsItem[] = mockNews;

  return (
    <div className="min-h-screen font-sans">
      <Header />

      <main className="pb-8">
        <header className="mb-8 mt-6 pl-4 sm:mt-8 sm:pl-6 lg:pl-8">
          <div className="mb-1 flex items-center gap-3">
            <Globe className="h-9 w-9 text-brand-primary" strokeWidth={2.2} />
            <h1 className="text-[28px] font-medium leading-tight text-text-primary sm:text-[32px]">
              해외 이슈 대시보드
            </h1>
          </div>
          <p className="text-sm text-text-secondary sm:text-base">
            해외 주요 법률 및 정책 개정 소식을 확인하세요
          </p>
        </header>

        <div className="bg-bg-soft">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="space-y-4">
              {news.length === 0 ? (
                <EmptyState message="현재 등록된 해외 이슈가 없습니다." />
              ) : (
                news.map((item) => <NewsCard key={item.id} news={item} />)
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainDashboardPage;
