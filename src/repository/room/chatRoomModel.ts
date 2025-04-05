import { Message } from "@/domain/message/message";
import { User } from "@/domain/user/user";

export interface ChatRoomResponse{
    name: string;
    code: string;
    users: User[];
    createdAt: string;
    owner: User;
    messages: Message[];
}