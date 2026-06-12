import { useEffect, useMemo, useState } from 'react';
import {
  Bookmark as BookmarkIcon,
  GitCompare,
  Globe,
  LogOut,
  UserRound,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import {
  DashboardTabs,
  DashboardTabsContent,
  DashboardTabsList,
  DashboardTabsTrigger,
} from '@/components/common/DashboardTabs';
import { Button } from '@/components/common/button/Button';
import { LawDetailModal } from '@/components/law/LawDetailModal';
import type { PreferredCountries } from '@/types/country';
import type { CompareSet } from '@/types/mypage';
import type { LawItem } from '@/types/law';
import { useSavedLaws } from '@/hooks/useSavedLaws';
import { mockLaws } from '@/mocks/laws';
import { InterestsTab } from '@/components/mypage/InterestsTab';
import { BookmarksTab } from '@/components/mypage/BookmarksTab';
import { CompareTab } from '@/components/mypage/CompareTab';

type MyPageProps = {
  preferredCountries: PreferredCountries;
  onSavePreferredCountries: (countries: PreferredCountries) => Promise<void>;
  onLogout: () => void;
};

export const MyPage = ({
  preferredCountries,
  onSavePreferredCountries,
  onLogout,
}: MyPageProps) => {
  const [activeTab, setActiveTab] = useState<string>('interests');
  const [isEditingInterests, setIsEditingInterests] = useState(false);
  const [isSavingInterests, setIsSavingInterests] = useState(false);
  const [interestSelection, setInterestSelection] =
    useState<PreferredCountries>(preferredCountries);
  const [compareSets, setCompareSets] = useState<CompareSet[]>([]);
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
    void (async () => {
      setIsSavingInterests(true);
      try {
        await onSavePreferredCountries(interestSelection);
        setIsEditingInterests(false);
      } catch {
        // useAuthFlow shows the user-facing error via window.alert.
      } finally {
        setIsSavingInterests(false);
      }
    })();
  };

  const handleCancelInterests = () => {
    setInterestSelection(preferredCountries);
    setIsEditingInterests(false);
  };

  const handleDeleteBookmark = (id: number) => {
    toggleSaved(id);
    setSelectedLaw((prev) =>
      prev && prev.id === id ? { ...prev, saved: false } : prev,
    );
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
        <div className="mx-auto flex h-[133px] items-center justify-between px-8">
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
            <InterestsTab
              displayedInterests={displayedInterests}
              isEditing={isEditingInterests}
              onStartEdit={() => setIsEditingInterests(true)}
              onToggleInterest={toggleInterest}
              onSave={handleSaveInterests}
              onCancel={handleCancelInterests}
              isSaving={isSavingInterests}
            />
          </DashboardTabsContent>

          <DashboardTabsContent value="bookmarks">
            <BookmarksTab
              bookmarks={bookmarks}
              onView={(item) => setSelectedLaw(item)}
              onDelete={handleDeleteBookmark}
            />
          </DashboardTabsContent>

          <DashboardTabsContent value="compare">
            <CompareTab
              compareSets={compareSets}
              onRevisit={handleRevisitCompare}
              onDelete={handleDeleteCompare}
            />
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
