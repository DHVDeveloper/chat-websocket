import { useState } from "react";
import { RoomContext } from "./Room.context";
import { ChatRoom } from "@/domain/room/chatRoom.interface";
import { chatRoomService } from "@/services/chatRoom.service";

export function RoomProvider({children}:{children:React.ReactNode}){
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [selectedRoom, setSelectedRoom] = useState<ChatRoom>()

    const handleSelectRoom = async (roomCodeSelected:string) => {
        setIsLoading(true)
        try {
            const chatRoomData = await chatRoomService.getRoomData(roomCodeSelected)
            if(chatRoomData.error) return
            setSelectedRoom(chatRoomData.data)
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