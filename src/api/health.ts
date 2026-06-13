import apiClient from '@/lib/apiClient';

export const getHealth = async (): Promise<string> => {
  const { data } = await apiClient.get<string>('/health', {
    responseType: 'text',
  });
  return data;
};
