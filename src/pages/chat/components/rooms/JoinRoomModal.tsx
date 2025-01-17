import { useUserContext } from "@/context/user/User.context";
import { roomService } from "@/services/room/roomService";
import { FormEvent, useState } from "react";

interface JoinModalProps {
  isOpen: boolean;
  handleIsOpenModal: (isOpen: boolean) => void;
}

export function JoinRoomModal({ isOpen, handleIsOpenModal }: JoinModalProps) {
  const [newRoomName, setNewRoomName] = useState("");

  const createNewRoom = async () => {
    const createRoom = await roomService.create(newRoomName);
    console.log(createRoom);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-custom-main-color rounded-lg shadow-lg max-w-md w-full p-6">
        <h2 className="text-xl font-semibold text-white">Crear sala</h2>

        <p>
          <input
            type="text"
            name="username"
            onChange={(e) => setNewRoomName(e.target.value)}
            placeholder="Nombre de la sala"
            className="bg-[#27272A80] w-full py-3 ps-2 rounded-lg"
            required
          />
        </p>
        <div className="mt-6 flex justify-end space-x-2">
          <button
            onClick={() => handleIsOpenModal(false)}
            className="px-4 py-2 text-sm border border-custom-border-color rounded-md text-white hover:bg-custom-secondary-color transition-all"
          >
            Cerrar
          </button>
          <button
            onClick={createNewRoom}
            className="px-4 py-2 text-sm text-custom-main-color bg-custom-resalt-color rounded-md hover:bg-blue-600 transition-all"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
