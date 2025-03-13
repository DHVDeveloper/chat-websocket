import { ApiResponse } from "@/types/apiResponse";
import { apiFetch } from "@/utils/apiFetch";
import { ChatRoomResponse } from "./chatRoom.interface";
import { chatRoomRoutes } from "./chatRoom.routes";

export const chatRoomRepository = {
  create: async (name: string): Promise<ApiResponse<ChatRoomResponse>> => {
    const response = await apiFetch<ChatRoomResponse>(chatRoomRoutes.create(), {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    return response;
  },

  join: async (roomCode: string, email: string): Promise<ApiResponse<ChatRoomResponse>> => {
    const response = await apiFetch<ChatRoomResponse>(chatRoomRoutes.join(), {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ roomCode, email }),
    });

    return response;
  },

  getRoomData: async (roomCode: string): Promise<ApiResponse<ChatRoomResponse>> => {
    const response = await apiFetch<ChatRoomResponse>(chatRoomRoutes.getRoom(roomCode), {
      method: 'GET',
      credentials: 'include',
    });

    return response;
  },
};