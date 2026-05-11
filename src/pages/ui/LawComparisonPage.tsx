import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useComparison } from '@/hooks/useComparison';
import { ComparisonForm } from '@/components/comparison/ComparisonForm';
import { ComparisonResultModal } from '@/components/comparison/ComparisonResultModal';
import { Header } from '@/components/layout/Header';
import { GitCompare } from 'lucide-react';

type ComparisonRouteState = {
  comparisonPreset?: {
    topic: string;
    country1: string;
    country2: string;
    autoSubmit?: boolean;
  };
};

export const LawComparisonPage = () => {
  const location = useLocation();
  const preset = (location.state as ComparisonRouteState | null)
    ?.comparisonPreset;
  const autoSubmittedRef = useRef(false);
  const {
    topic,
    country1,
    country2,
    result,
    isLoading,
    showResultModal,
    setShowResultModal,
    setTopic,
    setCountry1,
    setCountry2,
    handleCompare,
    highlightText,
    comparisonCountries,
  } = useComparison({
    topic: preset?.topic,
    country1: preset?.country1,
    country2: preset?.country2,
  });

  useEffect(() => {
    if (!preset?.autoSubmit || autoSubmittedRef.current) return;

    autoSubmittedRef.current = true;
    void handleCompare();
  }, [handleCompare, preset?.autoSubmit]);

  return (
    <div className="min-h-screen bg-bg-soft font-sans">
      {/* 공통 헤더 추가 */}
      <Header activeNavId="law-compare" />

      {/* 상단 타이틀 영역 */}
      <div className="w-full bg-white shadow-sm border-b border-border-subtle h-[133px] flex flex-col justify-center">
        <div className="px-6 sm:px-10 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <GitCompare
              className="w-8 h-8 text-brand-primary"
              strokeWidth={2}
            />
            <h1 className="text-[28px] font-medium leading-tight text-text-primary sm:text-[32px]">
              국가 간 법률 비교
            </h1>
          </div>
          <p className="text-sm font-normal text-text-secondary sm:text-base">
            두 국가의 법률을 비교 분석하세요
          </p>
        </div>
      </div>

      {/* 본문 영역 */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* 입력 섹션 */}
        <ComparisonForm
          topic={topic}
          country1={country1}
          country2={country2}
          comparisonCountries={comparisonCountries}
          isLoading={isLoading}
          onChangeTopic={setTopic}
          onChangeCountry1={setCountry1}
          onChangeCountry2={setCountry2}
          onSubmit={() => {
            void handleCompare();
          }}
        />
      </div>

      {/* 결과 모달 */}
      {result && (
        <ComparisonResultModal
          open={showResultModal}
          onClose={() => setShowResultModal(false)}
          country1Code={country1}
          country2Code={country2}
          topic={topic}
          result={result}
          highlightText={highlightText}
        />
      )}
    </div>
  );
};
