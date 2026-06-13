import apiClient from '@/lib/apiClient';
import env from '@/lib/env';

export type OnboardingRequest = {
  countryIds: number[];
};

export const OAUTH_LOGIN_STARTED_KEY = 'glaw:oauth-login-started';
export const AUTH_CHECKED_KEY = 'glaw:auth-checked';

export const startGoogleLogin = (): void => {
  if (typeof window === 'undefined') return;

  const loginUrl = new URL(env.googleLoginUrl, window.location.origin);
  window.sessionStorage.removeItem(AUTH_CHECKED_KEY);
  window.sessionStorage.setItem(OAUTH_LOGIN_STARTED_KEY, 'true');
  window.location.href = loginUrl.toString();
};

export const logout = async (): Promise<void> => {
  await apiClient.post('/api/auth/logout');
};

export const reissue = async (): Promise<void> => {
  await apiClient.post('/api/auth/reissue');
};

export const onboarding = async (payload: OnboardingRequest): Promise<void> => {
  await apiClient.post('/api/auth/onboarding', payload);
};
