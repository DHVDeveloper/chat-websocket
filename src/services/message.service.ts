import { MessageView } from "@/domain/message/message";
import { messageToSendMapper } from "@/domain/message/message.mapper";
import { User } from "@/domain/user/user";
import { messageRepository } from "@/repository/message/message.repository";
import { ApiResponse } from "@/types/apiResponse";

export const messageService = {
  sendMessage: async (message: string, userEmail:User['email'], roomCode:string): Promise<ApiResponse<null>> => {
    const messageRequest = messageToSendMapper(message,userEmail,roomCode);
    return await messageRepository.sendMessage(messageRequest);
  },
};