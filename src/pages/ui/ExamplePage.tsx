import { Button } from '@/components/common/button/Button';
import { Input } from '@/components/common/input/Input';
import { SearchInput } from '@/components/common/input/SearchInput';
import { FilterDropdown } from '@/components/common/dropdown/FilterDropdown';

export default function ExamplePage() {
  return (
    <div className="min-h-screen bg-[#F7F8FA] py-12">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 rounded-2xl bg-white p-8 shadow-sm">
        <section className="flex flex-col gap-3">
          <Input placeholder="기본 입력 필드" />
          <Input controlSize="sm" placeholder="작은 입력 필드" />
          <Input
            state="error"
            placeholder="에러 상태"
            defaultValue="잘못된 입력"
          />
        </section>

        <section className="flex flex-col gap-4">
          <SearchInput placeholder="검색 필드" />
          <FilterDropdown
            onApply={(filters) => {
              console.log('적용된 필터', filters);
            }}
          />
          <div className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-[0_8px_20px_rgba(0,0,0,0.04)]">
            <div className="flex flex-wrap gap-2">
              <Button className="h-9 w-[305px] justify-center rounded-[8px] border border-[#D7D7D7] bg-white text-text-primary shadow-sm hover:bg-bg-soft">
                나중에 설정
              </Button>
              <Button className="h-9 w-[305px] justify-center rounded-[8px] bg-state-selected-black text-white hover:brightness-95">
                완료
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                className="h-[32px] w-[80px] justify-center rounded-[8px] border border-[#D7D7D7] bg-white text-text-primary shadow-sm hover:bg-bg-soft"
              >
                보기
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
