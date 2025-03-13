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
        className="border border-[#ffffff10] text-custom-text-color px-3 py-2 gap-1  flex items-center justify-center rounded-full text-nowrap hover:text-custom-resalt-color hover:bg-[#0cfdc615] transition-all duration-200 ease-in-out"
        >
        <HiPlus className="transition-transform text-sm duration-300 ease-in-out group-hover:scale-110" />
        <span className="text-sm">
            Crear sala
        </span>
    </button>
      <button
        onClick={() => showJoinRoomModal(true)}
        className="border border-[#ffffff10] text-custom-text-color font-light px-3 py-2 gap-1  flex items-center justify-center rounded-full text-nowrap hover:text-custom-resalt-color hover:bg-[#0cfdc615] transition-all duration-200 ease-in-out"
      >
        <RiChatForwardFill className="transition-transform duration-300 ease-in-out group-hover:scale-110" />
        <span className="text-sm">
            Unirse a una sala
        </span>
      </button>
    </div>
  );
}
