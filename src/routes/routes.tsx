import { Navigate, createBrowserRouter } from 'react-router-dom';
import { ExamplePage } from '@/pages/ui/ExamplePage';
import { LoginPage } from '@/pages/ui/LoginPage';
import { InterestCountryModal } from '@/components/interest/InterestCountryModal';
import { usePreferredCountries } from '@/hooks/usePreferredCountries';
import { CountryCode } from '@/types/country';
import { MyPage } from '@/pages/ui/MyPage';
import { AiChatPage } from '@/pages/ui/AiChatPage';
import { LawComparisonPage } from '@/pages/ui/LawComparisonPage';

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
import { AiChatPage } from '@/pages/ui/AiChatPage';

const LoginRoute = () => {
  const handleGoogleLogin = () => {
    console.log('Google 로그인 버튼 클릭!');
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
            isLoggedIn ? <AiChatPage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/law-compare"
          element={
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
  return <LoginPage onGoogleLogin={handleGoogleLogin} />;
};

/** 앱 라우트 정의 (RouterProvider에서 사용) */
export const appRouter = createBrowserRouter([
  { path: '/', element: <LoginRoute /> },
  { path: '/law-collection', element: <ExamplePage /> },
  { path: '/ai-consulting', element: <AiChatPage /> },
  { path: '/law-compare', element: <ExamplePage /> },
  { path: '/mypage', element: <ExamplePage /> },
  { path: '*', element: <Navigate to="/" replace /> },
]);
