import { Card } from "@/components/common/Card"; // 경로가 다르면 수정 필요
// 필요한 다른 import들 유지

// 1. Props 타입을 명확하게 '문자열 배열' 2개를 받는 것으로 변경
type ComparisonAnalysisProps = {
  similarities: string[];
  differences: string[];
};

// 2. 컴포넌트 인자에서 comparison 대신 similarities, differences를 직접 받음
export const ComparisonAnalysis = ({ similarities, differences }: ComparisonAnalysisProps) => {
  return (
    <Card className="p-6">
      <h3 className="mb-4 text-xl">비교 분석</h3>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* 공통점 섹션 */}
        <div>
          <div className="mb-3 flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green-500" />
            <h4>공통점</h4>
          </div>
          <ul className="space-y-2">
            {/* 3. comparison.similarities -> similarities 로 변경 */}
            {similarities.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1 text-green-600">•</span>
                <span className="text-text-secondary">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 차이점 섹션 */}
        <div>
          <div className="mb-3 flex items-center gap-2">
            {/* 차이점은 보통 빨간색이나 주황색으로 표현합니다 */}
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <h4>차이점</h4>
          </div>
          <ul className="space-y-2">
            {/* differences 데이터를 화면에 뿌려주면 'unused' 에러가 사라집니다 */}
            {differences.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1 text-red-600">•</span>
                <span className="text-text-secondary">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
};