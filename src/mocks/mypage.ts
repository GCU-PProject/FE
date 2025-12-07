import type { BookmarkItem, CompareSet } from '@/types/mypage';

export const mockBookmarks: BookmarkItem[] = [
  {
    id: 101,
    country: '일본',
    countryCode: 'JP',
    category: '교통',
    field: 'traffic',
    title: '道路交通法',
    subTitle: '도로교통법',
    description: '음주운전 및 교통안전 관련 핵심 규정을 확인하세요.',
    updatedAt: '2024-02-20',
    saved: true,
    sourceUrl: 'https://example.com/jp/traffic-law',
  },
  {
    id: 102,
    country: '프랑스',
    countryCode: 'FR',
    category: '교통',
    field: 'traffic',
    title: 'Code de la route',
    subTitle: '도로법전',
    description: '프랑스 교통법 주요 조항 및 업데이트 내역',
    updatedAt: '2024-02-14',
    saved: true,
    sourceUrl: 'https://example.com/fr/traffic-law',
  },
];

export const mockCompareSets: CompareSet[] = [
  {
    id: 201,
    title: '음주운전 처벌',
    countries: ['US', 'JP'],
    lastViewedAt: '2024-03-05',
  },
  {
    id: 202,
    title: '근로시간 제한',
    countries: ['DE', 'FR'],
    lastViewedAt: '2024-02-18',
  },
];
