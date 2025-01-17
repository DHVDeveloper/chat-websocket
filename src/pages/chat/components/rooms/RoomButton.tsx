import { LiaPlusSolid } from "react-icons/lia";
import { IoEnterOutline } from "react-icons/io5";
export function RoomButton({
  showCreateRoomModal,
}: {
  showCreateRoomModal: (show: boolean) => void;
}) {
  return (
    <div className="flex gap-2 w-full">
      <button
        onClick={() => showCreateRoomModal(true)}
        className="group bg-custom-border-color px-2 py-2 text-custom-resalt-color border-1 border-custom-border-color flex items-center justify-center rounded-md text-nowrap hover:text-custom-secondary-color hover:bg-custom-resalt-color transition-all duration-200 ease-in-out hover:gap-2"
        >
        <LiaPlusSolid className="transition-transform duration-300 ease-in-out group-hover:scale-110" />
        <span className="opacity-0 group-hover:opacity-100 max-w-0 group-hover:max-w-xs overflow-hidden transition-all duration-200 ease-in-out">
            Crear sala
        </span>
    </button>
      <button
        onClick={() => showCreateRoomModal(true)}
        className="bg-custom-border-color px-2 py-2 text-custom-resalt-color border-1 border-custom-border-color flex items-center justify-center gap-2 rounded-md text-nowrap hover:text-custom-secondary-color hover:bg-custom-resalt-color transition-all duration-200 ease-in-out"
      >
        <IoEnterOutline />
      </button>
    </div>
  );
}
