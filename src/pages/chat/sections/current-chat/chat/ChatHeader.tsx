import { useRoomContext } from "@/context/room/Room.context"
import { ChatRoom } from "@/domain/room/chatRoom"
import { copyToClipBoard } from "@/utils/copyToClipboard"
import { FiUsers } from "react-icons/fi"
import { MdOutlineContentCopy } from "react-icons/md"

interface ChatHeaderSectionProps {
    currentChatRoom: ChatRoom 
}

export function ChatHeader({currentChatRoom}:ChatHeaderSectionProps) {
    const {name,users,code} = {...currentChatRoom}
    
    return <header className="w-full bg-[#151515] border-b flex justify-between items-center border-custom-border-color px-4 py-3">
        <div className="flex flex-col ">
            <h3 className="font-bold text-white">{name}</h3>
            <span className="text-[#71717a] flex items-center text-sm gap-2"><FiUsers />{users?.length} {users && users?.length > 1 ? 'participantes' : 'participante'}</span>
        </div>
        <div className="flex relative flex-col h-fit w-fit group items-end">
            <button className="text-white w-fit hover:bg-[#242424] p-2 rounded-md" onClick={() => copyToClipBoard(code)}>
                <MdOutlineContentCopy />
            </button>
        </div>
    </header>
}