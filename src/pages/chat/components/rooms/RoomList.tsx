import { useUserContext } from "@/context/user/User.context"
import { IoChatbubblesSharp } from "react-icons/io5";

export function RoomList(){
    const {user: {chatRooms}} = useUserContext()
    const {user} = useUserContext()
    return <div className="w-full h-full p-3 gap-3 flex flex-col pt-1 overflow-y-auto">
            {chatRooms && chatRooms.length > 0 && chatRooms.map((chatRoom) => (
                <div key={chatRoom.code} className="w-full rounded-md transition-all cursor-pointer bg-[#151515] shadow-xl  ps-3 py-4 flex gap-2 hover:bg-[#1b1b1b]">
                    <span className="bg-[#0cfdc542] rounded-full text-custom-resalt-color flex justify-center items-center px-2"><IoChatbubblesSharp /></span>
                    {chatRoom.name}
                </div>
            ))}
    </div>
}