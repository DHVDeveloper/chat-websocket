import { ChatRoom } from "../room/chatRoom";

export interface User {
    username: string;
    email: string;
    online: boolean;
    chatRooms: Pick<ChatRoom, "messages" | "code" | "cname">[];
}


