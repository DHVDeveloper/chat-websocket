import { UserSection } from "@/pages/chat/sections/side/user/UserSection";
import { useRoomContext } from "@/context/room/Room.context";
import { RoomButton } from "./rooms/RoomButton";
import { RoomList } from "./rooms/RoomList";
import { JoinRoomModal } from "../../modals/JoinRoomModal";
import { NewRoomModal } from "../../modals/NewRoomModal";
import { useState } from "react";


export function SideSection(){
    const {handleSelectRoom} = useRoomContext()
      const [showNewRoom, setShowNewRoom] = useState<boolean>(false)
      const [showJoinRoom, setShowJoinRoom] = useState<boolean>(false)
    const handleSelectChat = async (roomCodeSelected:string) => {
        handleSelectRoom(roomCodeSelected)
    }
    
      const showCreateRoomModal = (show:boolean) => {
        setShowNewRoom(show)
      }
    
      const showJoinRoomModal = (show:boolean) => {
        setShowJoinRoom(show)
      }
    return(<>
        <div className="h-full w-[35%] overflow-hidden rounded-3xl border-[1px] p-4 bg-[#121212] border-custom-border-color flex flex-col gap-4 justify-between">
            <div className="flex flex-1 flex-col gap-2 overflow-hidden">
                <RoomButton showJoinRoomModal={showJoinRoomModal} showCreateRoomModal={showCreateRoomModal} />
                <RoomList handleSelectChat={handleSelectChat}/>
            </div>
            <UserSection />
        </div>
        {showNewRoom && <NewRoomModal handleIsOpenModal={showCreateRoomModal} isOpen={showNewRoom}/>}
        {showJoinRoom && <JoinRoomModal handleIsOpenModal={showJoinRoomModal} isOpen={showJoinRoom}/>}
    </>)
}               

