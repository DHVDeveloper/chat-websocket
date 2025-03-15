import { useRoomContext } from "@/context/room/Room.context";
import { useUserContext } from "@/context/user/User.context";
import { PiChats } from "react-icons/pi";
import { RoomSkeleton } from "./RoomSkeleton";

export function RoomList({handleSelectChat}:{handleSelectChat: (roomCodeSelected:string) => void}){
    const {user: {chatRooms},isLoading} = useUserContext()
    const {selectedRoom} = useRoomContext()
    return <div className="w-full h-full p-3 gap-3 flex flex-col pt-1 overflow-y-auto">
        {!isLoading ? 
            chatRooms && chatRooms.length > 0 && chatRooms.map((chatRoom) => (
               <div key={chatRoom.code} className="flex flex-col">
                 <button onClick={() => handleSelectChat(chatRoom.code)}  className={`w-full border-[#ffffff10] group flex items-center rounded-lg transition-all cursor-pointer ps-3 py-4  gap-2   ${selectedRoom?.code === chatRoom.code ? ' text-custom-resalt-color bg-[#0cfdc610]' : 'hover:bg-[#dee2e20d]'}`}>
                    <div className="flex items-center gap-2">
                        <span className={`border  shadow-sm border-[#3f3f4680] p-2 rounded-full flex justify-center items-center ${selectedRoom?.code === chatRoom.code ? ' text-custom-resalt-color bg-[#0cfdc615] ' : ' text-white'}`}><PiChats /></span>
                        <div className="flex items-start flex-col">
                        <span className="h-fit">{chatRoom.name}</span>
                        <span className="h-fit text-gray-600 font-bold text-[11px]">{chatRoom.code}</span>
                        </div>
                    </div>
                </button>
               </div>
            )) : <RoomSkeleton/>}
    </div>
}