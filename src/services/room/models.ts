import { User } from "@/domain/interfaces/user/user";
import { Message } from "postcss";

export interface ChatRoomResponse{
    cname: string;
    code: string;
    users: User[];
    createdAt: string;
    owner: User;
    messages: Message[];
}