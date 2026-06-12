import { FormEvent, useMemo, useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/common/button/Button';
import { Card } from '@/components/common/Card';
import { DropdownSelect } from '@/components/common/dropdown/DropdownSelect';
import { LegalRiskResultModal } from '@/components/risk/LegalRiskResultModal';
import { useLegalRisk } from '@/hooks/useLegalRisk';
import type {
  AgeBand,
  LegalRiskRequest,
  TravelPurpose,
  VisaType,
} from '@/types/legalRisk';

type RiskFormState = {
  countryId: string;
  travelPurpose: '' | TravelPurpose;
  visaType: '' | VisaType;
  ageBand: '' | AgeBand;
};

const countries = [
  { id: 1, label: '미국 (연방)' },
  { id: 2, label: '미국 - 캘리포니아' },
  { id: 3, label: '미국 - 뉴욕' },
  { id: 4, label: '캐나다 (연방)' },
  { id: 5, label: '캐나다 - 온타리오' },
  { id: 6, label: '캐나다 - 브리티시컬럼비아' },
  { id: 7, label: '호주 (연방)' },
  { id: 8, label: '호주 - 뉴사우스웨일스' },
  { id: 9, label: '호주 - 퀸즐랜드' },
  { id: 10, label: '호주 - 서호주' },
  { id: 11, label: '호주 - 남호주' },
  { id: 12, label: '호주 - 태즈메이니아' },
  { id: 13, label: '호주 - 노퍽 섬' },
];

const ageBands: Array<{ value: AgeBand; label: string }> = [
  { value: '10s', label: '10대' },
  { value: '20s', label: '20대' },
  { value: '30s', label: '30대' },
  { value: '40s', label: '40대' },
  { value: '50s_plus', label: '50대 이상' },
];

export const LegalRiskPanel = () => {
  const [form, setForm] = useState<RiskFormState>({
    countryId: '',
    travelPurpose: '',
    visaType: '',
    ageBand: '',
  });
  const [validationMessage, setValidationMessage] = useState('');
  const [isResultOpen, setIsResultOpen] = useState(false);
  const { data, error, isLoading, requestLegalRisk } = useLegalRisk();

  const canSubmit = useMemo(() => {
    return (
      form.countryId !== '' &&
      form.travelPurpose !== '' &&
      form.visaType !== '' &&
      form.ageBand !== ''
    );
  }, [form]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLoading) {
      return;
    }

    if (!canSubmit) {
      setValidationMessage('체류 정보를 모두 입력해주세요.');
      return;
    }

    setValidationMessage('');

    const payload: LegalRiskRequest = {
      country_id: Number(form.countryId),
      travel_purpose: form.travelPurpose as TravelPurpose,
      visa_type: form.visaType as VisaType,
      age_band: form.ageBand as AgeBand,
    };

    const result = await requestLegalRisk(payload);
    if (result) {
      setIsResultOpen(true);
    }
  };

  return (
    <div className="mx-auto max-w-[1280px]">
      <Card className="rounded-lg border-border-soft bg-white p-7 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-5">
          <DropdownSelect
            label="체류국가"
            value={form.countryId}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, countryId: event.target.value }))
            }
            className="h-10 bg-gray-50"
          >
            <option value="">체류국가를 선택하세요</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.label}
              </option>
            ))}
          </DropdownSelect>

          <DropdownSelect
            label="체류목적"
            value={form.travelPurpose}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                travelPurpose: event.target.value as TravelPurpose,
              }))
            }
            className="h-10 bg-gray-50"
          >
            <option value="">체류목적을 선택하세요</option>
            <option value="tourism">관광</option>
            <option value="business">출장/비즈니스</option>
            <option value="study">유학</option>
            <option value="work">취업</option>
            <option value="working_holiday">워킹홀리데이</option>
          </DropdownSelect>

          <DropdownSelect
            label="비자 유형"
            value={form.visaType}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                visaType: event.target.value as VisaType,
              }))
            }
            className="h-10 bg-gray-50"
          >
            <option value="">비자 유형을 선택하세요</option>
            <option value="short_stay">단기 체류</option>
            <option value="long_stay">장기 체류</option>
            <option value="work_permit">취업 허가</option>
            <option value="student_visa">학생 비자</option>
          </DropdownSelect>

          <DropdownSelect
            label="연령대"
            value={form.ageBand}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                ageBand: event.target.value as AgeBand,
              }))
            }
            className="h-10 bg-gray-50"
          >
            <option value="">연령대를 선택하세요</option>
            {ageBands.map((ageBand) => (
              <option key={ageBand.value} value={ageBand.value}>
                {ageBand.label}
              </option>
            ))}
          </DropdownSelect>

          <Button
            type="submit"
            disabled={isLoading}
            className="h-11 w-full gap-2 bg-[#9ea4f3] text-base hover:bg-[#8f96ee]"
          >
            <AlertTriangle className="h-4 w-4" />
            {isLoading ? '위험 지수 분석 중' : '위험 지수 분석하기'}
          </Button>
        </form>

        {validationMessage ? (
          <div className="mt-4 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
            {validationMessage}
          </div>
        ) : null}

        {error ? (
          <div className="mt-4 flex items-start gap-2 rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error.message}</span>
          </div>
        ) : null}
      </Card>

      <LegalRiskResultModal
        open={isResultOpen}
        onClose={() => setIsResultOpen(false)}
        result={data}
      />
    </div>
  );
};
