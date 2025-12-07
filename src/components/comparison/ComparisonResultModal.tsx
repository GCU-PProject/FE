import { useState } from 'react';
import { Bookmark } from 'lucide-react';
import { Modal } from '@/components/common/Modal';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/button/Button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

type ComparisonResult = {
  country1: {
    country: string;
    summary: string;
    highlights: string[];
  };
  country2: {
    country: string;
    summary: string;
    highlights: string[];
  };
  comparison: {
    similarities: string[];
    differences: string[];
  };
};

type ComparisonResultModalProps = {
  open: boolean;
  onClose: () => void;
  country1Code: string;
  country2Code: string;
  topic: string;
};

const countries = [
  { code: 'US', name: '미국', flag: '🇺🇸' },
  { code: 'JP', name: '일본', flag: '🇯🇵' },
  { code: 'KR', name: '한국', flag: '🇰🇷' },
  { code: 'CN', name: '중국', flag: '🇨🇳' },
  { code: 'GB', name: '영국', flag: '🇬🇧' },
  { code: 'FR', name: '프랑스', flag: '🇫🇷' },
  { code: 'DE', name: '독일', flag: '🇩🇪' },
];

export const ComparisonResultModal = ({
                                        open,
                                        onClose,
                                        country1Code,
                                        country2Code,
                                      }: ComparisonResultModalProps) => {
  // 🔹 북마크 on/off 상태
  const [isBookmarked, setIsBookmarked] = useState(false);

  // === 실제로는 API 응답/저장 데이터로 대체될 mock ===
  const result: ComparisonResult = {
    country1: {
      country: countries.find((c) => c.code === country1Code)?.name ?? '미국',
      summary:
        '미국의 음주운전 관련 법률은 주(State)별로 다소 차이가 있으나, 연방 차원에서 혈중알코올농도 0.08% 이상을 법적 기준으로 정하고 있습니다. 초범의 경우 벌금형과 면허 정지 처분을 받으며, 재범 시에는 더욱 엄격한 처벌이 적용됩니다. 일부 주에서는 ignition interlock device(시동장치 잠금장치) 설치를 의무화하고 있습니다.',
      highlights: ['0.08% 기준', '주별 차이', '벌금형', '면허 정지', '시동장치 잠금'],
    },
    country2: {
      country: countries.find((c) => c.code === country2Code)?.name ?? '일본',
      summary:
        '일본의 도로교통법은 음주운전에 대해 매우 엄격한 처벌 규정을 두고 있습니다. 혈중알코올농도 0.03% 이상이면 음주운전으로 간주되며, 5년 이하의 징역 또는 100만 엔 이하의 벌금에 처해질 수 있습니다. 또한 동승자나 술을 제공한 사람도 처벌 대상이 됩니다.',
      highlights: ['0.03% 기준', '엄격한 처벌', '동승자 처벌', '5년 이하 징역', '100만엔 벌금'],
    },
    comparison: {
      similarities: [
        '음주운전에 대한 법적 규제가 존재합니다',
        '혈중알코올농도를 기준으로 판단합니다',
        '재범에 대해 가중 처벌을 적용합니다',
        '면허 정지 또는 취소 처분이 가능합니다',
      ],
      differences: [
        '미국은 0.08%, 일본은 0.03%로 기준이 다릅니다',
        '일본은 동승자와 주류 제공자도 처벌 대상에 포함됩니다',
        '일본의 처벌이 상대적으로 더 엄격합니다',
        '미국은 주별로 법률이 다르지만, 일본은 전국 통일 기준입니다',
      ],
    },
  };

  const highlightText = (text: string, highlights: string[]) => {
    let highlighted = text;
    highlights.forEach((h) => {
      const regex = new RegExp(`(${h})`, 'gi');
      highlighted = highlighted.replace(
        regex,
        '<mark class="bg-yellow-200 px-1 rounded">$1</mark>',
      );
    });
    return highlighted;
  };

  //북마크 버튼 on/off 표시
  const handleSave = () => {
    setIsBookmarked((prev) => {
      const next = !prev;

      toast.success(
        next ? '비교 조합을 저장했습니다' : '저장된 비교 조합을 해제했습니다',
      );

      return next;
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`비교 결과`}
      widthClass="max-w-[720px]"
      headerActions={
        <Button
          onClick={handleSave}
          aria-label="비교 조합 저장"
          className={cn(
            "p-2 rounded-md transition-colors",
            isBookmarked ? "text-primary" : "text-gray-400"
          )}
        >
          <Bookmark
            className={cn(
              "w-5 h-5",
              isBookmarked ? "fill-primary text-primary" : "fill-none text-gray-400"
            )}
          />
        </Button>
      }

    >
      <div className="space-y-6 mt-2">
        {/* 상단: 두 국가 비교 카드 */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* 국가 1 */}
          <Card className="p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-lg bg-blue-100 px-4 py-2 text-blue-700">
                {countries.find((c) => c.code === country1Code)?.flag}
              </div>
              <div>
                <h3 className="text-xl">{result.country1.country}</h3>
                <Badge variant="outline">국가 1</Badge>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="mb-2">핵심 내용</h4>
                <p
                  className="leading-relaxed text-gray-700"
                  dangerouslySetInnerHTML={{
                    __html: highlightText(
                      result.country1.summary,
                      result.country1.highlights,
                    ),
                  }}
                />
              </div>

              <div>
                <h4 className="mb-2 text-sm">주요 키워드</h4>
                <div className="flex flex-wrap gap-2">
                  {result.country1.highlights.map((h, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 rounded-md bg-gray-100 text-gray-700 text-sm"
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
              <div className="rounded-lg bg-purple-100 px-4 py-2 text-purple-700">
                {countries.find((c) => c.code === country2Code)?.flag}
              </div>
              <div>
                <h3 className="text-xl">{result.country2.country}</h3>
                <Badge variant="outline">국가 2</Badge>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="mb-2">핵심 내용</h4>
                <p
                  className="leading-relaxed text-gray-700"
                  dangerouslySetInnerHTML={{
                    __html: highlightText(
                      result.country2.summary,
                      result.country2.highlights,
                    ),
                  }}
                />
              </div>

              <div>
                <h4 className="mb-2 text-sm">주요 키워드</h4>
                <div className="flex flex-wrap gap-2">
                  {result.country2.highlights.map((h, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 rounded-md bg-gray-100 text-gray-700 text-sm"
                    >
      {h}
    </span>
                  ))}
                </div>

              </div>
            </div>
          </Card>
        </div>

        {/* 하단: 공통점 / 차이점 분석 */}
        <Card className="p-6">
          <h3 className="mb-4 text-xl">비교 분석</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* 공통점 */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <h4>공통점</h4>
              </div>
              <ul className="space-y-2">
                {result.comparison.similarities.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-1 text-green-600">•</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 차이점 */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-orange-500" />
                <h4>차이점</h4>
              </div>
              <ul className="space-y-2">
                {result.comparison.differences.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-1 text-orange-600">•</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </Modal>
  );
};
