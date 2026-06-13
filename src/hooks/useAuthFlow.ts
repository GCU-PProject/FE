import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
import { usePreferredCountries } from '@/hooks/usePreferredCountries';
import type { CountryCode } from '@/types/country';

export type AuthStatus = 'checking' | 'anonymous' | 'guest' | 'user';

const VALID_COUNTRY_CODES = new Set(
  INTEREST_COUNTRIES.map((country) => country.code),
);
const AUTH_SESSION_KEY = 'glaw:has-auth-session';
let hasCheckedAuthInCurrentLoad = false;

const shouldCheckAuthOnRoute = (): boolean => {
  if (typeof window === 'undefined') return false;

  return (
    !hasCheckedAuthInCurrentLoad ||
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

  const response = (error as { response?: { data?: { code?: unknown } } })
    .response;
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

export const useAuthFlow = () => {
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

  const completeOnboarding = useCallback(
    async (countryIds: number[]) => {
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
    },
    [applyMyInfo, navigate],
  );

  useEffect(() => {
    if (!shouldCheckAuthOnRoute()) {
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
        hasCheckedAuthInCurrentLoad = true;
        applyMyInfo(me);
      } catch {
        try {
          await reissue();
          const me = await getMyInfo();
          if (!isMounted) return;
          hasCheckedAuthInCurrentLoad = true;
          applyMyInfo(me);
        } catch {
          if (!isMounted) return;
          hasCheckedAuthInCurrentLoad = true;
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
    void completeOnboarding([]);
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

      await completeOnboarding(countryIds);
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

  return {
    authStatus,
    preferredCountries,
    modalSelection,
    isOnboardingSaving,
    handleGoogleLogin,
    handleSkipInterest,
    handleSaveInterest,
    handleSavePreferredCountries,
    handleLogout,
  };
};

export default useAuthFlow;
