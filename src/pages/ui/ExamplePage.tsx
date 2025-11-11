import { Button } from '@/components/common/button/Button';
import { Input } from '@/components/common/input/Input';
import { SearchInput } from '@/components/common/input/SearchInput';
import { FilterDropdown } from '@/components/common/dropdown/FilterDropdown';

export default function ExamplePage() {
  return (
    <div className="min-h-screen bg-[#F7F8FA] py-12">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 rounded-2xl bg-white p-8 shadow-sm">
        <section className="flex flex-col gap-3">
          <Button>기본 버튼</Button>
          <Button variant="outline">아웃라인</Button>
          <Button variant="destructive">위험</Button>
          <Button size="sm">작은</Button>
          <Button size="lg">큰</Button>
          <Button variant="link">링크 버튼</Button>
        </section>

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
        </section>
      </div>
    </div>
  );
}
