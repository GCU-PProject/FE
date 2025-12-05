import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { MainDashboardPage } from '@/pages/ui/MainDashboardPage';
import { LawCollectionPage } from '@/pages/ui/LawCollectionPage';
import { LoginPage } from '@/pages/ui/LoginPage';
import { InterestCountryModal } from '@/components/interest/InterestCountryModal';
import { usePreferredCountries } from '@/hooks/usePreferredCountries';
import { Header } from '@/components/layout/Header';

const HeaderOnlyPage = () => (
  <div className="min-h-screen bg-surface font-sans">
    <Header />
  </div>
);

export const AppRoutes = () => {
  const navigate = useNavigate();
  const { preferredCountries, savePreferredCountries, hasPreferredCountries } =
    usePreferredCountries();

  const [isLoggedIn, setIsLoggedIn] = useState(() => hasPreferredCountries);
  const [isInterestModalOpen, setIsInterestModalOpen] = useState(false);
  const [modalSelection, setModalSelection] =
    useState<string[]>(preferredCountries);

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

  const handleSaveInterest = (countries: string[]) => {
    savePreferredCountries(countries);
    setIsInterestModalOpen(false);
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
            isLoggedIn ? <HeaderOnlyPage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/law-compare"
          element={
            isLoggedIn ? <HeaderOnlyPage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/mypage"
          element={
            isLoggedIn ? <HeaderOnlyPage /> : <Navigate to="/login" replace />
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
