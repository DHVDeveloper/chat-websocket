import { ERROR_MESSAGES, USER_ERROR_MESSAGES } from '../constants/messages';
import { ApiResponse } from '@/types/apiResponse';
import { User } from '@/domain/user/user';
import { userRepository } from '@/repository/user/userRepository';
import { mapUserResponseToUser } from '@/repository/user/userMappers';

export const userService = {
  getUser: async (): Promise<ApiResponse<User>> => {
    const response = await userRepository.getUser();

    if (!response.success) {
      return { success: false, error: response.error || USER_ERROR_MESSAGES.USER_NOT_FOUND };
    }

    return { success: true, data: response.data  };
  },
};