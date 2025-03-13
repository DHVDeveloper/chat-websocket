import { ChatRoom } from "../room/chatRoom.interface";

export interface User {
    username: string;
    email: string;
    online: boolean;
    chatRooms: Pick<ChatRoom, "messages" | "code" | "name">[];
}


