import { Message } from "@/domain/interfaces/message/message";
import { User } from "@/domain/interfaces/user/user";

export interface ChatRoomResponse{
    name: string;
    code: string;
    users: User[];
    createdAt: string;
    owner: User;
    messages: Message[];
}