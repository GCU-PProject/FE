const getAiApiBaseUrl = (): string => {
  return import.meta.env.VITE_AI_API_BASE_URL ?? '/ai-api';
};

export type ChatQnaRequest = {
  query: string;
  country_id: number;
  session_id: string;
};

export type ChatQnaResponse = {
  success: boolean;
  status: number;
  code: string;
  message: string;
  timestamp: string;
  result: {
    answer: string;
    related_law_id_list?: number[];
    search_success?: boolean;
  } | null;
};

export const requestChatAnswer = async (
  payload: ChatQnaRequest,
  signal?: AbortSignal,
): Promise<ChatQnaResponse> => {
  const response = await fetch(`${getAiApiBaseUrl()}/api/qna`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    signal,
  });

  const data = (await response.json()) as ChatQnaResponse;

  if (!response.ok || !data.success || !data.result) {
    throw new Error(data.message || 'AI 답변을 불러오지 못했습니다.');
  }

  return data;
};
