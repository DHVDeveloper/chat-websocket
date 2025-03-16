import { User } from "../user/user";

export interface Message {
  message: string;
  from: User;
  to: string;
  createdAt: string;
}
export type MessageType = "received" | "sended";
export interface MessageView {
  type: MessageType;
  message: string;
  from: string;
}
