import { ROOM_ERROR_MESSAGES } from "@/constants/messages";
import { ChatRoomResponse } from "@/repository/room/chatRoomModel";
import { chatRoomRepository } from "@/repository/room/roomRepository";
import { ApiResponse } from "@/types/apiResponse";

export const chatRoomService = {
    create: async (name: string): Promise<ApiResponse<ChatRoomResponse>> => {
      const response = await chatRoomRepository.create(name);
  
      if (!response.success) {
        return { success: false, error: response.error || ROOM_ERROR_MESSAGES.CREATE_ROOM_ERROR };
      }
  
      return { success: true, data: response.data };
    },
  
    join: async (roomCode: string, email: string): Promise<ApiResponse<ChatRoomResponse>> => {
      const response = await chatRoomRepository.join(roomCode, email);
  
      if (!response.success) {
        return { success: false, error: response.error || ROOM_ERROR_MESSAGES.JOIN_ROOM_ERROR };
      }
  
      return { success: true, data: response.data };
    },
  
    getRoomData: async (roomCode: string): Promise<ApiResponse<ChatRoomResponse>> => {
      const response = await chatRoomRepository.getRoomData(roomCode);
  
      if (!response.success) {
        return { success: false, error: response.error || ROOM_ERROR_MESSAGES.GET_ROOM_ERROR };
      }
  
      return { success: true, data: response.data };
    },
  };