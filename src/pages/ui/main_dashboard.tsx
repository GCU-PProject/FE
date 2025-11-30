import React, { useState } from 'react';
import { Calendar, ExternalLink, Globe, Newspaper, User } from 'lucide-react';

export type NewsItem = {
  id: number;
  title: string;
  country: string;
  countryCode: string; // US, JP, DE, SG, FR, TH
  source: string;
  sourceUrl: string;
  publishedAt: string;
  category: string;
};

export type CardProps = {
  className?: string;
  children: React.ReactNode;
};

export type BadgeProps = {
  variant?: 'default' | 'secondary' | 'outline';
  children: React.ReactNode;
};

export type TabsProps = {
  defaultValue: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
};

export type TabsListProps = {
  className?: string;
  activeTab?: string;
  onTabChange?: (value: string) => void;
  children: React.ReactNode;
};

export type TabsTriggerProps = {
  className?: string;
  value: string;
  activeTab?: string;
  onTabClick?: (value: string) => void;
  children: React.ReactNode;
};

export type TabsContentProps = {
  className?: string;
  value: string;
  activeTab?: string;
  children: React.ReactNode;
};

export type NewsCardProps = {
  news: NewsItem;
};

export type EmptyStateProps = {
  message: string;
};


// 2. Mock Data (추후에 api 연결 후 하드코딩 제거해야함)


const MOCK_NEWS: NewsItem[] = [
  {
    id: 1,
    title: '미국 캘리포니아주, 2025년부터 플라스틱 빨대 전면 금지',
    country: '미국',
    countryCode: 'US',
    source: 'Reuters',
    sourceUrl: 'https://www.reuters.com',
    publishedAt: '2024-10-28',
    category: '환경',
  },
  {
    id: 2,
    title: '일본, 외국인 근로자 최저임금 10% 인상 법안 통과',
    country: '일본',
    countryCode: 'JP',
    source: 'Japan Times',
    sourceUrl: 'https://www.japantimes.co.jp',
    publishedAt: '2024-10-27',
    category: '노동',
  },
  {
    id: 3,
    title: '독일 연방의회, 데이터 보호법 개정안 승인',
    country: '독일',
    countryCode: 'DE',
    source: 'Deutsche Welle',
    sourceUrl: 'https://www.dw.com',
    publishedAt: '2024-10-26',
    category: '개인정보',
  },
  {
    id: 4,
    title: '싱가포르, 암호화폐 거래 규제 강화 발표',
    country: '싱가포르',
    countryCode: 'SG',
    source: 'The Straits Times',
    sourceUrl: 'https://www.straitstimes.com',
    publishedAt: '2024-10-25',
    category: '금융',
  },
  {
    id: 5,
    title: '프랑스, 원격근무 권리 보장 법률 시행',
    country: '프랑스',
    countryCode: 'FR',
    source: 'Le Monde',
    sourceUrl: 'https://www.lemonde.fr',
    publishedAt: '2024-10-24',
    category: '노동',
  },
  {
    id: 6,
    title: '태국, 관광 비자 면제 기간 45일로 연장',
    country: '태국',
    countryCode: 'TH',
    source: 'Bangkok Post',
    sourceUrl: 'https://www.bangkokpost.com',
    publishedAt: '2024-10-23',
    category: '이민',
  },
  {
    id: 7,
    title: '한국, 청년 고용 촉진을 위한 세제 혜택 확대',
    country: '한국',
    countryCode: 'KR',
    source: 'Yonhap News',
    sourceUrl: 'https://www.yonhapnews.co.kr',
    publishedAt: '2024-10-22',
    category: '노동',
  },
];

// 임시로 관심 국가 설정 (US, JP, DE를 관심 국가로)
const mockUserInterests: string[] = ['US', 'JP', 'DE'];

// 3. UI Components (Shadcn/ui 단순화 재구현)


/**
 * @description 카드 컴포넌트 (UI Wrapper)
 */
export const Card = ({ className = '', children }: CardProps) => (
  <div
    className={`rounded-lg border bg-white text-card-foreground shadow-sm ${className}`}
  >
    {children}
  </div>
);

/**
 * @description 뱃지 컴포넌트 (카테고리 표시)
 */
export const Badge = ({ variant = 'default', children }: BadgeProps) => {
  const baseClasses =
    'inline-flex items-center rounded-full border px-2.5 py-0.5 ' +
    'text-xs font-semibold transition-colors focus:outline-none ' +
    'focus:ring-2 focus:ring-ring focus:ring-offset-2';

  let variantClasses = '';

  switch (variant) {
    case 'secondary':
      variantClasses =
        'border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200';
      break;
    case 'outline':
      variantClasses = 'text-gray-600 border-gray-300';
      break;
    default:
      variantClasses =
        'border-transparent bg-blue-500 text-white hover:bg-blue-600';
      break;
  }

  return <div className={`${baseClasses} ${variantClasses}`}>{children}</div>;
};

/**
 * @description 탭 컨테이너 로직
 */

