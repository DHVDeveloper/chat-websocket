import { apiFetch } from "@/utils/apiFetch";
import { ApiResponse } from "@/types/apiResponse";
import { MessageRequest } from "./message.models";
import { messageRoutes } from "./message.routes";

export const messageRepository = {
  sendMessage: async (messageData: MessageRequest): Promise<ApiResponse<null>> => {
    return await apiFetch<null>(messageRoutes.sendMessage(), {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageData),
    });
  },
};