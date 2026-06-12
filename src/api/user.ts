import apiClient from '@/lib/apiClient';

export type UserRole = 'ROLE_GUEST' | 'ROLE_USER';

export type UserCountry = {
  countryId: number;
  code: string;
  name: string;
  stateCode?: string;
  stateName?: string;
};

export type UserMe = {
  userId: number;
  email: string;
  name: string;
  role: UserRole;
  countries: UserCountry[];
};

type ApiResponse<T> = {
  result: T;
};

export type UpdateUserCountriesRequest = {
  countryIds: number[];
};

export const getMyInfo = async (): Promise<UserMe> => {
  const { data } = await apiClient.get<ApiResponse<UserMe>>('/api/users/me');
  return data.result;
};

export const updateUserCountries = async (
  payload: UpdateUserCountriesRequest,
): Promise<void> => {
  await apiClient.patch('/api/users/countries', payload);
};
