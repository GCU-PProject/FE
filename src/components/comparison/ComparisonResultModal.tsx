// src/components/comparison/ComparisonResultModal.tsx
import { useState } from 'react';
import { Bookmark } from 'lucide-react';
import { toast } from 'sonner';

import { Modal } from '@/components/common/Modal';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';

import { comparisonCountries } from '@/constants/comparison';
import { getMockComparisonResult } from '@/mocks/comparisonMock';
import { highlightText } from './highlightText';
import { ComparisonAnalysis } from './ComparisonAnalysis';

type ComparisonResultModalProps = {
  open: boolean;
  onClose: () => void;
  country1Code: string;
  country2Code: string;
  topic: string;
};

export const ComparisonResultModal = ({
                                        open,
                                        onClose,
                                        country1Code,
                                        country2Code,
                                        topic,
                                      }: ComparisonResultModalProps) => {
  const [isSaved, setIsSaved] = useState(false);

  // mock 데이터 – 나중에 API 연결할 때 여기만 교체하면 됨
  const result = getMockComparisonResult(country1Code, country2Code);

  const country1Meta = comparisonCountries.find(
    (c) => c.code === country1Code,
  );
  const country2Meta = comparisonCountries.find(
    (c) => c.code === country2Code,
  );

  const handleToggleSave = () => {
    setIsSaved((prev) => !prev);
    toast.success(
      !isSaved ? '비교 조합이 저장되었습니다' : '저장이 해제되었습니다',
    );
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={topic ? `비교 결과: ${topic}` : '비교 결과'}
      widthClass="max-w-[720px]"
      headerActions={
        <button
          type="button"
          onClick={handleToggleSave}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-text-tertiary transition hover:text-brand-primary"
          aria-label={isSaved ? '저장 해제' : '저장'}
        >
          <Bookmark
            className={
              isSaved
                ? 'h-5 w-5 text-brand-primary'
                : 'h-5 w-5 text-text-tertiary'
            }
            strokeWidth={2.1}
            fill={isSaved ? 'currentColor' : 'none'}
          />
        </button>
      }
    >
      <div className="mt-2 space-y-6">
        {/* 상단: 두 국가 비교 카드 */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* 국가 1 */}
          <Card className="p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-lg bg-surface-accent px-4 py-2 text-brand-primary">
                {country1Meta?.flag}
              </div>
              <div>
                <h3 className="text-xl text-text-primary">
                  {result.country1.country}
                </h3>
                <Badge variant="outline">국가 1</Badge>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="mb-2 text-sm font-medium text-text-primary">
                  핵심 내용
                </h4>
                <p className="leading-relaxed text-text-secondary">
                  {highlightText(result.country1.summary, result.country1.highlights)}
                </p>
              </div>

              <div>
                <h4 className="mb-2 text-xs font-medium text-text-tertiary">
                  주요 키워드
                </h4>
                <div className="flex flex-wrap gap-2">
                  {result.country1.highlights.map((h, idx) => (
                    <span
                      key={idx}
                      className="rounded-md bg-surface-tag px-2 py-1 text-xs text-text-secondary"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* 국가 2 */}
          <Card className="p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-lg bg-surface-accent-soft px-4 py-2 text-brand-secondary">
                {country2Meta?.flag}
              </div>
              <div>
                <h3 className="text-xl text-text-primary">
                  {result.country2.country}
                </h3>
                <Badge variant="outline">국가 2</Badge>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="mb-2 text-sm font-medium text-text-primary">
                  핵심 내용
                </h4>
                <p
                  className="leading-relaxed text-text-secondary"
                >
                  {highlightText(result.country1.summary, result.country1.highlights)}
                </p>
              </div>

              <div>
                <h4 className="mb-2 text-xs font-medium text-text-tertiary">
                  주요 키워드
                </h4>
                <div className="flex flex-wrap gap-2">
                  {result.country2.highlights.map((h, idx) => (
                    <span
                      key={idx}
                      className="rounded-md bg-surface-tag px-2 py-1 text-xs text-text-secondary"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* 하단: 공통점 / 차이점 분석 (분리된 컴포넌트) */}
        <ComparisonAnalysis
          similarities={result.comparison.similarities}
          differences={result.comparison.differences}
        />
      </div>
    </Modal>
  );
};

export default ComparisonResultModal;
