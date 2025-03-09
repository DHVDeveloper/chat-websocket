


import { User } from "@/domain/interfaces/user/user";
import { createContext, useContext } from "react";

interface UserContext{
    user:User
    isLoading: boolean
}

export const UserContext = createContext<UserContext|undefined>(undefined)

export const useUserContext = () =>{
    const context = useContext(UserContext)
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider')
    }
    return context
} 

