import type { FilteredNewsListProps } from '@/types/news';
import { DashboardTabsContent } from '@/components/common/DashboardTabs';
import { EmptyState } from '@/components/dashboard/EmptyState';
import { NewsCard } from '@/components/dashboard/NewsCard';

export const FilteredNewsList = ({
                                   value,
                                   activeTab,
                                   news,
                                   emptyMessage,
                                 }: FilteredNewsListProps) => (
  <DashboardTabsContent value={value} activeTab={activeTab} >
    {news.length === 0 ? (
      <EmptyState message={emptyMessage} />
    ) : (
      news.map((item) => <NewsCard key={item.id} news={item} />)
    )}
  </DashboardTabsContent>
);
