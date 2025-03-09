import { useUserContext } from "@/context/user/User.context"
import { IoChatbubblesSharp } from "react-icons/io5";

export function RoomList({handleSelectChat}:{handleSelectChat: (roomCodeSelected:string) => void}){
    const {user: {chatRooms}} = useUserContext()
    const {user} = useUserContext()
    return <div className="w-full h-full p-3 gap-3 flex flex-col pt-1 overflow-y-auto">
            {chatRooms && chatRooms.length > 0 && chatRooms.map((chatRoom) => (
                <button onClick={() => handleSelectChat(chatRoom.code)} key={chatRoom.code} className="w-full rounded-lg transition-all cursor-pointer shadow-md bg-[#151515] ps-3 py-4 flex gap-2 hover:bg-[#1b1b1b]">
                    <span className="bg-[#ffffff10] p-2 rounded-lg shadow-lg flex justify-center items-center px-2"><IoChatbubblesSharp /></span>
                    {chatRoom.name}
                </button>
            ))}
    </div>
}