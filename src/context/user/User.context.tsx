


import { User } from "@/domain/user/user";
import { createContext, useContext } from "react";

interface UserContext{
    user:User
    isLoading: boolean
    reloadChatRooms: () => void
    logout: () => void
    handleReloadUserData: () => void
}

export const UserContext = createContext<UserContext|undefined>(undefined)

export const useUserContext = () =>{
    const context = useContext(UserContext)
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider')
    }
    return context
} 

