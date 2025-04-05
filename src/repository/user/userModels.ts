import { ChatRoomResponse } from "../room/chatRoomModel";

export interface UserResponse{
    username: string,
    email: string,
    online: boolean,
    createdAt: string,
    updatedAt: string,
    chatRooms: ChatRoomResponse[]
}


