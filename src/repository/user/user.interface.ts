import { ChatRoomResponse } from "../room/chatRoom.interface";

export interface UserResponse{
    username: string,
    email: string,
    online: boolean,
    createdAt: string,
    updatedAt: string,
    chatRooms: ChatRoomResponse[]
}


