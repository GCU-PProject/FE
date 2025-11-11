import { useEffect, useRef, useState } from 'react';
import { DropdownSelect } from './DropdownSelect';
import { Button } from '@/components/common/button/Button';
import { cn } from '@/lib/utils';
import { ReactComponent as FilterIcon } from '@/assets/icons/filter.svg';

const countries = [
  { label: '모든 국가', value: 'all' },
  { label: '한국', value: 'kr' },
  { label: '미국', value: 'us' },
  { label: '일본', value: 'jp' },
  { label: '싱가포르', value: 'sg' },
];

const fields = [
  { label: '모든 분야', value: 'all' },
  { label: '교통', value: 'traffic' },
  { label: '노동', value: 'labor' },
  { label: '금융', value: 'finance' },
  { label: 'IT · 데이터', value: 'it' },
];

interface FilterDropdownProps {
  onApply?: (filters: { country: string; field: string }) => void;
}

export function FilterDropdown({ onApply }: FilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState('all');
  const [field, setField] = useState('all');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClick);
    }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  const handleApply = () => {
    onApply?.({ country, field });
    setOpen(false);
  };

  return (
    <div className="relative inline-flex self-start" ref={containerRef}>
      <button
        type="button"
        className={cn(
          'flex h-9 items-center gap-2 rounded-lg border border-[#E5E7EB] bg-white px-3 text-sm font-medium text-[#0A0A0A] shadow-sm transition-colors',
          open ? 'border-[#0053F4] text-[#0053F4]' : 'hover:border-[#CBD5F5]',
        )}
        onClick={() => setOpen((prev) => !prev)}
      >
        <FilterIcon className="h-4 w-4" />
        필터
      </button>

      {open ? (
        <div className="absolute right-0 z-10 mt-2 w-[270px] rounded-2xl border border-[#EEF0F4] bg-white p-5 shadow-[0px_20px_45px_rgba(15,23,42,0.12)]">
          <div className="mb-4">
            <p className="text-base font-semibold text-[#0A0A0A]">필터</p>
          </div>
          <div className="flex flex-col gap-4">
            <DropdownSelect
              label="국가"
              value={country}
              onChange={(event) => setCountry(event.target.value)}
            >
              {countries.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </DropdownSelect>
            <DropdownSelect
              label="분야"
              value={field}
              onChange={(event) => setField(event.target.value)}
            >
              {fields.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </DropdownSelect>
            <Button
              onClick={handleApply}
              className="h-9 w-full rounded-lg bg-[#030213] text-white hover:bg-[#05052b]"
            >
              적용
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
