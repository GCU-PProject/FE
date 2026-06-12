import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '@/pages/ui/LoginPage';
import { InterestCountryModal } from '@/components/interest/InterestCountryModal';
import { MyPage } from '@/pages/ui/MyPage';
import { AiChatPage } from '@/pages/ui/AiChatPage';
import { LawComparisonPage } from '@/pages/ui/LawComparisonPage';
import { MainDashboardPage } from '@/pages/ui/MainDashboardPage';
import { LawCollectionPage } from '@/pages/ui/LawCollectionPage';
import { LawRiskPage } from '@/pages/ui/LawRiskPage';
import { useAuthFlow } from '@/hooks/useAuthFlow';

export const AppRoutes = () => {
  const {
    authStatus,
    preferredCountries,
    modalSelection,
    isOnboardingSaving,
    handleGoogleLogin,
    handleSkipInterest,
    handleSaveInterest,
    handleSavePreferredCountries,
    handleLogout,
  } = useAuthFlow();

  if (authStatus === 'checking') {
    return (
      <div className="flex min-h-screen items-center justify-center text-text-secondary">
        로그인 상태 확인 중...
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          authStatus === 'user' ? (
            <MainDashboardPage preferredCountries={preferredCountries} />
          ) : (
            <Navigate
              to={authStatus === 'guest' ? '/onboarding' : '/login'}
              replace
            />
          )
        }
      />
      <Route
        path="/login"
        element={
          authStatus === 'anonymous' ? (
            <LoginPage onGoogleLogin={handleGoogleLogin} />
          ) : (
            <Navigate
              to={authStatus === 'guest' ? '/onboarding' : '/'}
              replace
            />
          )
        }
      />
      <Route
        path="/onboarding"
        element={
          authStatus === 'guest' ? (
            <div className="min-h-screen bg-bg-soft">
              <InterestCountryModal
                open
                initialSelected={modalSelection}
                onSkip={handleSkipInterest}
                onSave={handleSaveInterest}
              />
              {isOnboardingSaving ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 text-white">
                  저장 중...
                </div>
              ) : null}
            </div>
          ) : (
            <Navigate to={authStatus === 'user' ? '/' : '/login'} replace />
          )
        }
      />
      <Route
        path="/law-collection"
        element={
          authStatus === 'user' ? (
            <LawCollectionPage />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/ai-consulting"
        element={
          authStatus === 'user' ? (
            <AiChatPage />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/law-compare"
        element={
          authStatus === 'user' ? (
            <LawComparisonPage />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/law-risk"
        element={
          authStatus === 'user' ? (
            <LawRiskPage />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/mypage"
        element={
          authStatus === 'user' ? (
            <MyPage
              preferredCountries={preferredCountries}
              onSavePreferredCountries={handleSavePreferredCountries}
              onLogout={handleLogout}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
