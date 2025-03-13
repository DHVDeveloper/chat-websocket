import { Message } from "@/domain/message/message.interface";
import { User } from "@/domain/user/user.interface";

export interface ChatRoomResponse{
    name: string;
    code: string;
    users: User[];
    createdAt: string;
    owner: User;
    messages: Message[];
}