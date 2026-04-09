import apiClient from '@/lib/apiClient';
import env from '@/lib/env';

export type OnboardingRequest = {
  countryIds: number[];
};

export const startGoogleLogin = (): void => {
  if (typeof window === 'undefined') return;

  const redirectUrl =
    env.loginRedirectUrl ??
    `${window.location.origin.replace(/\/$/, '')}/onboarding`;

  const loginUrl = new URL(env.googleLoginUrl, window.location.origin);
  loginUrl.searchParams.set('redirect_uri', redirectUrl);
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
