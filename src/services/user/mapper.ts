import { UserResponse } from "./interface"

export const mapUserResponseToUser = (userResponse:UserResponse):User => {
    return {
        email: userResponse.email,
        online: userResponse.online,
        username: userResponse.username
    }
}