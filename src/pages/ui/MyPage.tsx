import { useEffect, useMemo, useState } from 'react';
import {
  Bookmark as BookmarkIcon,
  Check,
  Edit2,
  ExternalLink,
  GitCompare,
  Globe,
  LogOut,
  Trash2,
  UserRound,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import {
  DashboardTabs,
  DashboardTabsContent,
  DashboardTabsList,
  DashboardTabsTrigger,
} from '@/components/common/DashboardTabs';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/button/Button';
import { INTEREST_COUNTRIES } from '@/constants/interestCountries';
import { LawDetailModal } from '@/components/law/LawDetailModal';
import { mockCompareSets } from '@/mocks/mypage';
import type { PreferredCountries } from '@/types/country';
import type { CompareSet } from '@/types/mypage';
import type { LawItem } from '@/types/law';
import { useSavedLaws } from '@/hooks/useSavedLaws';
import { mockLaws } from '@/mocks/laws';

type MyPageProps = {
  preferredCountries: PreferredCountries;
  onSavePreferredCountries: (countries: PreferredCountries) => void;
  onLogout: () => void;
};

export const MyPage = ({
  preferredCountries,
  onSavePreferredCountries,
  onLogout,
}: MyPageProps) => {
  const [activeTab, setActiveTab] = useState<string>('interests');
  const [isEditingInterests, setIsEditingInterests] = useState(false);
  const [interestSelection, setInterestSelection] =
    useState<PreferredCountries>(preferredCountries);
  const [compareSets, setCompareSets] = useState<CompareSet[]>(mockCompareSets);
  const [selectedLaw, setSelectedLaw] = useState<LawItem | null>(null);
  const { savedIds, toggleSaved } = useSavedLaws();

  useEffect(() => {
    if (!isEditingInterests) {
      setInterestSelection(preferredCountries);
    }
  }, [isEditingInterests, preferredCountries]);

  const bookmarks = useMemo(
    () =>
      mockLaws
        .filter((law) => savedIds.includes(law.id))
        .map((law) => ({ ...law, saved: true })),
    [savedIds],
  );

  const displayedInterests = useMemo(
    () => (isEditingInterests ? interestSelection : preferredCountries),
    [interestSelection, isEditingInterests, preferredCountries],
  );

  const toggleInterest = (code: PreferredCountries[number]) => {
    if (!isEditingInterests) return;
    setInterestSelection((prev) =>
      prev.includes(code)
        ? prev.filter((item) => item !== code)
        : [...prev, code],
    );
  };

  const handleSaveInterests = () => {
    onSavePreferredCountries(interestSelection);
    setIsEditingInterests(false);
  };

  const handleCancelInterests = () => {
    setInterestSelection(preferredCountries);
    setIsEditingInterests(false);
  };

  const handleDeleteBookmark = (id: number) => {
    toggleSaved(id);
    setSelectedLaw((prev) => (prev && prev.id === id ? null : prev));
  };

  const handleToggleSave = (id: number) => {
    toggleSaved(id);
    setSelectedLaw((prev) =>
      prev && prev.id === id ? { ...prev, saved: !prev.saved } : prev,
    );
  };

  const handleDeleteCompare = (id: number) => {
    setCompareSets((prev) => prev.filter((item) => item.id !== id));
  };

  const handleRevisitCompare = (setItem: CompareSet) => {
    console.info('Revisit compare set', setItem);
  };

  useEffect(() => {
    if (!selectedLaw) return;
    const updated = bookmarks.find((law) => law.id === selectedLaw.id);
    if (updated && updated.saved !== selectedLaw.saved) {
      setSelectedLaw(updated);
    }
    // 북마크에서 제거되어도 모달 유지 (사용자가 직접 닫도록)
  }, [bookmarks, selectedLaw]);

  return (
    <div className="min-h-screen bg-bg-soft font-sans">
      <Header />

      <section className="w-full bg-white shadow-sm border-b border-border-subtle">
        <div className="mx-auto flex h-[133px] items-center justify-between px-8 sm:px-8 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-surface text-brand-primary">
              <UserRound className="h-7 w-7" strokeWidth={2.2} />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-[28px] font-medium leading-tight text-text-primary sm:text-[32px]">
                마이페이지
              </h1>
              <p className="text-sm font-normal text-text-secondary sm:text-base">
                저장한 법률 정보를 관리하세요.
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="md"
            className="min-w-[120px] border-border-base text-text-primary hover:border-border-selected"
            onClick={onLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            로그아웃
          </Button>
        </div>
      </section>

      <main className="mx-auto max-w-[1120px] px-8 pb-10 pt-8">
        <DashboardTabs
          defaultValue="interests"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <DashboardTabsList className="mb-4 flex flex-wrap">
            <DashboardTabsTrigger value="interests">
              <Globe className="h-4 w-4" />
              관심 국가
            </DashboardTabsTrigger>
            <DashboardTabsTrigger value="bookmarks">
              <BookmarkIcon className="h-4 w-4" />
              북마크
            </DashboardTabsTrigger>
            <DashboardTabsTrigger value="compare">
              <GitCompare className="h-4 w-4" />
              비교 조합
            </DashboardTabsTrigger>
          </DashboardTabsList>

          <DashboardTabsContent value="interests">
            <Card className="rounded-2xl border-border-subtle bg-white px-5 py-5 shadow-sm sm:px-6 sm:py-6">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-lg font-semibold text-text-primary">
                  관심 국가 관리
                </h2>
                <div className="flex items-center gap-2">
                  {isEditingInterests ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-border-base text-text-secondary hover:border-border-selected"
                        onClick={handleCancelInterests}
                      >
                        취소
                      </Button>
                      <Button
                        size="sm"
                        className="bg-brand-primary px-4 text-white hover:brightness-95"
                        onClick={handleSaveInterests}
                      >
                        저장
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-border-base text-text-primary hover:border-border-selected"
                      onClick={() => setIsEditingInterests(true)}
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
                      onClick={() => toggleInterest(country.code)}
                      disabled={!isEditingInterests}
                      aria-pressed={isSelected}
                      className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition ${
                        isSelected
                          ? 'border-state-selected-border bg-brand-surface shadow-[0_6px_18px_rgba(15,23,42,0.08)]'
                          : 'border-border-subtle bg-white hover:border-border-base'
                      } ${!isEditingInterests ? 'cursor-default' : ''}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{country.flag}</span>
                        <span className="text-sm font-semibold text-text-primary">
                          {country.name}
                        </span>
                      </div>
                      {isEditingInterests ? (
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
                관심 국가를 설정하면 G.law에서 맞춤형 법률 정보를 받을 수
                있습니다
              </p>
              {!displayedInterests.length && !isEditingInterests ? (
                <div className="mt-3 rounded-lg border border-border-subtle bg-bg-soft px-4 py-3 text-sm text-text-secondary">
                  아직 관심 국가를 설정하지 않았습니다. 수정 버튼을 눌러 설정을
                  시작하세요.
                </div>
              ) : null}
              {isEditingInterests && displayedInterests.length === 0 ? (
                <div className="mt-3 text-sm text-text-tertiary">
                  관심 국가를 선택하지 않아도 서비스를 이용할 수 있지만, 관심
                  국가를 선택하면 대시보드가 더 유용해집니다.
                </div>
              ) : null}
            </Card>
          </DashboardTabsContent>

          <DashboardTabsContent value="bookmarks">
            <div className="space-y-3">
              {bookmarks.map((item) => (
                <Card
                  key={item.id}
                  className="rounded-2xl border-border-subtle bg-white px-5 py-4 shadow-sm sm:px-6"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge
                          variant="outline"
                          className="min-w-[48px] justify-center px-3"
                        >
                          {item.country}
                        </Badge>
                        <Badge
                          variant="tag"
                          className="min-w-[48px] justify-center px-3"
                        >
                          {item.category}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-semibold text-text-primary leading-tight">
                        {item.title}
                        {item.subTitle ? (
                          <span className="ml-2 text-base font-normal text-text-secondary">
                            ({item.subTitle})
                          </span>
                        ) : null}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <button
                        type="button"
                        onClick={() => setSelectedLaw(item)}
                        className="inline-flex h-[34px] items-center justify-center gap-2 rounded-md border border-border-base px-3 text-sm font-semibold text-text-primary transition hover:border-border-selected"
                      >
                        <ExternalLink className="h-4 w-4" />
                        보기
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteBookmark(item.id)}
                        className="inline-flex h-[34px] items-center justify-center rounded-md px-3 text-sm font-semibold text-danger-base transition hover:bg-danger-surface"
                        aria-label="북마크 삭제"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </Card>
              ))}

              {bookmarks.length === 0 ? (
                <Card className="rounded-lg border-border-subtle bg-white px-5 py-10 text-center text-text-secondary shadow-sm">
                  저장한 북마크가 없습니다. 법률 모아보기에서 법률을 확인해
                  보세요.
                </Card>
              ) : null}
            </div>
          </DashboardTabsContent>

          <DashboardTabsContent value="compare">
            <div className="space-y-3">
              {compareSets.map((setItem) => (
                <Card
                  key={setItem.id}
                  className="rounded-2xl border-border-subtle bg-white px-5 py-4 shadow-sm sm:px-6"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-text-primary leading-tight">
                        {setItem.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2">
                        {setItem.countries.map((code) => (
                          <Badge
                            key={code}
                            variant="outline"
                            className="min-w-[44px] justify-center px-3 uppercase"
                          >
                            {code}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <button
                        type="button"
                        onClick={() => handleRevisitCompare(setItem)}
                        className="inline-flex h-[34px] items-center justify-center gap-2 rounded-md border border-border-base px-3 text-sm font-semibold text-text-primary transition hover:border-border-selected"
                      >
                        <ExternalLink className="h-4 w-4" />
                        다시 보기
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteCompare(setItem.id)}
                        className="inline-flex h-[34px] items-center justify-center rounded-md px-3 text-sm font-semibold text-danger-base transition hover:bg-danger-surface"
                        aria-label="비교 조합 삭제"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </Card>
              ))}

              {compareSets.length === 0 ? (
                <Card className="rounded-lg border-border-subtle bg-white px-5 py-10 text-center text-text-secondary shadow-sm">
                  저장된 비교 조합이 없습니다. 법률 비교에서 국가를 선택해
                  비교를 시작해 보세요.
                </Card>
              ) : null}
            </div>
          </DashboardTabsContent>
        </DashboardTabs>
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

export default MyPage;
