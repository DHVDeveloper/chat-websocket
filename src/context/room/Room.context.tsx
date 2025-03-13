import { ChatRoom } from "@/domain/room/chatRoom.interface";
import { createContext, useContext } from "react";

interface RoomContext{
    selectedRoom?:ChatRoom
    isLoading: boolean
    handleSelectRoom: (roomId:string) => void
}

export const RoomContext = createContext<RoomContext|undefined>(undefined)

export const useRoomContext = () =>{
    const context = useContext(RoomContext)
    if (!context) {
        throw new Error('useRoomContext must be used within a RoomProvider')
    }
    return context
} 

