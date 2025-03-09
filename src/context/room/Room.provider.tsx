import { useState } from "react";
import { RoomContext } from "./Room.context";
import { roomService } from "@/services/room/roomService";
import { ChatRoom } from "@/domain/interfaces/room/chatRoom";

export function RoomProvider({children}:{children:React.ReactNode}){
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [selectedRoom, setSelectedRoom] = useState<ChatRoom>()

    const handleSelectRoom = async (roomCodeSelected:string) => {
        setIsLoading(true)
        try {
            const chatRoomData = await roomService.getRoomData(roomCodeSelected)
            if(!chatRoomData) return
            setSelectedRoom(chatRoomData)
        } catch (error) {
            throw Error('')
        } finally {
            setIsLoading(false)
        }
    }
    return <RoomContext.Provider value={{isLoading, handleSelectRoom, selectedRoom}}>
        {children}
    </RoomContext.Provider>
}