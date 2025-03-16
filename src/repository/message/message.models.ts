import { User } from "@/domain/user/user";

export interface MessageRequest {
    from: User['email'];
    roomCode: string;
    content: string;
  }