import { useState } from 'react';
import { AlertTriangle, Bookmark } from 'lucide-react';
import { toast } from 'sonner';
import { Modal } from '@/components/common/Modal';

interface RiskResultModalProps {
  open: boolean;
  onClose: () => void;
  stayCountry: string;
  stayPurpose: string;
  visaType: string;
  age: string;
}

interface RiskItem {
  title: string;
  category: string;
  description: string;
  level: 'high' | 'medium' | 'low';
}

export function RiskResultModal({
  open,
  onClose,
  stayCountry,
  stayPurpose,
  visaType,
  age,
}: RiskResultModalProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const riskItems: RiskItem[] = [
    {
      title: '체류 비자 규정 위반 위험',
      category: '비자 관련 위험',
      description: `${visaType}로 입국 시 체류 목적이 ${stayPurpose}인 경우, 현지 이민법상 허용된 활동 범위를 준수해야 하며, 무단 취업이나 체류 기간 초과 시 강제 출국 및 재입국 금지 등의 제재를 받을 수 있습니다.`,
      level: 'high',
    },
    {
      title: '사회보장 및 세금 의무',
      category: '노무 관련 위험',
      description: `${stayCountry}에서 ${stayPurpose} 목적으로 체류할 경우, 현지 사회보장제도 가입 의무 및 소득세 납부 규정을 확인해야 하며, 이를 위반 시 법적 제재와 함께 비자 연장이 거부될 수 있습니다.`,
      level: 'medium',
    },
    {
      title: '연령에 따른 특별 규정',
      category: '연령 관련 위험',
      description: `${age}세의 경우 ${stayCountry}의 미성년자 보호법 또는 고령자 복지 관련 규정이 적용될 수 있으며, 특정 연령대에 대한 추가 서류 제출이나 보증인 요구 사항이 있을 수 있습니다.`,
      level: 'medium',
    },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-orange-600';
      case 'low':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  const toggleBookmark = () => {
    setIsBookmarked((prev) => {
      const next = !prev;
      toast.success(
        next ? '분석 결과가 저장되었습니다' : '북마크가 해제되었습니다',
      );
      return next;
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="분석 결과"
      widthClass="max-w-2xl"
      contentClassName="max-h-[85vh]"
      bodyClassName="max-h-[60vh]"
      headerActions={
        <button
          type="button"
          onClick={toggleBookmark}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-text-tertiary transition hover:text-brand-primary"
          aria-label={isBookmarked ? '저장 해제' : '저장'}
        >
          <Bookmark
            className={
              isBookmarked
                ? 'h-5 w-5 text-brand-primary'
                : 'h-5 w-5 text-text-tertiary'
            }
            strokeWidth={2.1}
            fill={isBookmarked ? 'currentColor' : 'none'}
          />
        </button>
      }
    >
      <div className="space-y-4">
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <p className="text-sm text-gray-700">
            <strong>{stayCountry}</strong> 체류 시{' '}
            <strong>{stayPurpose}</strong> 목적, <strong>{visaType}</strong>,
            연령 <strong>{age}세</strong>에 대한 위험 분석 결과입니다.
            <strong>{stayCountry}</strong> 체류 시 <strong>{stayPurpose}</strong>{' '}
            목적, <strong>{visaType}</strong>, 연령 <strong>{age}세</strong>에
            대한 위험 분석 결과입니다.
          </p>
        </div>

        <div className="space-y-4">
          {riskItems.map((item, index) => (
            <div
              key={index}
              className="rounded-lg border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md"
            >
              <div className="mb-3 flex items-start gap-3">
                <AlertTriangle
                  className={`mt-0.5 h-5 w-5 ${getLevelColor(item.level)}`}
                />
                <div className="flex-1">
                  <h3 className="mb-1 text-base font-medium text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mb-3 text-sm text-gray-600">{item.category}</p>
                </div>
              </div>
              <p className="pl-8 text-sm leading-relaxed text-gray-700">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
