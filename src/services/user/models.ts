import { ChatRoomResponse } from "../room/models";

export interface UserResponse{
    username: string,
    email: string,
    online: boolean,
    createdAt: string,
    updatedAt: string,
    chatRooms: ChatRoomResponse[]
}


