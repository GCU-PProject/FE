import { Card } from '@/components/common/Card';

type ComparisonAnalysisProps = {
  common: string;
  diff: string;
};

export const ComparisonAnalysis = ({
  common,
  diff,
}: ComparisonAnalysisProps) => {
  return (
    <Card className="p-6">
      <h3 className="mb-4 text-xl text-text-primary">비교 분석</h3>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green-500" />
            <h4 className="font-medium text-text-primary">공통점</h4>
          </div>
          <p className="whitespace-pre-line leading-relaxed text-text-secondary">
            {common}
          </p>
        </div>

        <div>
          <div className="mb-3 flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <h4 className="font-medium text-text-primary">차이점</h4>
          </div>
          <p className="whitespace-pre-line leading-relaxed text-text-secondary">
            {diff}
          </p>
        </div>
      </div>
    </Card>
  );
};
