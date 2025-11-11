import { useEffect, useRef, useState } from 'react';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
} from '@floating-ui/react-dom';
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
  const panelRef = useRef<HTMLDivElement | null>(null);
  const { refs, floatingStyles } = useFloating({
    placement: 'bottom-end',
    middleware: [
      offset(8),
      flip({ fallbackPlacements: ['top-end', 'bottom-start'] }),
      shift({ padding: 8 }),
    ],
    whileElementsMounted: autoUpdate,
  });

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && open) {
        setOpen(false);
      }
    }

    let timeoutId: number | undefined;
    if (open) {
      timeoutId = window.setTimeout(() => {
        document.addEventListener('mousedown', handleClick);
        document.addEventListener('keydown', handleKeyDown);
      }, 0);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (open && panelRef.current) {
      const firstSelect = panelRef.current.querySelector('select');
      firstSelect?.focus();
    }
  }, [open]);

  const handleApply = () => {
    onApply?.({ country, field });
    setOpen(false);
  };

  return (
    <div className="relative inline-flex self-start" ref={containerRef}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="필터 옵션 열기"
        className={cn(
          'flex h-9 items-center gap-2 rounded-lg border border-[#E5E7EB] bg-white px-3 text-sm font-medium text-[#0A0A0A] shadow-sm transition-colors',
          open ? 'border-[#0053F4] text-[#0053F4]' : 'hover:border-[#CBD5F5]',
        )}
        onClick={() => setOpen((prev) => !prev)}
        ref={refs.setReference}
      >
        <FilterIcon className="h-4 w-4" />
        필터
      </button>

      {open ? (
        <div
          ref={(node) => {
            panelRef.current = node;
            refs.setFloating(node);
          }}
          role="dialog"
          aria-label="필터 설정"
          style={floatingStyles}
          className="z-10 w-[270px] rounded-2xl border border-[#EEF0F4] bg-white p-5 shadow-[0px_20px_45px_rgba(15,23,42,0.12)]"
        >
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
