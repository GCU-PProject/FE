import { useCallback, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { LoginPage } from '@/pages/ui/LoginPage';
import { InterestCountryModal } from '@/components/interest/InterestCountryModal';
import { usePreferredCountries } from '@/hooks/usePreferredCountries';
import type { CountryCode } from '@/types/country';
import { MyPage } from '@/pages/ui/MyPage';
import { AiChatPage } from '@/pages/ui/AiChatPage';
import { LawComparisonPage } from '@/pages/ui/LawComparisonPage';
import { MainDashboardPage } from '@/pages/ui/MainDashboardPage';
import { LawCollectionPage } from '@/pages/ui/LawCollectionPage';
import { LawRiskPage } from '@/pages/ui/LawRiskPage';
import {
  OAUTH_LOGIN_STARTED_KEY,
  logout,
  onboarding,
  reissue,
  startGoogleLogin,
} from '@/api/auth';
import { getMyInfo, updateUserCountries } from '@/api/user';
import { INTEREST_COUNTRIES } from '@/constants/interestCountries';
import env from '@/lib/env';
import { mapCountryCodesToIds } from '@/lib/countryIds';

type AuthStatus = 'checking' | 'anonymous' | 'guest' | 'user';

const VALID_COUNTRY_CODES = new Set(INTEREST_COUNTRIES.map((country) => country.code));
const AUTH_SESSION_KEY = 'glaw:has-auth-session';

const shouldCheckAuthOnRoute = (pathname: string): boolean => {
  if (typeof window === 'undefined') return false;
  if (pathname === '/login') return false;

  return (
    window.sessionStorage.getItem(OAUTH_LOGIN_STARTED_KEY) === 'true' ||
    window.localStorage.getItem(AUTH_SESSION_KEY) === 'true'
  );
};

const rememberAuthSession = () => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(AUTH_SESSION_KEY, 'true');
  window.sessionStorage.removeItem(OAUTH_LOGIN_STARTED_KEY);
};

const forgetAuthSession = () => {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(AUTH_SESSION_KEY);
  window.sessionStorage.removeItem(OAUTH_LOGIN_STARTED_KEY);
};

const getApiErrorCode = (error: unknown): string | undefined => {
  if (!error || typeof error !== 'object') return undefined;

  const response = (error as { response?: { data?: { code?: unknown } } }).response;
  return typeof response?.data?.code === 'string'
    ? response.data.code
    : undefined;
};

const normalizeCountryCodes = (codes: string[]): CountryCode[] =>
  Array.from(
    new Set(
      codes
        .map((code) => code.toUpperCase())
        .filter((code): code is CountryCode => VALID_COUNTRY_CODES.has(code)),
    ),
  );

export const AppRoutes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    preferredCountries,
    savePreferredCountries,
    clearPreferredCountries,
  } = usePreferredCountries();

  const [authStatus, setAuthStatus] = useState<AuthStatus>('checking');
  const [modalSelection, setModalSelection] = useState(preferredCountries);
  const [isOnboardingSaving, setIsOnboardingSaving] = useState(false);

  const applyMyInfo = useCallback(
    (me: Awaited<ReturnType<typeof getMyInfo>>) => {
      const codes = normalizeCountryCodes(
        me.countries.map((country) => country.code),
      );
      rememberAuthSession();
      savePreferredCountries(codes);
      setModalSelection(codes);
      setAuthStatus(me.role === 'ROLE_GUEST' ? 'guest' : 'user');
    },
    [savePreferredCountries],
  );

  useEffect(() => {
    if (location.pathname === '/login') {
      forgetAuthSession();
      clearPreferredCountries();
      setModalSelection([]);
      setAuthStatus('anonymous');
      return;
    }

    if (
      location.pathname === '/onboarding' &&
      typeof window !== 'undefined' &&
      window.sessionStorage.getItem(OAUTH_LOGIN_STARTED_KEY) === 'true'
    ) {
      setAuthStatus('guest');
      return;
    }

    if (!shouldCheckAuthOnRoute(location.pathname)) {
      clearPreferredCountries();
      setModalSelection([]);
      setAuthStatus('anonymous');
      return;
    }

    let isMounted = true;

    void (async () => {
      try {
        const me = await getMyInfo();
        if (!isMounted) return;
        applyMyInfo(me);
      } catch {
        try {
          await reissue();
          const me = await getMyInfo();
          if (!isMounted) return;
          applyMyInfo(me);
        } catch {
          if (!isMounted) return;
          forgetAuthSession();
          clearPreferredCountries();
          setModalSelection([]);
          setAuthStatus('anonymous');
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [applyMyInfo, clearPreferredCountries, location.pathname]);

  const handleSkipInterest = () => {
    window.alert('온보딩 완료 후 서비스를 이용할 수 있습니다.');
  };

  const handleGoogleLogin = () => {
    startGoogleLogin();
  };

  const handleSaveInterest = (countries: CountryCode[]) => {
    void (async () => {
      const { countryIds, missingCodes } = mapCountryCodesToIds(
        countries,
        env.countryIdMap,
      );

      if (missingCodes.length > 0) {
        window.alert(
          `countryId 매핑이 없는 국가가 있습니다: ${missingCodes.join(', ')}`,
        );
        return;
      }

      setIsOnboardingSaving(true);
      try {
        await onboarding({ countryIds });
        const me = await getMyInfo();
        applyMyInfo(me);

        if (me.role === 'ROLE_USER') {
          void navigate('/');
        }
      } catch (error) {
        if (getApiErrorCode(error) === 'ONBOARDING_ALREADY_COMPLETED') {
          try {
            const me = await getMyInfo();
            applyMyInfo(me);
            void navigate('/');
            return;
          } catch {
            // Fall through to the generic error message.
          }
        }
        window.alert('온보딩 저장에 실패했습니다. 잠시 후 다시 시도해 주세요.');
      } finally {
        setIsOnboardingSaving(false);
      }
    })();
  };

  const handleSavePreferredCountries = async (countries: CountryCode[]) => {
    const { countryIds, missingCodes } = mapCountryCodesToIds(
      countries,
      env.countryIdMap,
    );

    if (missingCodes.length > 0) {
      window.alert(
        `countryId 매핑이 없는 국가가 있습니다: ${missingCodes.join(', ')}`,
      );
      throw new Error('Missing countryId mapping');
    }

    try {
      await updateUserCountries({ countryIds });
      const me = await getMyInfo();
      applyMyInfo(me);
    } catch {
      window.alert('관심 국가 저장에 실패했습니다. 잠시 후 다시 시도해 주세요.');
      throw new Error('Failed to update user countries');
    }
  };

  const handleLogout = () => {
    void (async () => {
      try {
        await logout();
      } finally {
        clearPreferredCountries();
        forgetAuthSession();
        if (typeof window !== 'undefined') {
          window.localStorage.removeItem('savedLaws');
        }
        setAuthStatus('anonymous');
        void navigate('/login');
      }
    })();
  };

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
            <Navigate to={authStatus === 'guest' ? '/onboarding' : '/login'} replace />
          )
        }
      />
      <Route
        path="/login"
        element={
          authStatus === 'anonymous' ? (
            <LoginPage onGoogleLogin={handleGoogleLogin} />
          ) : (
            <Navigate to={authStatus === 'guest' ? '/onboarding' : '/'} replace />
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
          authStatus === 'user' ? <LawCollectionPage /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/ai-consulting"
        element={
          authStatus === 'user' ? <AiChatPage /> : <Navigate to="/login" replace />
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
