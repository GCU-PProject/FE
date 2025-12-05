import { Calendar, ExternalLink, Newspaper } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import type { NewsCardProps } from '@/types/news';

export const NewsCard = ({ news }: NewsCardProps) => (
  <a
    key={news.id}
    href={news.sourceUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="block"
  >
    <Card className="bg-white p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer border-border-subtle">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="outline">{news.country}</Badge>
            <Badge variant="secondary" className="bg-gray-100 text-gray-700 ">
              {news.category}
            </Badge>
          </div>

          <h3 className="text-base sm:text-lg font-semibold mb-2 text-primary hover:text-brand-primary transition-colors line-clamp-2">
            {news.title}
          </h3>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-secondary">
            <div className="flex items-center gap-1">
              <Newspaper className="w-4 h-4 text-text-secondary" />
              <span>{news.source}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-text-secondary" />
              <span>{news.publishedAt}</span>
            </div>
          </div>
        </div>

        <ExternalLink className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
      </div>
    </Card>
  </a>
);
