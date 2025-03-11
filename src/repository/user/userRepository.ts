// repositories/userRepository.ts
import { ApiResponse } from '@/types/apiResponse';
import { UserResponse } from './userModels';
import { apiFetch } from '@/utils/apiFetch';
import { userRoutes } from './userRoutes';

export const userRepository = {
  getUser: async (): Promise<ApiResponse<UserResponse>> => {
    const response = await apiFetch<UserResponse>(userRoutes.get(), {
      method: 'GET',
      credentials: 'include',
    });

    return response;
  },
};