export const Tabs = ({ defaultValue, onValueChange, children }: TabsProps) => {
  const [activeTab, setActiveTab] = useState<string>(defaultValue);

  /**
   * @description 탭 변경을 처리하는 핸들러 함수
   */
  const handleTabChange = (value: string): void => {
    setActiveTab(value);
    onValueChange(value);
  };

  // children을 배열로 변환
  const childArray = React.Children.toArray(children);

  // TabsList만 골라내기 (타입 가드 사용)
  const tabsList = childArray.find(
    (child): child is React.ReactElement<TabsListProps> =>
      React.isValidElement(child) && child.type === TabsList,
  );

  // TabsContent만 골라내기 (타입 가드 사용)
  const tabsContents = childArray.filter(
    (child): child is React.ReactElement<TabsContentProps> =>
      React.isValidElement(child) && child.type === TabsContent,
  );

  return (
    <div className='flex flex-col'>
      {tabsList &&
        React.cloneElement(tabsList, {
          activeTab,
          onTabChange: handleTabChange,
        })}
      {tabsContents.map((content) =>
        React.cloneElement(content, {
          activeTab,
        }),
      )}
    </div>
  );
};


/**
 * @description 탭 버튼 리스트
 */
/**
 * @description 탭 버튼 리스트
 */
export const TabsList = ({
                           className = '',
                           activeTab,
                           onTabChange,
                           children,
                         }: TabsListProps) => {
  const handleChange = onTabChange ?? (() => {});

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === TabsTrigger) {
          return React.cloneElement(child as React.ReactElement<TabsTriggerProps>, {
            activeTab,
            onTabClick: handleChange,
          });
        }
        return child;
      })}
    </div>
  );
};

/**
 * @description 탭 버튼
 */
export const TabsTrigger = ({
                              className = '',
                              value,
                              activeTab,
                              onTabClick,
                              children,
                            }: TabsTriggerProps) => {
  const isActive = activeTab === value;

  /**
   * @description 탭 버튼 클릭 이벤트 핸들러
   */
  const handleClickTabButton = (): void => {
    onTabClick?.(value);
  };

  const baseClasses =
    'inline-flex items-center gap-2 rounded-full border px-4 py-2 ' +
    'text-sm font-medium transition-colors disabled:pointer-events-none ' +
    'disabled:opacity-50';

  const stateClasses = isActive
    ? 'border-gray-900 text-gray-900 bg-white'
    : 'border-gray-300 text-gray-600 bg-white hover:border-gray-400';

  return (
    <button
      type='button'
      role='tab'
      id={`tab-${value}`}
      aria-controls={`panel-${value}`}
      aria-selected={isActive}
      onClick={handleClickTabButton}
      className={`${baseClasses} ${stateClasses} ${className}`}
    >
      {children}
    </button>
  );
};


/**
 * @description 탭 내용 컨테이너
 */
