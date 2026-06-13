const getEnvValue = (value: string | undefined, fallback: string): string =>
  value ?? fallback;

const getDefaultApiBaseUrl = (): string => {
  if (typeof window === 'undefined') return '';
  return window.location.origin;
};

const parseCountryIdMap = (
  value: string | undefined,
): Record<string, number> => {
  if (!value) {
    throw new Error('Missing required environment variable: VITE_COUNTRY_ID_MAP');
  }

  try {
    const parsed = JSON.parse(value) as Record<string, unknown>;
    return Object.entries(parsed).reduce<Record<string, number>>(
      (acc, [code, id]) => {
        if (typeof id === 'number' && Number.isFinite(id)) {
          acc[code.toUpperCase()] = id;
          return acc;
        }
        throw new Error(`Invalid country id mapping for ${code}`);
      },
      {},
    );
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error(
        'Invalid VITE_COUNTRY_ID_MAP. Use JSON object format, e.g. {"US":1,"JP":2}',
      );
    }
    throw new Error(
      'Invalid VITE_COUNTRY_ID_MAP. Country IDs must be finite numbers.',
    );
  }
};

export const env = {
  apiBaseUrl: getEnvValue(
    import.meta.env.VITE_API_BASE_URL,
    getDefaultApiBaseUrl(),
  ),
  googleLoginUrl: getEnvValue(
    import.meta.env.VITE_GOOGLE_LOGIN_URL,
    '/oauth2/authorization/google',
  ),
  loginRedirectUrl: import.meta.env.VITE_LOGIN_REDIRECT_URL,
  countryIdMap: parseCountryIdMap(import.meta.env.VITE_COUNTRY_ID_MAP),
};

export default env;
