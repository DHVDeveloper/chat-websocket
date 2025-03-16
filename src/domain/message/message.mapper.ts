import { Message, MessageView } from "./message";
import { User } from "../user/user";
import { MessageRequest } from "@/repository/message/message.models";

export function mapMessageResponseToMessageView(messages:Message[], userEmail:User['email']):MessageView[] {
    console.log(messages);
    const messageView:MessageView[] = messages.map((message) => ({
        type: message.from.email === userEmail ? "sended" : "received",
        message: message.message,
        from: message.from.username
    }))
    return messageView
}

export function messageToSendMapper(message:string, userEmail:User['email'], roomCode:string): MessageRequest {
    return {
        from: userEmail,
        roomCode: roomCode,
        content: message,
    }
  }