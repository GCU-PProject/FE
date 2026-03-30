import { Modal } from '@/components/common/Modal';
import { Button } from '@/components/common/button/Button';

type RiskResultModalProps = {
  open: boolean;
  onClose: () => void;
  stayCountry: string;
  stayPurpose: string;
  visaType: string;
  age: string;
};

export function RiskResultModal({
  open,
  onClose,
  stayCountry,
  stayPurpose,
  visaType,
  age,
}: RiskResultModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="위험 지수 분석 결과"
      description="입력하신 체류 정보를 기준으로 한 참고 지표입니다."
      widthClass="max-w-lg"
      footer={
        <Button type="button" onClick={onClose} className="w-full">
          확인
        </Button>
      }
    >
      <dl className="space-y-3 text-sm">
        <div className="flex justify-between gap-4 border-b border-border-subtle pb-2">
          <dt className="text-text-secondary">체류국가</dt>
          <dd className="text-right font-medium text-text-primary">
            {stayCountry}
          </dd>
        </div>
        <div className="flex justify-between gap-4 border-b border-border-subtle pb-2">
          <dt className="text-text-secondary">체류목적</dt>
          <dd className="text-right font-medium text-text-primary">
            {stayPurpose}
          </dd>
        </div>
        <div className="flex justify-between gap-4 border-b border-border-subtle pb-2">
          <dt className="text-text-secondary">비자 종류</dt>
          <dd className="text-right font-medium text-text-primary">
            {visaType}
          </dd>
        </div>
        <div className="flex justify-between gap-4 border-b border-border-subtle pb-2">
          <dt className="text-text-secondary">연령</dt>
          <dd className="text-right font-medium text-text-primary">{age}</dd>
        </div>
      </dl>
      <p className="mt-4 text-sm leading-relaxed text-text-secondary">
        위 정보는 참고용 분석 결과입니다. 실제 체류·비자 판단은 해당 국가
        공관 및 전문가 상담을 권장합니다.
      </p>
    </Modal>
  );
}
