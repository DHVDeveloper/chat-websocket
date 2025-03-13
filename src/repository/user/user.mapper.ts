import { User } from "@/domain/user/user.interface"
import { UserResponse } from "./user.interface"

export const mapUserResponseToUser = (userResponse:UserResponse):User => {
    return {
        email: userResponse.email,
        online: userResponse.online,
        username: userResponse.username,
        chatRooms: userResponse?.chatRooms?.length > 0 ? userResponse.chatRooms.map((chatRoom) =>  ({
            code: chatRoom.code,
            messages: [],
            name: chatRoom.name
        })) : []
    }
}