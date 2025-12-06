import { useEffect, useMemo, useState } from 'react';
import { Globe } from 'lucide-react';
import { Modal } from '@/components/common/Modal';
import { INTEREST_COUNTRIES } from '@/constants/interestCountries';
import { cn } from '@/lib/utils';
import type { CountryCode } from '@/types/country';

type InterestCountryModalProps = {
  open: boolean;
  initialSelected: CountryCode[];
  onSave: (selected: CountryCode[]) => void;
  onSkip: () => void;
};

const formatSelectionLabel = (count: number) => `완료 (${count}개 선택)`;

export const InterestCountryModal = ({
  open,
  initialSelected,
  onSave,
  onSkip,
}: InterestCountryModalProps) => {
  const [selected, setSelected] = useState<CountryCode[]>(initialSelected);

  useEffect(() => {
    if (open) {
      setSelected(initialSelected);
    }
  }, [initialSelected, open]);

  // 단일 토글로 선택/해제 관리 (동일 코드는 setState 배열 필터/추가)
  const toggleCountry = (code: string) => {
    setSelected((prev) =>
      prev.includes(code)
        ? prev.filter((item) => item !== code)
        : [...prev, code],
    );
  };

  const handleSubmit = () => {
    if (selected.length === 0) return;
    onSave(selected);
  };

  const selectedCount = useMemo(() => selected.length, [selected]);

  return (
    <Modal
      open={open}
      onClose={onSkip}
      showCloseButton={false}
      headerClassName="hidden"
      bodyClassName="relative flex-1 px-8 pb-4 pt-8 sm:px-10 sm:pt-10"
      footerClassName="border-none bg-white px-10 pb-8 pt-4"
      contentClassName="relative border border-border-base shadow-[0_22px_80px_rgba(0,0,0,0.14)]"
      widthClass="w-[720px] max-w-[720px] min-h-[620px]"
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-brand-surface bg-brand-surface text-brand-primary">
          <Globe className="h-8 w-8" strokeWidth={2.1} />
        </div>
        <h2 className="text-[22px] font-extrabold leading-tight text-text-title sm:text-[24px]">
          G.law에 오신 것을 환영합니다!
        </h2>
        <p className="mt-2 text-[14px] leading-[21px] text-text-body sm:text-[15px]">
          관심 국가를 선택하시면 맞춤형 법률 정보를 제공해드립니다.
        </p>
      </div>

      <div className="mt-8 grid w-full max-w-[660px] grid-cols-3 gap-3 sm:gap-4">
        {INTEREST_COUNTRIES.map((country) => {
          const isSelected = selected.includes(country.code);
          return (
            <button
              key={country.code}
              type="button"
              onClick={() => toggleCountry(country.code)}
              className={cn(
                'flex h-[56px] w-full items-center gap-3 rounded-xl border border-border-base bg-white px-4 text-left transition',
                'shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:border-brand-surface hover:shadow-[0_8px_20px_rgba(15,23,42,0.12)]',
                isSelected &&
                  'border-state-selected-border bg-brand-light ring-2 ring-state-selected-border ring-offset-0',
              )}
              aria-pressed={isSelected}
            >
              <span className="text-lg sm:text-xl">{country.flag}</span>
              <span className="text-[15px] font-semibold text-text-title sm:text-base">
                {country.name}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-9 flex w-full max-w-[660px] flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <button
          type="button"
          onClick={onSkip}
          className="min-h-[36px] w-full sm:w-[305px] sm:min-w-[305px] rounded-lg border border-border-base bg-white px-4 py-2 text-[15px] font-semibold text-text-secondary transition hover:bg-bg-soft"
        >
          나중에 설정
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={selectedCount === 0}
          className={cn(
            'min-h-[36px] w-full sm:w-[305px] sm:min-w-[305px] rounded-lg px-4 py-2 text-[15px] font-semibold text-white transition',
            selectedCount === 0
              ? 'bg-border-base text-text-tertiary hover:bg-bg-soft disabled:cursor-not-allowed'
              : 'bg-state-selected-black hover:bg-text-primary',
          )}
        >
          {formatSelectionLabel(selectedCount)}
        </button>
      </div>
    </Modal>
  );
};

export default InterestCountryModal;
