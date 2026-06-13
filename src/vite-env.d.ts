/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Optional because src/lib/env.ts provides runtime defaults for local/preview environments.
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_AI_API_BASE_URL?: string;
  readonly VITE_GOOGLE_LOGIN_URL?: string;
  readonly VITE_LOGIN_REDIRECT_URL?: string;
  readonly VITE_COUNTRY_ID_MAP?: string;
  readonly VITE_FORCE_LOGIN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
