import { User } from "@/domain/interfaces/user/user"
import { UserResponse } from "./models"

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