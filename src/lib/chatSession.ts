const CHAT_SESSION_STORAGE_KEY = 'glawChatSessionId';

const createSessionId = (): string => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `chat-${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

export const getChatSessionId = (): string => {
  if (typeof window === 'undefined') {
    return createSessionId();
  }

  const storedSessionId = window.sessionStorage.getItem(
    CHAT_SESSION_STORAGE_KEY,
  );

  if (storedSessionId) {
    return storedSessionId;
  }

  const sessionId = createSessionId();
  window.sessionStorage.setItem(CHAT_SESSION_STORAGE_KEY, sessionId);

  return sessionId;
};
