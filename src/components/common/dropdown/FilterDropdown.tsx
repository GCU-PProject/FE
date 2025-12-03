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
import {
  countryOptions,
  fieldOptions,
  type CountryValue,
  type FieldValue,
} from '@/constants/filters';

interface FilterDropdownProps {
  onApply?: (filters: { country: CountryValue; field: FieldValue }) => void;
}

export function FilterDropdown({ onApply }: FilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState<CountryValue>('all');
  const [field, setField] = useState<FieldValue>('all');
  const buttonRef = useRef<HTMLButtonElement>(null);
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
    } else if (!open && buttonRef.current) {
      buttonRef.current.focus();
    }
  }, [open]);

  const handleApply = () => {
    onApply?.({ country, field });
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative flex self-start">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="필터 옵션 열기"
        className={cn(
          'inline-flex h-[36px] w-[86px] items-center justify-center gap-2 rounded-lg border border-border-base bg-white px-3 text-sm font-medium text-text-primary shadow-sm transition-colors',
          open
            ? 'border-brand-primary text-text-primary'
            : 'hover:border-border-selected',
        )}
        onClick={() => setOpen((prev) => !prev)}
        ref={(node) => {
          buttonRef.current = node;
          refs.setReference(node);
        }}
      >
        <FilterIcon className="h-4 w-4 text-text-primary" />
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
          className="z-10 w-[288px] rounded-2xl border border-[#EEF0F4] bg-white p-[17px] shadow-[0px_20px_45px_rgba(15,23,42,0.12)]"
        >
          <div className="mb-2">
            <p className="text-base font-semibold text-text-primary">필터</p>
          </div>
          <div className="flex flex-col gap-3">
            <DropdownSelect
              label="국가"
              value={country}
              onChange={(event) =>
                setCountry(event.target.value as CountryValue)
              }
            >
              {countryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </DropdownSelect>
            <DropdownSelect
              label="분야"
              value={field}
              onChange={(event) => setField(event.target.value as FieldValue)}
            >
              {fieldOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </DropdownSelect>
            <Button
              onClick={handleApply}
              className="h-9 w-full rounded-[8px] bg-state-selected-black text-white hover:brightness-95"
            >
              적용
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
