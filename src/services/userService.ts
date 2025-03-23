import { ERROR_MESSAGES, USER_ERROR_MESSAGES } from '../constants/messages';
import { ApiResponse } from '@/types/apiResponse';
import { User } from '@/domain/user/user';
import { userRepository } from '@/repository/user/userRepository';
import { mapUserResponseToUser } from '@/repository/user/userMappers';
import { ChatRoom } from '@/domain/room/chatRoom';

export const userService = {
  getUser: async (): Promise<ApiResponse<User>> => {
    const response = await userRepository.getUser();

    if (!response.success) {
      return { success: false, error: response.error || USER_ERROR_MESSAGES.USER_NOT_FOUND };
    }

    return { success: true, data: response.data  };
  },
  getChatRoomsByUser: async (): Promise<ApiResponse<ChatRoom[]>> => {
    const response = await userRepository.getChatRoomsByUser();

    if (!response.success) {
      return { success: false, error: response.error || USER_ERROR_MESSAGES.USER_NOT_FOUND };
    }

    return { success: true, data: response.data  };
  },
  logout: async (): Promise<ApiResponse<null>> => {
    const response = await userRepository.logout();

    if (!response.success) {
      return { success: false, error: response.error || "Error al cerrar sesión" };
    }

    return { success: true, data: null };
  },
};