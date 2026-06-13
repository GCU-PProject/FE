import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '@/pages/ui/LoginPage';
import { InterestCountryModal } from '@/components/interest/InterestCountryModal';
import { MyPage } from '@/pages/ui/MyPage';
import { AiChatPage } from '@/pages/ui/AiChatPage';
import { LawComparisonPage } from '@/pages/ui/LawComparisonPage';
import { MainDashboardPage } from '@/pages/ui/MainDashboardPage';
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

  const protectedRedirectPath =
    authStatus === 'guest' ? '/onboarding' : '/login';

  const myPageProps = {
    preferredCountries,
    onSavePreferredCountries: handleSavePreferredCountries,
    onLogout: handleLogout,
  };

  if (authStatus === 'checking') {
    return (
      <>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <MainDashboardPage />
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
            path="/ai-consulting"
            element={
              isLoggedIn ? <AiChatPage /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/law-compare"
            element={
              isLoggedIn ? (
                <LawComparisonPage />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/law-risk"
            element={
              isLoggedIn ? <LawRiskPage /> : <Navigate to="/login" replace />
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
            <Navigate to={protectedRedirectPath} replace />
          )
        }
      />
      <Route
        path="/ai-consulting"
        element={
          authStatus === 'user' ? (
            <AiChatPage />
          ) : (
            <Navigate to={protectedRedirectPath} replace />
          )
        }
      />
      <Route
        path="/law-compare"
        element={
          authStatus === 'user' ? (
            <LawComparisonPage />
          ) : (
            <Navigate to={protectedRedirectPath} replace />
          )
        }
      />
      <Route
        path="/law-risk"
        element={
          authStatus === 'user' ? (
            <LawRiskPage />
          ) : (
            <Navigate to={protectedRedirectPath} replace />
          )
        }
      />
      <Route
        path="/mypage"
        element={
          authStatus === 'user' ? (
            <MyPage {...myPageProps} />
          ) : (
            <Navigate to={protectedRedirectPath} replace />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
