import { Message } from "../message/message.interface";
import { User } from "../user/user.interface";

export interface ChatRoom {
    name: string;
    code: string;
    users: User[];
    createdAt: string;
    owner: User;
    messages: Message[];
}