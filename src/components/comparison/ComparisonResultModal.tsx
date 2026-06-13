import { Bookmark } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import { Modal } from '@/components/common/Modal';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import type { ComparisonResult } from '@/types/comparison';
import { ComparisonAnalysis } from './ComparisonAnalysis';

type ComparisonResultModalProps = {
  open: boolean;
  onClose: () => void;
  topic: string;
  result: ComparisonResult;
};

const LawIdList = ({ lawIds }: { lawIds: number[] }) => {
  if (lawIds.length === 0) {
    return <span className="text-sm text-text-tertiary">관련 법령 없음</span>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {lawIds.map((lawId) => (
        <Badge key={lawId} variant="outline">
          법령 ID {lawId}
        </Badge>
      ))}
    </div>
  );
};

export const ComparisonResultModal = ({
  open,
  onClose,
  topic,
  result,
}: ComparisonResultModalProps) => {
  const [isSaved, setIsSaved] = useState(false);

  const handleToggleSave = () => {
    setIsSaved((prev) => !prev);
    toast.success(
      !isSaved ? '비교 결과가 저장되었습니다.' : '저장이 해제되었습니다.',
    );
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={topic ? `비교 결과: ${topic}` : '비교 결과'}
      widthClass="max-w-[820px]"
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
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <div className="mb-4">
              <h3 className="text-xl text-text-primary">
                {result.country1.country}
              </h3>
              <Badge variant="outline">첫 번째 국가</Badge>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="mb-2 text-sm font-medium text-text-primary">
                  요약
                </h4>
                <p className="whitespace-pre-line leading-relaxed text-text-secondary">
                  {result.country1.summary}
                </p>
              </div>

              <div>
                <h4 className="mb-2 text-xs font-medium text-text-tertiary">
                  관련 법령
                </h4>
                <LawIdList lawIds={result.country1.relatedLawIds} />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="mb-4">
              <h3 className="text-xl text-text-primary">
                {result.country2.country}
              </h3>
              <Badge variant="outline">두 번째 국가</Badge>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="mb-2 text-sm font-medium text-text-primary">
                  요약
                </h4>
                <p className="whitespace-pre-line leading-relaxed text-text-secondary">
                  {result.country2.summary}
                </p>
              </div>

              <div>
                <h4 className="mb-2 text-xs font-medium text-text-tertiary">
                  관련 법령
                </h4>
                <LawIdList lawIds={result.country2.relatedLawIds} />
              </div>
            </div>
          </Card>
        </div>

        <ComparisonAnalysis
          common={result.comparison.common}
          diff={result.comparison.diff}
        />
      </div>
    </Modal>
  );
};

export default ComparisonResultModal;
