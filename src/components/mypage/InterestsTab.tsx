import { Check, Edit2 } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/button/Button';
import { INTEREST_COUNTRIES } from '@/constants/interestCountries';
import type { PreferredCountries } from '@/types/country';

type InterestsTabProps = {
  displayedInterests: PreferredCountries;
  isEditing: boolean;
  onStartEdit: () => void;
  onToggleInterest: (code: PreferredCountries[number]) => void;
  onSave: () => void;
  onCancel: () => void;
  isSaving?: boolean;
};

export const InterestsTab = ({
  displayedInterests,
  isEditing,
  onStartEdit,
  onToggleInterest,
  onSave,
  onCancel,
  isSaving = false,
}: InterestsTabProps) => (
  <Card className="rounded-2xl border-border-subtle bg-white px-5 py-5 shadow-sm sm:px-6 sm:py-6">
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-lg font-semibold text-text-primary">관심 국가 관리</h2>
      <div className="flex items-center gap-2">
        {isEditing ? (
          <>
            <Button
              variant="outline"
              size="sm"
              className="border-border-base text-text-secondary hover:border-border-selected"
              onClick={onCancel}
              disabled={isSaving}
            >
              취소
            </Button>
            <Button
              size="sm"
              className="bg-brand-primary px-4 text-white hover:brightness-95"
              onClick={onSave}
              disabled={isSaving}
            >
              {isSaving ? '저장 중...' : '저장'}
            </Button>
          </>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="border-border-base text-text-primary hover:border-border-selected"
            onClick={onStartEdit}
          >
            <Edit2 className="mr-2 h-4 w-4" />
            수정
          </Button>
        )}
      </div>
    </div>

    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {INTEREST_COUNTRIES.map((country) => {
        const isSelected = displayedInterests.includes(country.code);
        return (
          <button
            key={country.code}
            type="button"
            onClick={() => onToggleInterest(country.code)}
            disabled={!isEditing || isSaving}
            aria-pressed={isSelected}
            className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition ${
              isSelected
                ? 'border-state-selected-border bg-brand-surface shadow-[0_6px_18px_rgba(15,23,42,0.08)]'
                : 'border-border-subtle bg-white hover:border-border-base'
            } ${!isEditing ? 'cursor-default' : ''}`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{country.flag}</span>
              <span className="text-sm font-semibold text-text-primary">
                {country.name}
              </span>
            </div>
            {isEditing ? (
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                  isSelected
                    ? 'border-brand-primary bg-brand-primary/10 text-brand-primary'
                    : 'border-border-subtle text-text-tertiary'
                }`}
                aria-hidden
              >
                {isSelected ? <Check className="h-4 w-4" /> : null}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>

    <p className="mt-6 text-center text-sm text-text-secondary">
      관심 국가를 설정하면 G.law에서 맞춤형 법률 정보를 받을 수 있습니다
    </p>
    {!displayedInterests.length && !isEditing ? (
      <div className="mt-3 rounded-lg border border-border-subtle bg-bg-soft px-4 py-3 text-sm text-text-secondary">
        아직 관심 국가를 설정하지 않았습니다. 수정 버튼을 눌러 설정을 시작하세요.
      </div>
    ) : null}
    {isEditing && displayedInterests.length === 0 ? (
      <div className="mt-3 text-sm text-text-tertiary">
        관심 국가를 선택하지 않아도 서비스를 이용할 수 있지만, 관심 국가를 선택하면 대시보드가 더 유용해집니다.
      </div>
    ) : null}
  </Card>
);

export default InterestsTab;
