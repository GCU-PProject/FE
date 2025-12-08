import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { MainDashboardPage } from '@/pages/ui/MainDashboardPage';
import { LawCollectionPage } from '@/pages/ui/LawCollectionPage';
import { LoginPage } from '@/pages/ui/LoginPage';
import { InterestCountryModal } from '@/components/interest/InterestCountryModal';
import { usePreferredCountries } from '@/hooks/usePreferredCountries';
import { Header } from '@/components/layout/Header';
import { CountryCode } from '@/types/country';
import { MyPage } from '@/pages/ui/MyPage';
import { LawComparisonPage } from '@/pages/ui/LawComparisonPage';

// 이제 이 부분도 삭제해 주시면 될 것 같아용
const HeaderOnlyPage = () => (
  <div className="min-h-screen bg-surface font-sans">
    <Header />
  </div>
);

export const AppRoutes = () => {
  const navigate = useNavigate();
  const {
    preferredCountries,
    savePreferredCountries,
    clearPreferredCountries,
    hasPreferredCountries,
  } = usePreferredCountries();

  const [isLoggedIn, setIsLoggedIn] = useState(() => hasPreferredCountries);
  const [isInterestModalOpen, setIsInterestModalOpen] = useState(false);
  // 모달에서만 사용하는 임시 선택값
  // 저장 시 usePreferredCountries에 반영
  const [modalSelection, setModalSelection] = useState(preferredCountries);

  useEffect(() => {
    if (hasPreferredCountries) {
      setIsLoggedIn(true);
      setModalSelection(preferredCountries);
    }
  }, [hasPreferredCountries, preferredCountries]);

  const handleGoogleLogin = () => {
    setIsLoggedIn(true);
    if (!hasPreferredCountries) {
      setModalSelection(preferredCountries);
      setIsInterestModalOpen(true);
    }
    void navigate('/');
  };

  const handleSkipInterest = () => {
    setIsInterestModalOpen(false);
  };

  const handleSaveInterest = (countries: CountryCode[]) => {
    savePreferredCountries(countries);
    setIsInterestModalOpen(false);
  };

  const handleLogout = () => {
    clearPreferredCountries();
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('savedLaws');
    }
    setIsLoggedIn(false);
    void navigate('/login');
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <MainDashboardPage preferredCountries={preferredCountries} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/" replace />
            ) : (
              <LoginPage onGoogleLogin={handleGoogleLogin} />
            )
          }
        />
        <Route
          path="/law-collection"
          element={
            isLoggedIn ? (
              <LawCollectionPage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/ai-consulting"
          element={
            // 이 부분만 다른 페이지처럼 HeaderOnlyPage가 아닌 제작하신 페이지가 렌더링되도록 수정해 주시면 돼요!
            isLoggedIn ? <HeaderOnlyPage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/law-compare"
          element={
            // 요기도 마찬가지로 수정해 주시면 됩니다!(완)
            isLoggedIn ? <LawComparisonPage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/mypage"
          element={
            isLoggedIn ? (
              <MyPage
                preferredCountries={preferredCountries}
                onSavePreferredCountries={savePreferredCountries}
                onLogout={handleLogout}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <InterestCountryModal
        open={isInterestModalOpen}
        initialSelected={modalSelection}
        onSkip={handleSkipInterest}
        onSave={handleSaveInterest}
      />
    </>
  );
};

export default AppRoutes;