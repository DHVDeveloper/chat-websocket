import { Message } from "../message/message";
import { User } from "../user/user";

export interface ChatRoom {
    name: string;
    code: string;
    users: User[];
    createdAt: string;
    owner: User;
    messages: Message[];
}