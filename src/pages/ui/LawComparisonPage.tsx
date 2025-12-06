import { useComparison } from '@/hooks/useComparison';
import { ComparisonForm } from '@/components/comparison/ComparisonForm';
import { ComparisonResultModal } from '@/components/comparison/ComparisonResultModal';
import { Header } from '@/components/layout/Header';

export const LawComparisonPage = () => {
  const {
    topic,
    country1,
    country2,
    isLoading,
    showResultModal,
    setShowResultModal,
    setTopic,
    setCountry1,
    setCountry2,
    handleCompare,
    countries,
  } = useComparison();

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* 🔥 공통 헤더 추가 */}
      <Header activeNavId="law-compare" />

      {/* 상단 타이틀 영역 (기존 디자인 유지) */}
      <div className='border-b border-gray-200 bg-white'>
        <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
          <h1 className='mb-2 text-3xl'>국가 간 법률 비교</h1>
          <p className='text-gray-600'>두 국가의 법률을 비교 분석하세요</p>
        </div>
      </div>

      {/* 본문 영역 */}
      <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
        {/* 입력 섹션 */}
        <ComparisonForm
          topic={topic}
          country1={country1}
          country2={country2}
          countries={countries}
          isLoading={isLoading}
          onChangeTopic={setTopic}
          onChangeCountry1={setCountry1}
          onChangeCountry2={setCountry2}
          onSubmit={handleCompare}
        />
      </div>

      {/* 결과 모달 */}
      <ComparisonResultModal
        open={showResultModal}
        onClose={() => setShowResultModal(false)}
        country1Code={country1}
        country2Code={country2}
        topic={topic}
      />
    </div>
  );
};
