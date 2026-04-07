const requiredEnv = (value: string | undefined, key: string): string => {
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

const parseCountryIdMap = (
  value: string | undefined,
): Record<string, number> => {
  if (!value) return {};

  try {
    const parsed = JSON.parse(value) as Record<string, unknown>;
    return Object.entries(parsed).reduce<Record<string, number>>(
      (acc, [code, id]) => {
        if (typeof id === 'number' && Number.isFinite(id)) {
          acc[code.toUpperCase()] = id;
        }
        return acc;
      },
      {},
    );
  } catch {
    throw new Error(
      'Invalid VITE_COUNTRY_ID_MAP. Use JSON object format, e.g. {"US":1,"JP":2}',
    );
  }
};

export const env = {
  apiBaseUrl: requiredEnv(
    import.meta.env.VITE_API_BASE_URL,
    'VITE_API_BASE_URL',
  ),
  googleLoginUrl: requiredEnv(
    import.meta.env.VITE_GOOGLE_LOGIN_URL,
    'VITE_GOOGLE_LOGIN_URL',
  ),
  loginRedirectUrl: import.meta.env.VITE_LOGIN_REDIRECT_URL,
  countryIdMap: parseCountryIdMap(import.meta.env.VITE_COUNTRY_ID_MAP),
};

export default env;
