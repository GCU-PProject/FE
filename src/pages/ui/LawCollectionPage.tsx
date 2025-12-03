import { useMemo, useState } from 'react';
import { Scale, Search } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { FilterDropdown } from '@/components/common/dropdown/FilterDropdown';
import { LawCard } from '@/components/law/LawCard';
import { mockLaws } from '@/mocks/laws';
import { LawDetailModal } from '@/components/law/LawDetailModal';
import type { LawItem } from '@/types/law';
import {
  countryLabels,
  fieldLabels,
  type CountryValue,
  type FieldValue,
} from '@/constants/filters';

export const LawCollectionPage = () => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<{
    country: CountryValue;
    field: FieldValue;
  }>({ country: 'all', field: 'all' });
  const [laws, setLaws] = useState<LawItem[]>(mockLaws);
  const [selectedLaw, setSelectedLaw] = useState<LawItem | null>(null);

  const filteredLaws = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    return laws.filter((law) => {
      const matchCountry =
        filters.country === 'all' ||
        law.countryCode.toLowerCase() === filters.country;
      const matchField = filters.field === 'all' || law.field === filters.field;
      const matchKeyword =
        keyword.length === 0 ||
        [
          law.title,
          law.subTitle,
          law.description,
          law.country,
          law.category,
        ].some((value) => (value?.toLowerCase() ?? '').includes(keyword));

      return matchCountry && matchField && matchKeyword;
    });
  }, [laws, query, filters]);

  const handleToggleSave = (id: number) => {
    setLaws((prev) =>
      prev.map((law) => (law.id === id ? { ...law, saved: !law.saved } : law)),
    );
    setSelectedLaw((prev) =>
      prev && prev.id === id ? { ...prev, saved: !prev.saved } : prev,
    );
  };

  const appliedFiltersText = `${countryLabels[filters.country] ?? '모든 국가'} · ${
    fieldLabels[filters.field] ?? '모든 분야'
  }`;

  return (
    <div className="min-h-screen bg-[#F2F4F6] font-sans">
      <Header activeNavId="law-collection" />

      <section className="w-full bg-white shadow-[0_1px_0_#E6E8EB]">
        <div className="mx-auto flex h-[133px] items-center px-8 sm:px-8 lg:px-8">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <Scale className="h-9 w-9 text-brand-primary" strokeWidth={2.2} />
              <h1 className="text-[28px] font-medium leading-tight text-text-primary sm:text-[32px]">
                G.law
              </h1>
            </div>
            <p className="text-sm font-normal text-text-secondary sm:text-base">
              전 세계 법률 정보를 검색하고 조회하세요.
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1120px] px-8 pb-10 sm:px-8 lg:px-8">
        <section className="mt-8 sm:mt-[32px] mb-6 sm:mb-[24px] h-[120px]">
          <div className="flex h-full items-center rounded-[14px] border border-[#E1E4E8] bg-white px-5 shadow-sm">
            <div className="flex w-full flex-col gap-3">
              <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <div className="flex h-[36px] w-full max-w-[974px] items-center gap-3 rounded-lg border border-[#E0E3E8] bg-[#F1F3F6] px-4">
                  <Search className="h-5 w-5 text-text-tertiary" />
                  <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="법령명, 키워드로 검색..."
                    className="h-full w-full bg-transparent text-sm sm:text-base text-text-primary placeholder:text-text-placeholder focus:outline-none"
                  />
                </div>
                <FilterDropdown
                  onApply={(next) =>
                    setFilters({ country: next.country, field: next.field })
                  }
                />
              </div>
              <div className="flex items-center text-sm text-text-secondary">
                <span>
                  총{' '}
                  <span className="text-brand-primary">
                    {filteredLaws.length}
                  </span>
                  개의 법률 정보
                </span>
                <span className="ml-3 text-text-tertiary">
                  {appliedFiltersText}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4 sm:gap-4">
          {filteredLaws.map((law) => (
            <LawCard
              key={law.id}
              law={law}
              onToggleSave={handleToggleSave}
              onViewDetail={setSelectedLaw}
            />
          ))}
          {filteredLaws.length === 0 ? (
            <div className="rounded-lg border border-border-subtle bg-white px-5 py-10 text-center text-text-secondary shadow-sm">
              조건에 맞는 법률이 없습니다. 필터를 조정하거나 키워드를
              변경해보세요.
            </div>
          ) : null}
        </section>
      </main>

      <LawDetailModal
        open={Boolean(selectedLaw)}
        law={selectedLaw}
        onClose={() => setSelectedLaw(null)}
        onToggleSave={handleToggleSave}
      />
    </div>
  );
};

export default LawCollectionPage;