export const TabsContent = ({
                              className = '',
                              value,
                              activeTab,
                              children,
                            }: TabsContentProps) =>
  activeTab === value ? (
    <div
      role='tabpanel'
      id={`panel-${value}`}
      aria-labelledby={`tab-${value}`}
      className={`mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}
    >
      {children}
    </div>
  ) : null;

/**
 * @description 개별 뉴스 카드를 렌더링하는 컴포넌트
 */
export const NewsCard = ({ news }: NewsCardProps) => (
  <a
    href={news.sourceUrl}
    target='_blank'
    rel='noopener noreferrer'
    className='block'
  >
    <Card className='p-4 sm:p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer border-gray-200'>
      <div className='flex items-start justify-between gap-4'>
        <div className='flex-1 min-w-0'>
          {/* Badge Section */}
          <div className='flex items-center gap-2 mb-2 sm:mb-3'>
            <Badge variant='outline'>{news.country}</Badge>
            <Badge variant='secondary'>{news.category}</Badge>
          </div>

          {/* Title */}
          <h3 className='text-base sm:text-xl font-semibold mb-3 text-gray-800 hover:text-blue-600 transition-colors line-clamp-2'>
            {news.title}
          </h3>

          {/* Metadata */}
          <div className='flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-gray-500'>
            <div className='flex items-center gap-1'>
              <Newspaper className='w-3 h-3 sm:w-4 sm:h-4 text-blue-500' />
              <span>{news.source}</span>
            </div>
            <div className='flex items-center gap-1'>
              <Calendar className='w-3 h-3 sm:w-4 sm:h-4 text-blue-500' />
              <span>{news.publishedAt}</span>
            </div>
          </div>
        </div>

        {/* Link Icon */}
        <ExternalLink className='w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0 mt-1' />
      </div>
    </Card>
  </a>
);

/**
 * @description 데이터가 없을 때 표시되는 빈 상태 컴포넌트
 */
export const EmptyState = ({ message }: EmptyStateProps) => (
  <Card className='p-8 sm:p-12 text-center border-dashed border-2 border-gray-300 bg-gray-50'>
    <Newspaper className='w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-4' />
    <p className='text-lg font-medium text-gray-600'>{message}</p>
  </Card>
);


// 4. 메인 애플리케이션 컴포넌트 (Named Export)


/**
 * @description 글로벌 정책/법률 변경 대시보드 메인 컴포넌트
 */
export const App = () => {
  // TODO: API를 통해 userInterests와 MOCK_NEWS를 로드
  const userInterests: string[] = mockUserInterests;
  const [selectedTab, setSelectedTab] = useState<string>('all');

  const allCountryCodes: string[] = Array.from(
    new Set(MOCK_NEWS.map((n) => n.countryCode)),
  ).sort();

  // 'all' 탭의 필터링 로직 (국가별 필터링 기능)
  const filteredNewsByCountry: NewsItem[] = MOCK_NEWS.filter(
    (news) => selectedTab === 'all' || news.countryCode === selectedTab,
  );

  // 'interests' 탭의 필터링 로직 (관심 국가 이슈)
  const interestNews: NewsItem[] = MOCK_NEWS.filter((news) =>
    userInterests.includes(news.countryCode),
  );

  // 현재 탭에 표시할 뉴스 목록을 결정
  const newsToShow: NewsItem[] =
    selectedTab === 'interests' ? interestNews : filteredNewsByCountry;

  // 국가별 필터 탭 구성을 위한 데이터
  const tabControls: {
    value: string;
    label: string;
    isInterest: boolean;
  }[] = allCountryCodes.map((code) => {
    const country =
      MOCK_NEWS.find((n) => n.countryCode === code)?.country ?? code;
    return {
      value: code,
      label: country,
      isInterest: userInterests.includes(code),
    };
  });



  return (
    <div className='min-h-screen bg-gray-50 font-sans'>
      {/* Header Section */}
      <div className='bg-white border-b border-gray-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8'>
          <h1 className='text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1'>
            <Globe className='inline-block w-6 h-6 mr-3 text-blue-500' />
            해외 이슈 대시보드
          </h1>
          <p className='text-sm sm:text-base text-gray-600'>
            해외 주요 법률 및 정책 개정 소식을 확인하세요.
          </p>
        </div>
      </div>

      {/* Main Content & Tabs */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <Tabs defaultValue='all' onValueChange={setSelectedTab}>
          {/* 탭 리스트: 전체/관심 국가 */}
          <TabsList className='mb-6 flex flex-wrap h-auto'>
            <TabsTrigger value='all'>
              <Globe className='w-4 h-4 mr-2' />
              전체 이슈 ({MOCK_NEWS.length})
            </TabsTrigger>
            <TabsTrigger value='interests'>
              <User className='w-4 h-4 mr-2' />
              관심 국가 ({interestNews.length})
            </TabsTrigger>
          </TabsList>

          {/* 국가별 필터 탭 리스트 (관심 국가 탭이 아닐 때만 표시) */}
          {selectedTab !== 'interests' && (
              <div className='mb-6 flex flex-wrap h-auto bg-white border border-gray-300 p-2 shadow-sm gap-2'>
                          <button
                              type='button'
                              onClick={() => setSelectedTab('all')}
                              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${selectedTab === 'all'
                                      ? 'border-gray-900 text-gray-900 bg-white'
                                      : 'border-gray-300 text-gray-600 bg-white hover:border-gray-400'}`}
                          >
                              모든 국가
                          </button>
                          {tabControls.map((country) => (
                              <button
                                  key={country.value}
                                  type='button'
                                  onClick={() => setSelectedTab(country.value)}
                                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${selectedTab === country.value
                                          ? 'border-gray-900 text-gray-900 bg-white'
                                          : 'border-gray-300 text-gray-600 bg-white hover:border-gray-400'}`}
                              >
                                  {country.isInterest && <User className='w-3 h-3 mr-1 text-red-500' />}
                                  {country.label}
                              </button>
                          ))}
                      </div>
          )}

          {/* 콘텐츠 영역: 'all'이거나 특정 국가 코드가 선택된 경우 */}
          <TabsContent
            value='all'
            activeTab={selectedTab}
            className='space-y-4'
          >
            {newsToShow.length === 0 ? (
              <EmptyState message='선택하신 국가의 최신 이슈가 없습니다.' />
            ) : (
              newsToShow.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))
            )}
          </TabsContent>

          {/* 콘텐츠 영역: 특정 국가 필터링 */}
          {allCountryCodes.map((code) => (
            <TabsContent
              key={code}
              value={code}
              activeTab={selectedTab}
              className='space-y-4'
            >
              {newsToShow.length === 0 ? (
                <EmptyState
                  message={`현재 ${
                    MOCK_NEWS.find((n) => n.countryCode === code)?.country ??
                    code
                  }의 최신 이슈가 없습니다.`}
                />
              ) : (
                newsToShow.map((news) => (
                  <NewsCard key={news.id} news={news} />
                ))
              )}
            </TabsContent>
          ))}

          {/* 콘텐츠 영역: 관심 국가 */}
          {userInterests.length > 0 && (
            <TabsContent
              value='interests'
              activeTab={selectedTab}
              className='space-y-4'
            >
              {interestNews.length === 0 ? (
                <EmptyState message='설정한 관심 국가에 해당하는 최신 이슈가 없습니다.' />
              ) : (
                interestNews.map((news) => (
                  <NewsCard key={news.id} news={news} />
                ))
              )}
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};


