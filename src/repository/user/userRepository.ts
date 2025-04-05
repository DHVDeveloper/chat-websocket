import { ApiResponse } from '@/types/apiResponse';
import { UserResponse } from './userModels';
import { apiFetch } from '@/utils/apiFetch';
import { userRoutes } from './userRoutes';
import { ChatRoom } from '@/domain/room/chatRoom';

export const userRepository = {
  getUser: async (): Promise<ApiResponse<UserResponse>> => {
    const response = await apiFetch<UserResponse>(userRoutes.get(), {
      method: 'GET',
      credentials: 'include',
    });

    return response;
  },
  getChatRoomsByUser: async (): Promise<ApiResponse<ChatRoom[]>> => {
    const response = await apiFetch<ChatRoom[]>(userRoutes.getRoomsByUser(), {
      method: 'GET',
      credentials: 'include',
    });

    return response;
  },
  logout: async (): Promise<ApiResponse<null>> => {
    const response = await apiFetch<null>(userRoutes.logout(), {
      method: 'POST',
      credentials: 'include',
    });

    return response;
  },
};