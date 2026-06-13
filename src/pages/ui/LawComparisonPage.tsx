import { GitCompare } from 'lucide-react';
import { useComparison } from '@/hooks/useComparison';
import { ComparisonForm } from '@/components/comparison/ComparisonForm';
import { ComparisonResultModal } from '@/components/comparison/ComparisonResultModal';
import { Header } from '@/components/layout/Header';

export const LawComparisonPage = () => {
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
    comparisonCountries,
  } = useComparison();

  return (
    <div className="min-h-screen bg-bg-soft font-sans">
      <Header activeNavId="law-compare" />

      <div className="flex h-[133px] w-full flex-col justify-center border-b border-border-subtle bg-white shadow-sm">
        <div className="px-6 py-6 sm:px-10 lg:px-8">
          <div className="flex items-center gap-3">
            <GitCompare
              className="h-8 w-8 text-brand-primary"
              strokeWidth={2}
            />
            <h1 className="text-[28px] font-medium leading-tight text-text-primary sm:text-[32px]">
              국가 간 법률 비교
            </h1>
          </div>
          <p className="text-sm font-normal text-text-secondary sm:text-base">
            두 국가의 법률 기준을 비교 분석하세요
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <ComparisonForm
          topic={topic}
          country1={country1}
          country2={country2}
          comparisonCountries={comparisonCountries}
          isLoading={isLoading}
          onChangeTopic={setTopic}
          onChangeCountry1={setCountry1}
          onChangeCountry2={setCountry2}
          onSubmit={handleCompare}
        />
      </div>

      {result ? (
        <ComparisonResultModal
          open={showResultModal}
          onClose={() => setShowResultModal(false)}
          topic={topic}
          result={result}
        />
      ) : null}
    </div>
  );
};
