import { LiaPlusSolid } from "react-icons/lia";
import { IoEnterOutline } from "react-icons/io5";
import { BiPlusCircle } from "react-icons/bi";
import { HiPlus } from "react-icons/hi";
import { RiChatForwardFill } from "react-icons/ri";
export function RoomButton({
  showCreateRoomModal,
  showJoinRoomModal
}: {
  showCreateRoomModal: (show: boolean) => void;
  showJoinRoomModal: (show:boolean) => void
}) {
  return (
    <div className="flex gap-2 w-full">
      <button
        onClick={() => showCreateRoomModal(true)}
        className="group bg-[#ffffff10] shadow-md px-2 py-2 text-white border-1  flex items-center justify-center rounded-md text-nowrap hover:text-custom-secondary-color hover:bg-custom-resalt-color transition-all duration-200 ease-in-out hover:gap-2"
        >
        <HiPlus className="transition-transform duration-300 ease-in-out group-hover:scale-110" />
        <span className="opacity-0 group-hover:opacity-100 max-w-0 group-hover:max-w-xs overflow-hidden transition-all duration-200 ease-in-out">
            Crear sala
        </span>
    </button>
      <button
        onClick={() => showJoinRoomModal(true)}
        className="bg-[#ffffff10] shadow-xl p-2 border-1 flex items-center justify-center gap-2 rounded-md text-nowrap hover:text-custom-secondary-color hover:bg-custom-resalt-color transition-all duration-200 ease-in-out"
      >
        <RiChatForwardFill className="transition-transform duration-300 ease-in-out group-hover:scale-110" />
        <span className="opacity-0 group-hover:opacity-100 max-w-0 group-hover:max-w-xs overflow-hidden transition-all duration-200 ease-in-out">
            Unirse a una sala
        </span>
      </button>
    </div>
  );
}
